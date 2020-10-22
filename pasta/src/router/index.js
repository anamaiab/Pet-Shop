/*
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
*/

//Fazendo importações necessária de pacotes
import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login.vue'
import servicos_login from '../views/servicos_login.vue'
import seus_animais from '../views/seus_animais.vue'
import agendamento_login from '../views/agendamento_login.vue'
import home_login from '../views/home_login.vue'
import cadatro_usuario from '../views/cadastro_usuario.vue'
import dados_usuario from '../views/dados_usuario.vue'
import produtos from '../views/produtos.vue'
import produtos_login from '../views/produtos_login.vue'
import servicos from '../views/servicos.vue'
import carrinho_compras from '../views/carrinho_compras.vue'
import gerenciamento from '../views/gerenciamento.vue'
import agendamento from '../views/agendamento.vue'



//Fazendo as rotas das paginas html
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: "/login",
        nome: "login",
        component: login
    },
    {
        path: "/home_login",
        nome: "home_login",
        component: home_login
    },

    {
        path: "/dados_usuario",
        nome: "dados_usuario",
        component: dados_usuario
    },
    {
        path: "/agendamento_login",
        nome: "agendamento_login",
        component: agendamento_login
    },
    {
        path: "/seus_animais",
        nome: "seus_animais",
        component: seus_animais
    },
    {
        path: "/cadastro_usuario",
        nome: "cadatro_usuario",
        component: cadatro_usuario
    },
    {
        path: "/produtos",
        nome: "produtos",
        component: produtos
    },
    {
        path: "/produtos_login",
        nome: "produtos_login",
        component: produtos_login
    },
    {
        path: "/servicos",
        nome: "servicos",
        component: servicos
    },
    {
        path: "/servicos_login",
        nome: "servicos_login",
        component: servicos_login

    },
    {
        path: "/carrinho_compras",
        nome: "carrinho_compras",
        component: carrinho_compras

    },
    {
        path: "/gerenciamento",
        nome: "gerenciamento",
        component: gerenciamento

    },
    {
        path: "/agendamento",
        nome: "agendamento",
        component: agendamento
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router