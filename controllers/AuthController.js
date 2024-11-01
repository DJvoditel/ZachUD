const ApiError = require('../ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, UserStorage} = require('../models/model')
const sequelize = require('../db');

const generateJwt = (id_user, login, password) => 
{
  return jwt.sign
  (
    {id_user, login, password},
    process.env.SECRET_KEY,
    {expiresIn: '72h'}
  )
}

class AuthController 
{
  async registration(req, res, next)
  {
    try {
      const {login, password} = req.body
      let candidate = await User.findOne({where: {login}})
      if (candidate)  
      {
        return next(ApiError.badRequest('Пользователь с таким login уже существует'))
      }
      const user = await User.create({login, password})
      const token = generateJwt(user.id_user, user.login, user.password)
      return res.json({token})
    } catch (error) {
        console.log(error)
        return next(ApiError.badRequest("Сервер чуть не сгорел"))
    }
    
  }

  async login(req, res, next)
  {
    try {
      const {login} = req.body
      const user = await User.findOne({where: {login}})
      if (!user)
      {
        return next(ApiError.internal('Пользователь не найден'))
      }
      const token = generateJwt(user.id_user, user.login, user.password)
      return res.json({token})
    } catch (error) {
        console.log(error)
        return next(ApiError.badRequest("Сервер чуть не сгорел"))
    }
  }
}


module.exports = new AuthController()   