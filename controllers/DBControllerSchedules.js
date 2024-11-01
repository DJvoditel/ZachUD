const {Users, Passengers, Tickets, Trains, Schedules, Van, Stations} = require('../models/models')
const {Sequelize} = require('../db')
const {QueryTypes} = require('sequelize')
const sequelize = require('../db')
const ApiError = require('../ApiError')

class DBControllerSchedules
{
    // Создание записи в таблице Schedules
    async createSchedules(req, res, next)
    {
        try {
            const {arrival_time, departure_time} = req.body
            if(!arrival_time||!departure_time)
            {
                return next(ApiError.badRequest("Введите полностью данные"))
            }
            const createsched = await Schedules.create({arrival_time, departure_time})
            return res.json({message: "Производитель создан"})
        } catch (error) {
            next(ApiError.badRequest("Что-то пошло не так"))
            console.log(error)
        }
    }
    // Вывод всей таблицы Schedules
    async getAll(req,res)
    {
        const schedules = await Schedules.findAll()
        return res.json(schedules)
    }
    // Вывод записей по определённому ID таблицы Schedules
    async getID(req,res)
    {
        const {id_schedule} = req.params
        let id_sched = await Schedules.findAll({where:{id_schedule}})
        return res.json(id_sched)
    }
    // Удаление по выбранному ID таблицы Schedules
    async DelId(req,res)
    {
        const {id_schedule} = req.params
        let delidsched = await Schedules.destroy({where:{id_schedule}})
        return res.json(delidsched)
    }
    // Удаление всех записей в таблице Schedules
    async DelFull(req,res)
    {
        let query_del_all=`DELETE FROM "schedules"`
        const test_del_all = await sequelize.query(query_del_all)
        if(test_del_all) res.send({messenge: "Все записи удалены!"})
        else res.send({ERROR: "Не удалось удалить записи!"})
    }
    // Редактирование записей по выбранному ID Schedules
    async RedId(req,res)
    {
        const {id_schedule} = req.body
        const redsched = await Schedules.update({title : req.body.title},{where:{id_schedule}})
        return res.json(redsched)
    }
}

module.exports = new DBControllerSchedules()