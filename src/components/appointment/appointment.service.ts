import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAppointment } from './entities/appointment.schema';
import { IUser } from './entities/user.schema';
import * as moment from 'moment';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointment')
    private readonly appointmentModel: Model<IAppointment>,
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) { }
  async create(createAppointmentDto: IAppointment) {
    await this.appointmentModel.create(createAppointmentDto);
  }

  async createUser(user: IUser) {
    await this.userModel.create(user);
  }

  async findAllUser({
    page,
    limit,
    sortWith,
    sortBy,
    search,
  }): Promise<{ data: IUser[]; count: number }> {
      const searchQuery = search
      ? [{
        $match: {
          $or: [
            { 'name': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'mobile': { $regex: '.*' + search + '.*', $options: 'i' } }
          ]
        },
      }]
      : [];

    const queryTypeDetails = await this.userModel.aggregate([{
      $match: {
        status: {
          $in: ['ACTIVE']
        }
      }
    }, ...searchQuery, { $sort: { [sortWith || 'createdAt']: sortBy === 'DESC' ? -1 : 1 } }, {
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          { $skip: parseInt(limit) * (parseInt(page) - 1) },
          { $limit: Number(limit) },
        ],
      },
    }]);
    return {
      count: queryTypeDetails[0].metadata.length
        ? queryTypeDetails[0].metadata[0].total
        : 0,
      data: queryTypeDetails[0].data,
    };
  }

  async findAll(query): Promise<{ data: IAppointment[]; count: number }> {
    const {
      page,
      limit,
      sortWith,
      sortBy,
      search,
      appointmentTime,
    } = query;

    const today = new Date(appointmentTime),
      start = moment(today).startOf('day').toDate(),
      end = moment(today).endOf('day').toDate();
    const searchQuery = search
      ? [{
        $match: {
          $or: [
            { 'user.name': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'user.mobile': { $regex: '.*' + search + '.*', $options: 'i' } }
          ]
        },
      }]
      : [];
    const queryTypeDetails = await this.appointmentModel.aggregate([{
      $match: {
        $and: [{
          status: {
            $in: ['Pending', 'Accepted']
          }
        }, {
          appointmentTime: {
            '$gte': start,
            '$lt': end
          }
        }]
      }
    }, {
      $lookup: {
        from: 'user',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    }, { $unwind: '$user' }, ...searchQuery, {
      $project: {
        'user.name': 1,
        'user.mobile': 1,
        'user.gender': 1,
        'user.dob': 1,
        'appointmentTime': 1,
        'status': 1
      }
    }, { $sort: { [sortWith || 'createdAt']: sortBy === 'desc' ? -1 : 1 } }, {
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          { $skip: parseInt(limit) * (parseInt(page) - 1) },
          { $limit: Number(limit) },
        ],
      },
    }]);
    return {
      count: queryTypeDetails[0].metadata.length
        ? queryTypeDetails[0].metadata[0].total
        : 0,
      data: queryTypeDetails[0].data,
    };
  }

  async update(_id: IAppointment['_id'], status) {
    await this.appointmentModel.updateOne({
      _id
    },{
      $set:{
        status
      }
    });
  }
}
