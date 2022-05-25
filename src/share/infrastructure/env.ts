import { config } from 'dotenv'
import * as env from 'env-var'

config()

export enum ENVIRONMENTS {
  DEVELOP = 'develop',
  TEST = 'test',
  PREPRODUCTION = 'preproduction',
  PRODUCTION = 'production',
}

export const ENVIRONMENT = env
  .get('ENVIRONMENT')
  .required()
  .default(ENVIRONMENTS.DEVELOP)
  .asEnum(Object.values(ENVIRONMENTS))
export const MONGO_URI = env.get('MONGO_URI').required().asString()
export const JWT_SECRET = env.get('JWT_SECRET').required().asString()
export const JWT_EXPIRES_IN = env.get('JWT_EXPIRES_IN').required().asString()
