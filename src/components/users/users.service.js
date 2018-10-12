import {userModel} from './users.model';
import crypto from 'crypto';
import mongoose from 'mongoose';

export default {

  async getAll(type) {
    try {
      const response = await userModel
        .find({ type })
        .select(['-accessData.password', '-accessToken'])
        .exec();
      return response;
    } catch (error) {
      return error;
    }
  },

  async getById(userId) {
    try {
      const response = await userModel
        .findOne({ _id: userId })
        .select(['-accessData.password', '-accessToken'])
        .exec();
      return response;
    } catch (error) {
      return error;
    }
  },

  async add(userData, hashKey) {
    if (!userData.accessData.password) {
      return { message: 'invalid_password' };
    }

    if (!hashKey) {
      return { message: 'no_hash_key' };
    }

    const hash = crypto
      .createHmac('sha256', hashKey)
      .update(userData.accessData.password)
      .digest('hex');

    userData.accessData.password = hash;

    let user = new userModel(userData);

    try {
      await user.save();
      const response = await this.getById(user._id);
      return response;
    } catch (error) {
      return error;
    }
  },

  async removeById(userId) {
    try {
      const response = userModel.findByIdAndRemove(userId);
      return response;
    } catch (error) {
      return error;
    }
  },

  async updateById(userId, userData) {
    try {
      await userModel.update({ _id: mongoose.Types.ObjectId(userId) }, { $set: userData });

      const response = this.getById(userId);

      return response;
    } catch (error) {
      return error;
    }
  },

}