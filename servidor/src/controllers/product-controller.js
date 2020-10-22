/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const Products = mongoose.model("Products")
const repository = require("../repositories/product-repositories")
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
            message: "Produto cadastrado com sucesso"
        })
    } catch (e) {
        res.status(500).send({
            messsage: "Falha ao cadastrar o produto",
            message: e
        })
    }

}

//Criando as funções de resposta para o retorno do update (put)
exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: "Produto atualizado com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar produto",
            data: e
        })
    }
}

//Criando as funções de resposta para o retorno do updateCompra
exports.updateCompra = async(req, res, next) => {
    try {
        await repository.updateCompra(req.params.id, req.body)
        res.status(200).send({
            message: "Estoque do produto atualizado com sucesso!"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar estoque do produto",
            data: e
        })
    }
}

//Criando as funções de resposta para o retorno do delete
exports.delete = async(req, res, next) => {
    try {
        var data = await repository.delete(req.params.id)
        res.status(200).send({
            message: "Produto removido com sucesso"
        })
    } catch (e) {
        res.status(500).send({
            message: "Falha ao remover produto",
            data: e
        })
    }
}