/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const Animals = mongoose.model("Animals")
const repository = require("../repositories/animals-repositorie")
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

//Criando as funções de resposta para o retorno do getByName
exports.getByName = async(req, res, next) => {
    try {
        var data = await repository.getByName(req.params.name, req.params.owner)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getByName" })
    }
}

//Criando as funções de resposta para o retorno do getByOwner
exports.getByOwner = async(req, res, next) => {
    try {
        var data = await repository.getByOwner(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send({ message: "Falha no getByOwner" })
    }
}


//Criando as funções de resposta para o retorno do getByEmailAnimal
exports.getByEmailAnimal = async(req, res, next) => {
    try {
        var data = await repository.getByEmailAnimal(req.params.name, req.params.email)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getByEmailAnimal" })
    }
}

//Criando as funções de resposta para o retorno do post
exports.post = async(req, res, next) => {
    try {
        await repository.create(req.body)
        res.status(201).send({
            message: "Animal cadastrado com sucesso"
        })
    } catch (e) {
        res.status(500).send({
            messsage: "Falha ao cadastrar animal",
            message: e
        })
    }

}

//Criando as funções de resposta para o retorno do update (put)
exports.update = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: "Animal atualizado com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar animal",
            data: e
        })
    }
}



//Criando as funções de resposta para o retorno do delete
exports.delete = async(req, res, next) => {
    try {
        var data = await repository.delete(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: "Falha ao remover animal",
            data: e
        })
    }
}