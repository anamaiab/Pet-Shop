/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/


"use strict"

//Carregando requisições
const express = require("express")
const router = express.Router()
const controller = require("../controllers/agendamento-controller")
const axios = require("axios")
const vue = require("vue")

// Criando rotas para o banco de dados
router.get("/", controller.get)
router.get("/user/:user", controller.getByUserId)
router.get("/pet/:id", controller.getByPetId)
router.get("/date/:date", controller.getByDate)
router.get("/datehour/:date/:hour", controller.getByDateHour)
router.get("/petuser/:pet/:user", controller.getByPetUser)
router.post("/", controller.post)
router.post("/adm", controller.createAdm)
router.put("/:id", controller.update)
router.delete("/:id", controller.delete)


module.exports = router