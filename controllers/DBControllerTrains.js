const {Users, Passengers, Tickets, Trains, Schedules, Van, Stations} = require('../models/models')
const {Sequelize} = require('../db')
const {QueryTypes} = require('sequelize')
const sequelize = require('../db')
const ApiError = require('../ApiError')

class DBControllerTrains
{
    // Создание записи в таблице Trains
    async createTrains(req, res, next)
    {
        try {
            const {number_train, type_train} = req.body
            if(!number_train||!type_train)
            {
                return next(ApiError.badRequest("Введите полностью данные"))
            }
            const createtr = await Trains.create({number_train, type_train})
            return res.json({message: "Производитель создан"})
        } catch (error) {
            next(ApiError.badRequest("Что-то пошло не так"))
            console.log(error)
        }
    }
    // Вывод всей таблицы Trains
    async getAll(req,res)
    {
        const trains = await Trains.findAll()
        return res.json(trains)
    }
    // Вывод записей по определённому ID таблицы Trains
    async getID(req,res)
    {
        const {id_train} = req.params
        let id_tr = await Trains.findAll({where:{id_train}})
        return res.json(id_tr)
    }
    // Удаление по выбранному ID таблицы Trains
    async DelId(req,res)
    {
        const {id_train} = req.params
        let delidtr = await Trains.destroy({where:{id_train}})
        return res.json(delidtr)
    }
    // Удаление всех записей в таблице Trains
    async DelFull(req,res)
    {
        let query_del_all=`DELETE FROM "trains"`
        const test_del_all = await sequelize.query(query_del_all)
        if(test_del_all) res.send({messenge: "Все записи удалены!"})
        else res.send({ERROR: "Не удалось удалить записи!"})
    }
    // Редактирование записей по выбранному ID Trains
    async RedId(req,res)
    {
        const {id_train} = req.body
        const redtr = await Trains.update({title : req.body.title},{where:{id_train}})
        return res.json(redtr)
    }
}

module.exports = new DBControllerTrains()