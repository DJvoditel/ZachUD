const {Users, Passengers, Tickets, Trains, Schedules, Van, Stations} = require('../models/models')
const {Sequelize} = require('../db')
const {QueryTypes} = require('sequelize')
const sequelize = require('../db')
const ApiError = require('../ApiError')

class DBControllerVans
{
    // Создание записи в таблице Van
    async createVans(req, res, next)
    {
        try {
            const {type, capacity} = req.body
            if(!type||!capacity)
            {
                return next(ApiError.badRequest("Введите полностью данные"))
            }
            const createvan= await Van.create({type, capacity})
            return res.json({message: "Производитель создан"})
        } catch (error) {
            next(ApiError.badRequest("Что-то пошло не так"))
            console.log(error)
        }
    }
    // Вывод всей таблицы Vans
    async getAll(req,res)
    {
        const vans = await Van.findAll()
        return res.json(vans)
    }
    // Вывод записей по определённому ID таблицы Vans
    async getID(req,res)
    {
        const {id_van} = req.params
        let id_v = await Van.findAll({where:{id_van}})
        return res.json(id_v)
    }
    // Удаление по выбранному ID таблицы Vans
    async DelId(req,res)
    {
        const {id_van} = req.params
        let delidvan = await Van.destroy({where:{id_van}})
        return res.json(delidvan)
    }
    // Удаление всех записей в таблице Vans
    async DelFull(req,res)
    {
        let query_del_all=`DELETE FROM "vans"`
        const test_del_all = await sequelize.query(query_del_all)
        if(test_del_all) res.send({messenge: "Все записи удалены!"})
        else res.send({ERROR: "Не удалось удалить записи!"})
    }
    // Редактирование записей по выбранному ID Vans
    async RedId(req,res)
    {
        const {id_van} = req.params
        const redvan = await Van.update({type : req.body.type},{where:{id_van}})
        return res.json(redvan)
    }
}

module.exports = new DBControllerVans()