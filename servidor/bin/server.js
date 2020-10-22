/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

'use strict'

//Carregando requisições
const app = require ('../src/app')
const debug = require("debug")("nodestr:server")
const express = require("express") 
const cors = require('cors')

app.use(cors())

const http = require("http")

//Escolhendo a porta
const port = normalizePort(process.env.PORT || "3000")
app.set("port", port)

const server = http.createServer(app)

//Escutando a porta para saber se ja tem algo rodando na porta
server.listen(port)
server.on("error", onError)
server.on("listening", onListening)
console.log("API rodando na porta " + port)


function normalizePort(val){

    const port = parseInt(val, 10)

    if (isNaN(port)){
        return val
    }

    if(port >=0){
        return port
    }

    return false
}

//Função para avisar se a porta ja esta sendo usanda
function onError(error){
    if(error.syscall !== "listen"){
        throw error
    }

    const bind = typeof port === "string" ?
        "Pipe" + port :
        "Port" + port
    
    switch (error.code) {
        case "EACCES" :
                console.error(bind + "requires elevated privileges")
                process.exit(1)
                break
        case "EADDRINUSE" :
            console.error (bind + "is already in use")
            procecess.exit(1)
            break
        default:
            throw error
    }

}

//Função para escutar a porta
function onListening(){
    const addr = server.address()
    const bind = typeof addr === "string"
        ? "pipe" + addr
        : "port" + addr.port
    debug ("Listening on" + bind)
}