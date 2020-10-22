/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const express = require("express")
const router = express.Router()
const controller = require("../controllers/product-controller")
const axios = require("axios")
const vue = require("vue")

// Criando rotas para o banco de dados
router.get("/", controller.get)
router.get("/id/:id", controller.getById)
router.get("/total/total", controller.getValor)
router.post("/", controller.post)
router.delete("/:id", controller.delete)
router.put("/:id", controller.put)
router.put("/compra/:id", controller.updateCompra)

module.exports = router