const {Users, Passengers, Tickets, Trains, Schedules, Van, Stations} = require('../models/models')
const {Sequelize} = require('../db')
const {QueryTypes} = require('sequelize')
const sequelize = require('../db')
const ApiError = require('../ApiError')

class DBControllerStations
{
    // Создание записи в таблице Stations
    async createStations(req, res, next)
    {
        try {
            const {name_station, location} = req.body
            if(!name_station||!location)
            {
                return next(ApiError.badRequest("Введите полностью данные"))
            }
            const createstat = await Stations.create({name_station, location})
            return res.json({message: "Производитель создан"})
        } catch (error) {
            next(ApiError.badRequest("Что-то пошло не так"))
            console.log(error)
        }
    }
    // Вывод всей таблицы Stations
    async getAll(req,res)
    {
        const stations = await Stations.findAll()
        return res.json(stations)
    }
    // Вывод записей по определённому ID таблицы Stations
    async getID(req,res)
    {
        const {id_station} = req.params
        let id_stat = await Stations.findAll({where:{id_station}})
        return res.json(id_stat)
    }
    // Удаление по выбранному ID таблицы Stations
    async DelId(req,res)
    {
        const {id_station} = req.params
        let delidstat = await Stations.destroy({where:{id_station}})
        return res.json(delidstat)
    }
    // Удаление всех записей в таблице Stations
    async DelFull(req,res)
    {
        let query_del_all=`DELETE FROM "stations"`
        const test_del_all = await sequelize.query(query_del_all)
        if(test_del_all) res.send({messenge: "Все записи удалены!"})
        else res.send({ERROR: "Не удалось удалить записи!"})
    }
    // Редактирование записей по выбранному ID Stations
    async RedId(req,res)
    {
        const {id_station} = req.body
        const redstat = await Tickets.update({title : req.body.title},{where:{id_station}})
        return res.json(redstat)
    }
}

module.exports = new DBControllerStations()