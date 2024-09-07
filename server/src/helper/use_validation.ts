
import { Schema, ValidateOptions } from 'yup'


export function useValidation<T>(
  schema: Schema<T>,
  value: T | any,
  options?: ValidateOptions
): T {
  return schema.validateSync(value, {
    abortEarly: false,
    stripUnknown: true,
    ...options,
  })
}

