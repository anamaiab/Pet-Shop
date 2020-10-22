/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const Agendamento = mongoose.model("Agendamento")
const User = mongoose.model("User")
const Animals = mongoose.model("Animals")
const Services = mongoose.model("Services")
const Carrinho = mongoose.model("Carrinho")
const axios = require("axios")
const vue = require("vue")

//Fazendo a pesquisa do get (usando o find)
exports.get = async () => {
    const res = await Agendamento.find({}, "user_id pet_id service date hour").populate("user_id", "id").populate("pet_id", "id").populate("service", "id") //Retorna as infomações user_id(retorna o id) pet_id(retorna o id) service(retorna o id) date hour
    return res
}

//Fazendo a pesquisa do get (usando o find) mas so para um user definido 
exports.getByUserId = async (user) => {
    const res = await Agendamento.find({
        user_id: user
    },
        "pet_id service date hour").populate("pet_id", "name").populate("service", "title") //Retorna as infomações pet_id(retorna o id e o name) service(retorna o id e o title) date hour
    return res
}

//Fazendo a pesquisa do get (usando o find) mas so para um id definido 
exports.getByPetId = async (id) => {
    const res = await Agendamento.find({
        pet_id: id
    },
        "service date hour").populate("service", "id")//Retorna os valores service (retorna o id) date hour
    return res
}


//Fazendo a pesquisa do get (usando o find) mas so para um pet e user definidos 
exports.getByPetUser = async (pet, user) => {
    const res = await Agendamento.find({
        pet_id: pet,
        user_id: user
    },
        "service date hour").populate("service", "title")//Retorna os valores serive (retorna o id e o title) date hour
    return res
}

//Fazendo a pesquisa do get (usando o find) mas so para um date definido 
exports.getByDate = async (date) => {
    const resposta = []
    const res = await Agendamento.find({
        date: date
    },
        "service pet_id hour user_id servicename").populate("pet_id", "name").populate("service", "photob").populate("user_id", "user").populate("servicename", "title")//Retorna as informações pet_id(retorna o id e o name) service(retorna o id e a photob) hour user_id(retorna o id e o user) servicename(retorna o id e o title)

    return res
}

//Fazendo a pesquisa do get (usando o find) mas so para uma data e hora definidoas
exports.getByDateHour = async (date, hour) => {
    const res = await Agendamento.findOne({
        date: date,
        hour: hour
    },
        "pet_id hour date service animal user_id").populate("pet_id", "name").populate("service", "title").populate("user_id", "email") //Retorna as informações pet_id(retorna o id e o name) hour date service(retorna o id e o title) animal user_id(retorna o id e o email)
    return res
}


//Criando um novo serviço
exports.create = async (data) => {
    var agendamento = new Agendamento(data)
    var res = await agendamento.save()
    return res._id
}


//Criando um novo serviço, essa função é usada apenas pelo adm
exports.createAdm = async (data) => {

    //Confere se a datta escolhida ja esta ocupada
    const ocupado = await Agendamento.findOne({ date: data.date, hour: data.hour }, "_id")

    //Se não estiver é pego os valores necessários (usuario_id, service_id e animal_id) para criar o agendamento e posteriormente é adicionado no carrinho do usuario que foi reservado o agendamento
    if (ocupado == null) {

        var data2 = {}

        var date = data.date.split("-")

        data2.name = data.service + "<br>" + date[2] + "/" + date[1] + " - " + data.hour + ":00" + "<br>" + data.pet_id

        //No data.user_id vem o email
        const user = await User.findOne({ email: data.user_id }, "_id") //Só retorna o id

        const usuario = JSON.stringify(user)
        const usuario_id = JSON.parse(usuario)

        //No data.service vem o nome do serviço
        const service = await Services.findOne({ title: data.service }, "_id price photop") //Só retorna o id

        const servico = JSON.stringify(service)
        const service_id = JSON.parse(servico)

        //No data.pet_id vem o nome do pet
        const animal = await Animals.findOne({ name: data.pet_id, owner: usuario_id._id }, "_id") //Só retorna o id

        const animals = JSON.stringify(animal)
        const animals_id = JSON.parse(animals)

        data.user_id = usuario_id._id
        data.pet_id = animals_id._id
        data.service = service_id._id
        data.servicename = service_id._id

        //Salvando no BD do agendamento
        var agendamento = new Agendamento(data)
        const res = await agendamento.save()


        //Pegando os dados para criar um novo serviço no carrinho
        data2.user_id = usuario_id._id
        data2.service_id = res._id
        data2.price = service_id.price
        data2.photo = service_id.photop
        data2.quant = 1
        data2.tag = 0

        //Salvando o serviço no carrinho
        var carrinho = new Carrinho(data2)
        await carrinho.save()


    }

}

//Fazendo update nas infomrações de um agendamento
exports.update = async (id, data) => {

    //Pegando o id do usuario
    const res1 = await User.findOne({ email: data.email }, "_id") //So retorna as infomações user email password adress

    //Transformando em string
    const res1_1 = JSON.stringify(res1)
    const res1_2 = JSON.parse(res1_1)

    //Pegando o id do animal
    const res2 = await Animals.findOne({ name: data.pet, owner: res1_2._id }, "_id") //So retorna as infomações user email password adress

    //Transformando em string
    const res2_1 = JSON.stringify(res2)
    const res2_2 = JSON.parse(res2_1)

    //Pegando o id do serviço
    const res3 = await Services.findOne({ title: data.service }, "_id") //So retorna as infomações user email password adress

    //Transformando em string
    const res3_1 = JSON.stringify(res3)
    const res3_2 = JSON.parse(res3_1)

    //Atualizando o agendamento
    await Agendamento.
        findByIdAndUpdate(id, {
            $set: {
                pet_id: res2_2._id,
                service: res3_2._id,
                servicename: res3_2._id,
                hour: data.hour
            }
        })

    //COnferindo se o serviço foi atualizado
    if (data.service != data.serviceA) {

        //Se ele for devemos aumentar o numero de serviços vendidos do serviço atualizado
        const res4 = await Services.findOne({
            _id: res3_2._id
        },
            "vendidos") //Pegando a quantidade de vendidos do serviço atual

        //Transformando em string
        const obj = JSON.stringify(res4)
        const obj2 = JSON.parse(obj)

        //Atualizando o valor do vendidos
        var vendidos = obj2.vendidos + 1

        await Services.
            findByIdAndUpdate(res3_2._id, {
                $set: {
                    vendidos: vendidos
                }
            })

        //E depois diminuir a quantidade de serviços vendidos do serviço antigo
        //Pegando o id do serviço antigo
        const res5 = await Services.findOne({ title: data.serviceA }, "_id") //So retorna as infomações user email password adress

        //Transformando em string
        const res5_1 = JSON.stringify(res5)
        const res5_2 = JSON.parse(res5_1)


        //Pegando a quantidade de vendidos do serviço antigo
        const res6 = await Services.findOne({
            _id: res5_2._id
        },
            "vendidos")


        //Transformando em string
        const obj3 = JSON.stringify(res6)
        const obj4 = JSON.parse(obj3)

        //Atualizando a quantidade de vendidos do serviço anterior
        var vendidos2 = obj4.vendidos - 1

        await Services.
            findByIdAndUpdate(res5_2._id, {
                $set: {
                    vendidos: vendidos2
                }
            })

    }
}


//Deletando um agendamento
exports.delete = async (id) => {
    await Agendamento.deleteOne({ _id: id })
}