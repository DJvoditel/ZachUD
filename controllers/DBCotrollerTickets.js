const {Users, Passengers, Tickets, Trains, Schedules, Van, Stations} = require('../models/models')
const {Sequelize} = require('../db')
const {QueryTypes} = require('sequelize')
const sequelize = require('../db')
const ApiError = require('../ApiError')

class DBControllerTickets
{
    // Создание записи в таблице Tickets
    async createTickets(req, res, next)
    {
        try {
            const {place, category, price, destination, place_of_dispatch, date_of_purchase} = req.body
            // if(!first_name||!last_name)
            // {
            //     return next(ApiError.badRequest("Введите полностью данные"))
            // }
            const createtick = await Tickets.create({place, category, price, destination, place_of_dispatch, date_of_purchase})
            return res.json({message: "Производитель создан"})
        } catch (error) {
            next(ApiError.badRequest("Что-то пошло не так"))
            console.log(error)
        }
    }
    // Вывод всей таблицы Tickets
    async getAll(req,res)
    {
        const tickets = await Tickets.findAll()
        return res.json(tickets)
    }
    // Вывод записей по определённому ID таблицы Tickets
    async getID(req,res)
    {
        const {id_ticket} = req.params
        let id_tick = await Users.findAll({where:{id_ticket}})
        return res.json(id_tick)
    }
    // Удаление по выбранному ID таблицы Tickets
    async DelId(req,res)
    {
        const {id_ticket} = req.params
        let delidtick = await Tickets.destroy({where:{id_ticket}})
        return res.json(delidtick)
    }
    // Удаление всех записей в таблице Tickets
    async DelFull(req,res)
    {
        let query_del_all=`DELETE FROM "tickets"`
        const test_del_all = await sequelize.query(query_del_all)
        if(test_del_all) res.send({messenge: "Все записи удалены!"})
        else res.send({ERROR: "Не удалось удалить записи!"})
    }
    // Редактирование записей по выбранному ID Tickets
    async RedId(req,res)
    {
        const {id_ticket} = req.body
        const redtick = await Tickets.update({title : req.body.title},{where:{id_ticket}})
        return res.json(redtick)
    }
}

module.exports = new DBControllerTickets()