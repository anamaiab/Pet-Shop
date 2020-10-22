/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

"use strict"

//Carregando requisições
const mongoose = require("mongoose")
const Products = mongoose.model("Products")
const Carrinho = mongoose.model("Carrinho")
const axios = require("axios")
const vue = require("vue")

//Fazendo a pesquisa do get (usando o find)
exports.get = async () => {
    const res = await Products.find({}, "name price photo estoque description") //Retorna name price photo estoque description
    return res
}

//Fazendo a pesquisa do get (usando o find) mas so para um user definido
exports.getById = async (id) => {
    const res = await Products.findOne({
        _id: id
    },
        "name price photo estoque vendidos description") //Retorna as infomações name price photo estoque vendidos description
    return res
}

//Fazendo a pesquisa do get (usando o find) 
exports.getValor = async () => {
    const res = await Products.find({}, "name price vendidos") //So retorna as infomações name price vendidos
    return res
}


//Criando um novo produto
exports.create = async (data) => {
    var product = new Products(data)
    await product.save()
}


//Fazendo update nas informações de um produto
exports.update = async (id, data) => {

    await Products.
        findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                price: data.price,
                photo: data.photo,
                estoque: data.estoque,
                vendidos: data.vendidos,
                description: data.description

            }
        })
}

//Fazendo update nas quantidade de produtos no estoque e quantidade vendidas quando ocorre uma compra
exports.updateCompra = async (id, data) => {

    const res = await Products.findOne({
        _id: id
    },
        "estoque vendidos")

    //Tranformando para string
    const obj = JSON.stringify(res)
    const obj2 = JSON.parse(obj)

    //Atualizando a quantidade no estoque e a quantidade vendidas
    var estoque = obj2.estoque - data.vendidos
    var vendidos = obj2.vendidos + data.vendidos

    await Products.
        findByIdAndUpdate(id, {
            $set: {
                estoque: estoque,
                vendidos: vendidos,
            }
        })
}

//Deletando um produto, se é deletado um produto é necessário exluir esse produto nos carrinhos
exports.delete = async (id) => {

    //Pegando os id dos produtos no carrinho
    const res = await Carrinho.find({ product_id: id },
        "_id")

    //Transformando em string
    const obj = JSON.stringify(res)
    const obj2 = JSON.parse(obj)

    //Deletando o produto no carrinho
    for (var i = 0; i < obj2.length; i++) {
        await Carrinho.deleteOne({ _id: obj2[i]._id })
    }

    //Deletando o produto
    await Products.deleteOne({ _id: id })

}