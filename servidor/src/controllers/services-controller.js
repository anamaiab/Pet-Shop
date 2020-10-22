/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const Services = mongoose.model("Services")
const repository = require("../repositories/services-repositories")
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

//Criando as funções de resposta para o retorno do getById
exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getById" })
    }
}


//Criando as funções de resposta para o retorno do getByName
exports.getByName = async(req, res, next) => {
    try {
        var data = await repository.getByName(req.params.title)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getByName" })
    }
}

//Criando as funções de resposta para o retorno do getValor
exports.getValor = async(req, res, next) => {
    try {
        var data = await repository.getValor()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getValor" })
    }
}

//Criando as funções de resposta para o retorno do post
exports.post = async(req, res, next) => {
    try {
        await repository.create(req.body)
        res.status(201).send({
            message: "Serviço cadastrado com sucesso"
        })
    } catch (e) {
        res.status(500).send({
            messsage: "Falha ao cadastrar o serviço",

        })
    }

}

//Criando as funções de resposta para o retorno do update (put)
exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: "Serviço atualizado com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar serviço",
            data: e
        })
    }
}


//Criando as funções de resposta para o retorno do atualizandoServico
exports.atualizandoServico = async(req, res, next) => {
    try {
        await repository.atualizandoServico(req.params.id)
        res.status(200).send({
            message: "Serviço atualizado com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar serviço",
            data: e
        })
    }
}


//Criando as funções de resposta para o retorno do delete
exports.delete = async(req, res, next) => {
    try {
        var data = await repository.delete(req.params.title)
        res.status(200).send({
            message: "Serviço removido com sucesso"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao remover serviço",
            data: e
        })
    }
}