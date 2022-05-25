import * as mongoose from 'mongoose'

import connection from '../../../../share/infrastructure/repositories/mongo-connection'

const userCoreSchema = new mongoose.Schema({
  id: String,
  email: String,
  password: String,
})

export const userCoreModel = connection.model('user', userCoreSchema)
