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
    title: {
        type: String,
        required: [true, 'O título é obrigatório'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'A descrição é obrigatória']
    },
    price: {
        type: Number,
        required: [true, 'O preço é obrigatório']
    },
    duration: {
        type: Number,
        required: true
    },
    photop: {
        type: String,
        require: true
    },
    photob: {
        type: String,
        require: true
    },
    vendidos: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Services", schema)