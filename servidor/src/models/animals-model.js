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
        required: [true, 'O nome é obrigatório'],
    },
    age: {
        type: Number,
        required: [true, 'A idade é obrigatória'],
    },
    race: {
        type: String,
        required: [true, 'A raça é obrigatória'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    photo: {
        type: String,
        required: [true, 'A foto é obrigatória']
    },
    schedule: [{
        name: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true,
        },
        day: {
            type: String,
            require: true,
        },
        hour: {
            type: String,
            require: true
        }
    }]
});

module.exports = mongoose.model("Animals", schema)