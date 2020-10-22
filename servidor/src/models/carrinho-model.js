/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const axios = require("axios")
const vue = require("vue")
const Schema = mongoose.Schema

//Criando o estilo (colunas) do banco de dados
const schema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        require: false
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
        require: false

    },
    price: {
        type: Number,
        required: [true, "O preco do produto é obrigatorio"],
        trim: true
    },
    name: {
        type: String,
        required: [true, "O nome do produto obrigatoria"]
    },
    photo: {
        type: String,
        required: true,
    },
    quant: {
        type: Number,
        required: true
    },
    tag: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model("Carrinho", schema)