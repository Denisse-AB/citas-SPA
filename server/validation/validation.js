const { body, validationResult } = require('express-validator')

const validationRules = (req, res, next) => {
  return [
    body('email').notEmpty().isEmail().normalizeEmail(),
    body('name').notEmpty().isString().trim().escape(),
    body('tel').notEmpty().isNumeric().isLength({ max: 11 }),
    body('date').notEmpty().isString(),
    body('selected').notEmpty().isString(),
  ]
}
const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.sendStatus(400)
  } else {
    return next()
  }
}

module.exports = {
  validationRules,
  validate,
}
