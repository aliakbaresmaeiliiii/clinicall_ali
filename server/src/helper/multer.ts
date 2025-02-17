import { pickBy } from 'lodash-es'
import { Request } from 'express'

/**
 *
 * @param req
 * @param fields
 */
function pickSingleFieldMulter(req: any, fields: string[]) {
  return pickBy(
    fields.reduce<any>((acc, field) => {
      acc[field] = req.getSingleArrayFile(field)
      return acc
    }, {}),
    (value) => {
      return value !== undefined
    }
  )
}

/**
 *
 * @param req
 * @param fields
 */
function pickMultiFieldMulter(req: any, fields: string[]) {
  return pickBy(
    fields.reduce<any>((acc, field) => {
      acc[field] = req.getMultiArrayFile(field)
      return acc
    }, {}),
    (value) => {
      return value !== undefined
    }
  )
}

const Multers = {
  pickSingleFieldMulter,
  pickMultiFieldMulter,
}

export default Multers
