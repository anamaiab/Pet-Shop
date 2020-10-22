<!--
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
  -->

<template>
  <div class="servicos">
    <!--Início das barras de navegação do pet shop-->
    <div class="top-bar">
      <div class="button-holder-top">
        <a id="logo" href="/">PET SHOP</a>
        <img id="imagem" src="../../png/pets.png" width="40" height="40" />
        <a href="login">Login</a>
        <a href="cadastro_usuario">Cadastre-se</a>
      </div>
    </div>

    <div class="top-bar-2">
      <div class="button-holder-top">
        <a href="produtos">Produtos</a>
        <a href="servicos">Serviços</a>
        <a href="agendamento">Agendamento de Serviços</a>
      </div>
    </div>

    <!-- Fim das barras de navegação -->

    <!-- Título -->
    <div id="titulo-principal">
      <h1>Serviços</h1>
    </div>
    <!-- Fim do Título -->

    <!--Criando a seção do serviços-->

    <div id="lista_servicos">{{carregarServicosBD()}}</div>
  </div>
</template>

<script>
export default {
  data: () => ({}),

  methods: {
    //Função que carrega todos os serviços do BD na tela
    carregarServicosBD() {
      fetch("http://localhost:3000/services/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res.ok) {
          res
            .json()
            .then(jsonRes => {
              this.carregarServicos(jsonRes);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    //Função de "imprimir" os serviços na tela
    carregarServicos(dados) {
      for (var i = 0; i < dados.length; i++) {
        var local1 = "servico_id" + i;
        var div = document.createElement("div");
        div.className = "class_servico";
        div.id = local1;
        document.getElementById("lista_servicos").appendChild(div);

        var h2 = document.createElement("H2");
        h2.innerHTML = dados[i].title;
        document.getElementById(local1).appendChild(h2);

        var img = document.createElement("IMG");
        img.src = dados[i].photop;
        img.style.width = "36px";
        img.style.height = "37px";
        img.style.marginLeft = "7px";
        img.style.marginBottom = "-4px";
        document.getElementById(local1).appendChild(img);

        var p = document.createElement("P");
        p.className = "descricao";
        p.innerHTML = "<br> <b>Descrição: </b>" + dados[i].description;
        document.getElementById(local1).appendChild(p);

        var p2 = document.createElement("P");
        p2.className = "preco";
        p2.innerHTML = "<br><b>Preço:</b>" + " R$ " + dados[i].price;
        document.getElementById(local1).appendChild(p2);

        var p3 = document.createElement("P");
        p3.className = "tempo";
        p3.innerHTML = "<br><b>Duração: </b>" + dados[i].duration + " horas";
        document.getElementById(local1).appendChild(p3);
      }
    }
  }
};
</script>

<style>
/*Define para todos os textos: fonte e cor do texto*/
* {
  vertical-align: center;
  font-family: "Baloo Bhaina 2";
  font-size: 18px;
  color: #4f4f4f;
}

/*Define estilo da barra do topo das páginas (verde clara)*/
.top-bar {
  overflow: hidden;
  background-color: rgb(119, 180, 85);
  position: fixed;
  margin-left: -8px;
  top: 0;
  width: 100%;
  font-size: 18px;
}

/*Define estilo da segunda barra do topo (verde escura)*/
.top-bar-2 {
  overflow: hidden;
  background-color: rgb(101, 139, 82);
  position: fixed;
  margin-left: -8px;
  width: 100%;
  top: 55px;
  font-size: 18px;
}

/*Define estilo do texto para todo o texto da barra do topo da página (verde clara)*/
.top-bar a {
  float: right;
  display: block;
  size: 20px;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 18px;
}

/*Define estilo do texto da segunda barra do topo da página (verde escura)*/
.top-bar-2 a {
  float: right;
  display: block;
  size: 20px;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 18px;
}

/*Define estilo e posição ds escrita "PET SHOP", no logo do pet shop, localizado na .top-bar (verde clara)*/
#logo {
  float: left;
  display: block;
  color: #f2f2f2;
  font-weight: bolder;
  text-align: center;
  padding: 14px 16px;
  size: 24px;
}

/*Define estilo e posição da imagem do logo do pet shop, localizado na .top-bar (verde clara)*/
#imagem {
  float: left;
  margin-top: 7px;
}

/*Estilizando o fundo da pagina*/
body {
  background-color: #f2f2f2;
}

/*Estilizando a posição do titulo incial*/
#titulo-principal {
  text-align: center;
}

/*Estilizando o titulo incial*/
h1 {
  font-size: 32px;
}

/*Estilizando os títulos dos serviços*/
h2 {
  font-size: 22px;
  display: inline;
}

/*Estilizando todos os textos dos serviços*/
.class_servico {
  min-width: 98%;
  border-style: solid;
  border-width: 3px;
  border-color: rgb(119, 180, 85);
  margin-bottom: 20px;
  background-color: #f2f2f2;
  padding-left: 11px;
}

/* Estilizando todo o estilo das imagens*/
img {
  width: 40px;
  height: 40px;
}
</style>
