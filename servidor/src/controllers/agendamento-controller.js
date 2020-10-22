/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const Agendamento = mongoose.model("Agendamento")
const repository = require("../repositories/agendamento-repositorie")
const axios = require("axios")
const vue = require("vue")

//Criando as funções de resposta para o retorno do get
exports.get = async(req, res, next) => {
    try {
        var data = await repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no get" })
    }
}

//Criando as funções de resposta para o retorno do getByUserId
exports.getByUserId = async(req, res, next) => {
    try {
        var data = await repository.getByUserId(req.params.user)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getByUserId" })
    }
}

//Criando as funções de resposta para o retorno do getByPetId
exports.getByPetId = async(req, res, next) => {
    try {
        var data = await repository.getByPetId(req.params.pet_id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getByPetId" })
    }
}


//Criando as funções de resposta para o retorno do getByPetUser
exports.getByPetUser = async(req, res, next) => {
    try {
        var data = await repository.getByPetUser(req.params.pet, req.params.user)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getByPetUser" })
    }
}

//Criando as funções de resposta para o retorno do getByDate
exports.getByDate = async(req, res, next) => {
    try {
        var data = await repository.getByDate(req.params.date)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getByDate" })
    }
}

//Criando as funções de resposta para o retorno do getByDateHour
exports.getByDateHour = async(req, res, next) => {
    try {
        var data = await repository.getByDateHour(req.params.date, req.params.hour)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getByDateHour" })
    }
}


//Criando as funções de resposta para o retorno do post
exports.post = async(req, res, next) => {
    try {
        var data = await repository.create(req.body)
        res.status(201).send(data)
    } catch (e) {
        res.status(500).send({
            messsage: "Falha ao cadastrar o agendamento",
            data: e

        })
    }

}


//Criando as funções de resposta para o retorno do createAdm
exports.createAdm = async(req, res, next) => {
    try {
        var data = await repository.createAdm(req.body)

        res.status(201).send(data)
    } catch (e) {
        res.status(500).send({
            messsage: "Falha ao cadastrar o agendamento",
            data: e

        })
    }

}


//Criando as funções de resposta para o retorno do update (put)
exports.update = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: "Agendamento atualizado com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar agendamento",
            data: e
        })
    }
}

//Criando as funções de resposta para o retorno do delete
exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({
            message: "Agendamento removido com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao remover agendamento",
            data: e
        })
    }
}