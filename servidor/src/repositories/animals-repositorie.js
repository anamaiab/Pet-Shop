/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const Animals = mongoose.model("Animals")
const User = mongoose.model("User")
const Agendamento = mongoose.model("Agendamento")
const Carrinho = mongoose.model("Carrinho")
const axios = require("axios")
const vue = require("vue")

//Fazendo a pesquisa do get (usando o find)
exports.get = async () => {
    const res = await Animals.find({}, "name age race owner photo").populate("owner", "id") //Retorna os valores name age race owner (devolve seu id) photo
    return res
}

//Fazendo a pesquisa do get (usando o find) mas so para um animal com um dono definido 
exports.getByName = async (name, owner) => {
    const res = await Animals.findOne({
        name: name,
        owner: owner
    },
        "name age race owner photo").populate("owner", "name") //Retorna as infomações name age race owner (retorna seu id e seu name) photo
    return res
}

//Fazendo a pesquisa do get (usando o find) mas so para um um dono definido 
exports.getByOwner = async (owner) => {
    const res = await Animals.find({
        owner: owner
    },
        "name age race photo ")  //Retorna as infomaçõesname age race photo
    return res
}


//Fazendo a pesquisa do get (usando o find) mas so animal com o dono de um determinado email
exports.getByEmailAnimal = async (name, email) => {

    //Pegando o id do user atravez do email
    const res0 = await User.findOne({
        email: email
    },
        "_id")


    //Tranformando em string
    const obj = JSON.stringify(res0)
    const obj2 = JSON.parse(obj)


    //Pegando as informações atravez do owner e do name do animal
    const res = await Animals.findOne({
        owner: obj2._id,
        name: name
    },
        "name age race owner photo").populate("owner", "email") //Retorna as infomações name age race owner(retorna o id e o email) photo

    return res
}

//Criando um novo animal
exports.create = async (data) => {
    var animals = new Animals(data)
    await animals.save()
}


//Fazendo update nas informações de um animal
exports.update = async (id, data) => {

    await Animals.
        findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                age: data.age,
                race: data.race,
                photo: data.photo,
            }
        })
}


//Deletando um animal
//Quando se deleta um animal é necessário deletar os agendamentos e os seus serviços no carrinho dele tambem
exports.delete = async (id) => {

    //Pegando os agendamentos do animal
    const res1 = await Agendamento.find({ pet_id: id },
        "_id")

    //Transformando em string
    const obj = JSON.stringify(res1)
    const obj2 = JSON.parse(obj)

    //Deletando os agendamentos do animal
    for (var j = 0; j < obj2.length; j++) {
        await Agendamento.deleteOne({ _id: obj2[j]._id })
        await Carrinho.deleteOne({ service_id: obj2[j]._id })
    }

    //Deletando o animal
    await Animals.deleteOne({ _id: id })
}