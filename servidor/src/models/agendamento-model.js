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
        ref: "User"
    },
    pet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animals"
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services"
    },
    servicename: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services"
    },
    date: {
        type: Date,
        required: [true, 'A data é obrigatória']
    },
    hour: {
        type: Number,
        required: [true, 'A hora é obrigatória']
    },
});

module.exports = mongoose.model("Agendamento", schema)