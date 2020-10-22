/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const express = require("express")
const router = express.Router()
const controller = require("../controllers/user-controller")
const axios = require("axios")
const vue = require("vue")

// Criando rotas para o banco de dados
router.get("/", controller.get)
router.get("/user/:user", controller.getByUser)
router.get("/email/:email", controller.getByEmail)
router.get("/emailm/:email", controller.getByEmailMod)
router.get("/logged", controller.getByLogged)
router.post("/", controller.post)
router.delete("/:email", controller.delete)
router.put("/:id", controller.put)
router.put("/update/:id", controller.updateInfo)
router.put("/updateinfo/:id", controller.updateInfoAdm)
router.put("/updateAdm/:email", controller.updateAdm)


module.exports = router