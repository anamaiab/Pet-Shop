/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const express = require("express")
const router = express.Router()
const controller = require("../controllers/services-controller")
const axios = require("axios")
const vue = require("vue")

// Criando rotas para o banco de dados
router.get("/", controller.get)
router.get("/:id", controller.getById)
router.get("/title/:title", controller.getByName)
router.get("/total/total", controller.getValor)
router.post("/", controller.post)
router.put("/:id", controller.put)
router.put("/update/:id", controller.atualizandoServico)
router.delete("/:title", controller.delete)


module.exports = router