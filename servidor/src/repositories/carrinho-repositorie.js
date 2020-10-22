/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const Carrinho = mongoose.model("Carrinho")
const Products = mongoose.model("Products")

const Agendamento = mongoose.model("Agendamento")
const axios = require("axios")
const vue = require("vue")

//Fazendo a pesquisa do get (usando o find)
exports.get = async () => {
    const res = await Carrinho.find({}, "user_id price name photo quant product_id service_id") //Retorna as infomações user_id price name photo quant product_id service_id
    return res
}

//Fazendo a pesquisa do get (usando o find) mas so para um user definido
exports.getByUserID = async (id) => {
    const res = await Carrinho.find({ user_id: id },
        "user_id price name photo quant product_id service_id") //So retorna as infomações user_id price name photo quant product_id service_id
    return res
}

//Inserindo produto ou serviço no carrinho
//Foi optado por não deixar adicionar o mesmo produto mais de uma vez no carrinho
exports.create = async (data) => {

    //Vendo se é um produto
    if (!data.service_id) {

        //Conferindo se já existe um produto igual no carrinho
        const res = await Carrinho.find({ user_id: data.user_id, product_id: data.product_id, service_id: data.service_id })

        //Se não tiver é adicionado
        if (res.length == 0) {
            var user = new Carrinho(data)
            await user.save()

        }
    } else { //Se for um serviço é adicionado diretamento no carrinho sem verificação
        var carrinho = new Carrinho(data)
        await carrinho.save()
    }

}

//Fazendo update na quantidade (aumentar ou diminuir) de um produto no carrinho
//Essa função só funciona para produtos e não para serviços
exports.update = async (id, data) => {

    //Verificando se é um produto
    if (!data.service_id) {

        var quantidade

        //Pegando a quantidade do produto atravez do ID
        const res = await Carrinho.findOne({ _id: id }, "product_id quant")

        //Tranformando para string
        const obj = JSON.stringify(res)
        const obj2 = JSON.parse(obj)

        //Pegando a quantidade de produtos em estoque
        const estoque = await Products.findOne({ _id: obj2.product_id }, "estoque")

        //Tranformando para string
        const obj3 = JSON.stringify(estoque)
        const obj4 = JSON.parse(obj3)

        //Caso tenha se passado valor 1 é para aumentar o valor e 2 para diminuir
        if (data.quant == 1) {
            quantidade = obj2.quant + 1
        } else quantidade = obj2.quant - 1

        //Se a pessoa optar por deixar 0 produtos, ele é eliminado do carrinho
        if (quantidade == 0) await Carrinho.deleteOne({ _id: id })

        //Confirmando se o clinte não está tentando adicionar mais que a quantidade de produtos no estoque (se estiver não é permitido aumentar o valor mais que a quantiade em estoque)
        if (quantidade <= obj4.estoque) {
            await Carrinho.
                findByIdAndUpdate(id, {
                    $set: {
                        quant: quantidade //atualiza quantidade de produtos no carrinho
                    }
                })
        }
    }
}

//Deletando um produto no carrinho
//Caso esteja sendo deletado um servço do carrinho é necessário cancelar o seu agendamento no BD do agendamento
exports.delete = async (id) => {

    const res = await Carrinho.findOne({ _id: id }, "service_id")

    //Transformando em string
    const service = JSON.stringify(res)
    const service_id2 = JSON.parse(service)

    //Conferindo se é um produto
    if (service_id2.service_id != null) {
        await Agendamento.deleteOne({ _id: service_id2.service_id })

    }

    //Por fim é deletado do carrinho
    await Carrinho.deleteOne({ _id: id })
}

//Deletando todos os produto no carrinho
//Essa função é usada quando se é pago e é necessário excluir tudo que tinha no carrinho
exports.deleteAll = async (id) => {

    //Pegando o id do usuario que concluiu a compra
    const res = await Carrinho.find({ user_id: id },
        "_id")

    //Transformando em string
    const obj = JSON.stringify(res)
    const obj2 = JSON.parse(obj)

    for (var i = 0; i < obj2.length; i++) {
        await Carrinho.deleteOne({ _id: obj2[i]._id })
    }
}