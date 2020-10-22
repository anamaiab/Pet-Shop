/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const User = mongoose.model("User")
const repository = require("../repositories/user-repositorie")
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

//Criando as funções de resposta para o retorno do getByUser
exports.getByUser = async(req, res, next) => {
    try {
        var data = await repository.getByUser(req.params.user)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getByUser" })
    }
}


//Criando as funções de resposta para o retorno do getByEmail
exports.getByEmail = async(req, res, next) => {
    try {
        var data = await repository.getByEmail(req.params.email)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getByEmail" })
    }
}

//Criando as funções de resposta para o retorno do getByLogged
exports.getByLogged = async(req, res, next) => {
    try {
        var data = await repository.getByLogged()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getByLogged" })
    }
}

//Criando as funções de resposta para o retorno do getByEmailMod
exports.getByEmailMod = async(req, res, next) => {
    try {
        var data = await repository.getByEmailMod(req.params.email)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ message: "Falha no getByEmailMod" })
    }
}

//Criando as funções de resposta para o retorno do post
exports.post = async(req, res, next) => {
    try {
        await repository.create(req.body)
        res.status(201).send({
            message: "Usuario cadastrado com sucesso"
        })
    } catch (e) {
        res.status(500).send({
            messsage: "Falha ao cadastrar o usuario",
            message: e
        })
    }

}

//Criando as funções de resposta para o retorno do update (put)
exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: "Usuario atualizado com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar usuario",
            data: e
        })
    }
}

//Criando as funções de resposta para o retorno do updateInfo
exports.updateInfo = async(req, res, next) => {
    try {
        await repository.updateInfo(req.params.id, req.body)
        res.status(200).send({
            message: "Usuário atualizado com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar usuario",
            data: e
        })
    }
}

//Criando as funções de resposta para o retorno do update (put)
exports.updateInfoAdm = async(req, res, next) => {
    try {
        await repository.updateInfoAdm(req.params.id, req.body)
        res.status(200).send({
            message: "Usuário atualizado com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar usuario",
            data: e
        })
    }
}

//Criando as funções de resposta para o retorno do updateAdm
exports.updateAdm = async(req, res, next) => {
    try {
        await repository.updateAdm(req.params.email, req.body)
        res.status(200).send({
            message: "Usuário atualizado com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar usuário",
            data: e
        })
    }
}


//Criando as funções de resposta para o retorno do delete
exports.delete = async(req, res, next) => {
    try {
        var data = await repository.delete(req.params.email)
        res.status(200).send({
            message: "Usuário removido com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao remover usuário",
            data: e
        })
    }
}