/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const User = mongoose.model("User")
const Animals = mongoose.model("Animals")
const Carrinho = mongoose.model("Carrinho")
const Agendamento = mongoose.model("Agendamento")
const axios = require("axios")
const vue = require("vue")


//Fazendo a pesquisa do get (usando o find)
exports.get = async () => {
    const res = await User.find({}, "user email password adress cel") //Retorna as infomações user email password adress cel
    return res
}

//Fazendo a pesquisa do get (usando o find) mas so para um user definido 
exports.getByUser = async (user) => {
    const res = await User.findOne({
        user: user
    },
        "user email password adress cel") //Retorna as infomações user email password adress cel
    return res
}

//Fazendo a pesquisa do get (usando o find) mas so para os user com o logged definido
exports.getByLogged = async () => {

    const res = await User.find({}, "user email password adress cel id logged photo") //Retorna as infomações user id se está logado ou não, email password adress

    //Tranformando para string
    const obj = JSON.stringify(res)
    const obj2 = JSON.parse(obj)

    //Se cria uma resposta com os campos de id, user, email, password, adress, cel, photo caso o cliente esteja logado (logged != 0)    
    const resposta = []


    for (var i in obj2) {
        //So se quer os usuário que estão logados
        if (obj2[i].logged != "0") {
            resposta.push({
                _id: obj2[i]._id,
                user: obj2[i].user,
                email: obj2[i].email,
                password: obj2[i].password,
                adress: obj2[i].adress,
                cel: obj2[i].cel,
                photo: obj2[i].photo
            })
        }
    }


    return resposta


}

//Fazendo a pesquisa do get (usando o find) mas so para um email definido 
exports.getByEmail = async (email) => {
    const res = await User.findOne({
        email: email
    },
        "user email password adm ") //Retorna as infomações user email password e adm
    return res

}

//Fazendo a pesquisa do get (usando o find) mas so para um email definido 
exports.getByEmailMod = async (email) => {
    const res = await User.findOne({
        email: email
    },
        "user email password adress cel photo logged") //Retorna as infomações user email password aderess cel photo logged
    return res

}


//Criando um novo cliente
exports.create = async (data) => {
    var user = new User(data)
    await user.save()
}

//Fazendo update nas informações de um cliente
exports.update = async (id, data) => {
    await User.
        findByIdAndUpdate(id, {
            $set: {
                logged: data.logged //atualiza a opção de esta logado para true (numero do id do logado) ou false (0)
            }
        })
}


//Fazendo update nas informações de um cliente, essa função é usada somente pelo cliente atualizar seus dados
exports.updateInfo = async (id, data) => {
    await User.
        findByIdAndUpdate(id, {
            $set: {
                cel: data.cel,
                password: data.password,
                adress: data.adress,
                user: data.user,
                photo: data.photo,
                email: data.email
            }
        })
}

//Fazendo update nas informações de um cliente, essa função é usada somente na atualização do adm (que pode atualizar mais informações do que o cliente tem permissao para atualizar)
exports.updateInfoAdm = async (id, data) => {
    await User.
        findByIdAndUpdate(id, {
            $set: {
                cel: data.cel,
                password: data.password,
                adress: data.adress,
                user: data.user,
                photo: data.photo,
                logged: data.logged,
                email: data.email
            }
        })
}


//Fazendo update nas informações de um administrador (tira ou colcoar a permissão de adm)
exports.updateAdm = async (email, data) => {

    const res = await User.findOne({
        email: email
    },
        "_id")

    //Transformando para string
    const obj = JSON.stringify(res)
    const obj2 = JSON.parse(obj)

    await User.
        findByIdAndUpdate(obj2._id, {
            $set: {
                adm: data.adm
            }
        })
}

//Deletando um cliente (lembrando que ao deletar um cliente, é necessário deletar todos os animais, agendamento e produtos no carrinho vinculados a ele)
exports.delete = async (email) => {

    //Pegando o id do usuario
    const res = await User.findOne({
        email: email
    },
        "_id")

    //Tranformando em string
    const obj = JSON.stringify(res)
    const obj2 = JSON.parse(obj)

    //Achando todos os animais do usuarios
    const res2 = await Animals.find({ owner: obj2._id },
        "_id")

    const obj3 = JSON.stringify(res2)
    const obj4 = JSON.parse(obj3)

    //Deletando todos os animais desse usuario
    for (var i = 0; i < obj4.length; i++) {
        await Animals.deleteOne({ _id: obj4[i]._id })
    }


    //Achando todos os produtos do carrinho do usuario
    const res3 = await Carrinho.find({ user_id: obj2._id },
        "_id")

    //Tranformando em string
    const obj5 = JSON.stringify(res3)
    const obj6 = JSON.parse(obj5)

    //Deletando todos os produtos do carrinho
    for (var j = 0; j < obj6.length; j++) {
        await Carrinho.deleteOne({ _id: obj6[j]._id })
    }

    //Achando todos os agendamentos do usuario
    const res4 = await Agendamento.find({ user_id: obj2._id },
        "_id")

    //Tranformando em string
    const obj7 = JSON.stringify(res4)
    const obj8 = JSON.parse(obj7)


    //Apagando todos os agendamentos do cliente
    for (var j = 0; j < obj8.length; j++) {
        await Agendamento.deleteOne({ _id: obj8[j]._id })
    }

    //Finalmente apagando o usuário
    await User.deleteOne({ email: email })
}