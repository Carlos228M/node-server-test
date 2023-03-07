import ajv from '#lib/ajv.js'
import { Type } from '@sinclair/typebox'
export const userRegisterBodySchema = Type.Object(
   {
      name: Type.String({
         maxLength: 18,
         minLength: 2,
         errorMessage: {
            type: '${0} must be a string',
            minLength: '${0} must not have fewer than 2 characters',
            maxLength: '${0} must not have more than 5 characters'
         }
      }),
      email: Type.String({ format: 'email' }),
      age: Type.Number({ maximum: 100, minimum: 18 })
   },
   { additionalProperties: false }
)

const userRegisterIDSchema = Type.String({ format: 'uuid' })

export const userRegisterBodyValidator = ajv.compile(userRegisterBodySchema)
export const userRegisterIDValidator = ajv.compile(userRegisterIDSchema)
