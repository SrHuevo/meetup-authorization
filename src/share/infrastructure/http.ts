import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

import { User } from '../user/domain/models/user'

export type VerifiedParams = {
  [key: string]: { value: string; verified: boolean }
}
export interface Request extends ExpressRequest {
  verified: boolean
  verifiedParams: VerifiedParams
  user: User<any>
}

export type Response = ExpressResponse
