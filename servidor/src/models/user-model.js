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
    user: {
        type: String,
        required: [true, "O user é obrigatorio"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "O email é obrigatorio"],
        trim: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "A senha é obrigatoria"]
    },
    cel: {
        type: String,
        require: [true, "O telefone é obrigatorio"]
    },
    adress: {
        type: String,
        required: [true, "O endereço é obrigatorio"]
    },
    photo: {
        type: String,
        required: [true, "A foto é obrigatoria"]
    },
    logged: {
        type: String,
        required: true,
    },
    adm: {
        type: Number,
        required: true,
    }
})


module.exports = mongoose.model("User", schema)