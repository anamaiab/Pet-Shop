/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const Services = mongoose.model("Services")
const Agendamento = mongoose.model("Agendamento")
const Carrinho = mongoose.model("Carrinho")
const axios = require("axios")
const vue = require("vue")

//Fazendo a pesquisa do get (usando o find)
exports.get = async () => {
    const res = await Services.find({}, "title description price duration photop vendidos") //Retorna os valores title description price duration photop vendidos 
    return res
}


//Fazendo a pesquisa do get (usando o find) mas so para um id definido
exports.getById = async (id) => {
    const res = await Services.find({
        _id: id
    },
        "title description price duration photop vendidos") //Retorna as infomações title description price duration photop vendidos
}

//Fazendo a pesquisa do get (usando o find) mas so para um title definido
exports.getByName = async (title) => {
    const res = await Services.findOne({
        title: title
    },
        "description price duration photop photob vendidos title") //Retorna as infomações description price duration photop photob vendidos title
    return res
}

//Fazendo a pesquisa do get (usando o find) 
exports.getValor = async () => {
    const res = await Services.find({}, "title price vendidos") //Retorna as infomações title price vendidos
    return res
}


//Criando um novo serviço
exports.create = async (data) => {
    var services = new Services(data)
    await services.save()
}

//Fazendo update nas informações de um serviço
exports.update = async (id, data) => {

    await Services.
        findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                duration: data.duration,
                photop: data.photop,
                photob: data.photob,
                vendidos: data.vendidos

            }
        })
}

//Fazendo update nas informações de um serviço, essa função aumenta o número de vendas de um serviço (após o realizamento de um pagamento)
exports.atualizandoServico = async (id) => {

    //Pegando o id de um serviço pelo id do agendamento
    const service = await Agendamento.findOne({ _id: id }, "service").populate("service", "id")

    //Tranformando em string
    const obj0 = JSON.stringify(service)
    const obj1 = JSON.parse(obj0)

    var service_id = obj1.service._id

    //Pegando a quantidades de vendas do serviço em questão
    const res = await Services.findOne({
        _id: service_id
    }, "vendidos")

    //Transformando em string
    const obj = JSON.stringify(res)
    const obj2 = JSON.parse(obj)

    var vendidos = obj2.vendidos + 1

    //Atualizando o numero de serviço vendidos
    await Services.
        findByIdAndUpdate(service_id, {
            $set: {
                vendidos: vendidos
            }
        })
}

//Deletando um serviço, quando se deleta um serviço, é necessário deletar os agendamento dele e os serviços no carrinho
exports.delete = async (title) => {

    //Pegando o id do serviço atravez do title dele  
    const service = await Services.findOne({ title: title }, "_id")

    //Tranformando em string
    const servico = JSON.stringify(service)
    const servico_id = JSON.parse(servico)

    var id = servico_id._id

    //Pegando os agendamnetos desse serviço
    const res1 = await Agendamento.find({ service: id },
        "_id")

    //Tranformando em string
    const obj = JSON.stringify(res1)
    const obj2 = JSON.parse(obj)

    //Deletando os agendamentos e os agendamentos no carrinho desse serviço
    for (var j = 0; j < obj2.length; j++) {
        await Agendamento.deleteOne({ _id: obj2[j]._id })
        await Carrinho.deleteOne({ service_id: obj2[j]._id })
        
    }

    //Finalmente deletando o serviço
    await Services.deleteOne({ _id: id })
}