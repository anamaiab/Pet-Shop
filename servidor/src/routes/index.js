/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/


"use strict"

//Carregando requisições
const express = require("express")
const router = express.Router()
const axios = require ("axios")
const vue = require("vue")

//Criando as funções de resposta para o retorno do get
router.get("/", (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.2"
    })
})

module.exports = router