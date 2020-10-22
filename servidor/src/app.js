/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

'use strict'

//Carregando requisições
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const axios = require("axios")
const vue = require("vue")
const cors = require('cors')


const app = express()
const router = express.Router()

//Conecta ao banco
mongoose.connect("mongodb+srv://admin:bia-mont01@cluster0.apu6o.mongodb.net/test")

//Carrega os odels
const User = require("./models/user-model")

//Carrega os odels
const Services = require("./models/services-model")

//Carrega os odels
const Animals = require("./models/animals-model")

//Carrega os odels
const Products = require("./models/product-model")

//Carrega os odels
const Carrinho = require("./models/carrinho-model")

//Carrega os odels
const Agendamento = require("./models/agendamento-model")

//Carregar rotas
const indexRoute = require("./routes/index")
const userRoute = require("./routes/user-routes")
const servicesRoute = require("./routes/services-routes")
const animalsRoute = require("./routes/animals-routes")
const productRoute = require("./routes/product-routes")
const carrinhoRoute = require("./routes/carrinho-routes")
const agendamentoRoute = require("./routes/agendamento-routes")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors())

//Criando as rotas para as URL do banco de dados
app.use("/", express.static("../../Exerc7-Novo/Exercicio 4/pasta/dist"))

app.use("/", indexRoute)
app.use("/user", userRoute)
app.use("/services", servicesRoute)
app.use("/animals", animalsRoute)
app.use("/products", productRoute)
app.use("/carrinho", carrinhoRoute)
app.use("/agendamento", agendamentoRoute)

app.use(bodyParser.json({ limit: "50mb" }))

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

module.exports = app