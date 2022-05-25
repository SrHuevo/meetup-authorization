import mongoose from 'mongoose'

import { MONGO_URI } from '../env'

const connection = mongoose.createConnection(MONGO_URI)

export default connection
