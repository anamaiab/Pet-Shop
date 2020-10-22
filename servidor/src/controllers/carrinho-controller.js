/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const Carrinho = mongoose.model("Carrinho")
const repository = require("../repositories/carrinho-repositorie")
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

//Criando as funções de resposta para o retorno do getByUserID
exports.getByUserID = async(req, res, next) => {
    try {
        var data = await repository.getByUserID(req.params.user_id)
        res.status(200).send(data)

    } catch (e) {
        res.status(500).send({ message: "Falha no getByUserID" })
    }
}

//Criando as funções de resposta para o retorno do post
exports.post = async(req, res, next) => {
    try {
        await repository.create(req.body)
        res.status(201).send({
            message: "Produto inserido no carrinho com sucesso"
        })
    } catch (e) {
        res.status(500).send({
            messsage: "Falha ao colocar produto no carrinho",
            message: e
        })
    }

}

//Criando as funções de resposta para o retorno do update (put)
exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: "Quantidade atualizada com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar quantidade do produto",
            data: e
        })
    }
}

//Criando as funções de resposta para o retorno do delete
exports.delete = async(req, res, next) => {
    try {
        var data = await repository.delete(req.params.id)
        res.status(200).send({
            message: "Produto excluido do carrinho com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao remover produto",
            data: e
        })
    }
}

//Criando as funções de resposta para o retorno do deleteAll
exports.deleteAll = async(req, res, next) => {
    try {
        await repository.deleteAll(req.body.user_id)
        res.status(200).send({
            message: "Carrinho esvaziado com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao esvaziar carrinho",
            data: e
        })
    }
}