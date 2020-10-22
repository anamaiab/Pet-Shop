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
    name: {
        type: String,
        required: [true, "O nome do produto é obrigatorio"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "O preço é obrigatorio"],
        index: true,
    },
    description: {
        type: String,
        required: [true, "A descrição é obrigatoria"],
    },
    photo: {
        type: String,
        required: [true, "A foto é obrigatoria"]
    },
    estoque: {
        type: Number,
        required: [true, "A quantidade no estoque é obrigatória"]
    },
    vendidos: {
        type: Number,
        required: [true, "A quantidade de vendas do produto é obrigatória"]
    }
})


module.exports = mongoose.model("Products", schema)