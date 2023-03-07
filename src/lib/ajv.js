import Ajv from 'Ajv'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
addErrors(ajv)
export default ajv
