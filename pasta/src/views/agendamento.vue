<!--
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
  -->

<template>
  <div class="agendamento">
    <!--Início das barras de navegação do pet shop-->
    <div class="top-bar">
      <div class="button-holder-top">
        <a id="logo" href="/">PET SHOP</a>
        <img id="imagem" src="../../png/pets.png" width="40" height="40" />
        <div id="barra1">
          <a href="login">Login</a>
          <a href="cadastro_usuario">Cadastre-se</a>
        </div>
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
    <div id="titulo">
      <h1>Agendamento de Serviços</h1>
    </div>
    <!-- Fim do Título -->

    <!--Criando a seção de escolher a data-->
    <div id="agenda" class="opcoes">
      Escolha uma data:
      <input class="chooseDate" type="date" id="data" name="data" v-model="data" />
      <!--Criando a seção de adiconar uma imagem do calendário que será implementado em javascript futuramente-->
    </div>

    <!-- Fim do escolher a data -->

    <!--Criando a seção de escolher serviço-->
    <div id="servico" class="opcoes">
      Escolha uma serviço:
      <select id="listaservicos" class="optionSelect" v-model="servico">
        {{gerandoServicos()}}
        <option selected value>Serviço</option>
      </select>
    </div>
    <!-- Fim do escolher serviço -->

    <!--Criando a seção de escolher serviço-->
    <div id="animais" class="opcoes">
      Escolha uma amiguinho:
      <select id="listaanimais" class="optionSelect" v-model="animal">
        <option selected value>Animal</option>
      </select>
    </div>
    <!-- Fim do escolher serviço -->

    <button id="pesquisar" v-on:click.prevent.stop="pesquisar()">Pesquisar horários</button>
  </div>
</template>


<script>
export default {
  data: () => ({
    servico: "",
    data: "",
    animal: "",
    tagS: 1
  }),

  methods: {
    
    //Função de carregar quais serviços estão disponiveiis
    gerandoServicos() {
      if (this.tagS == 1) {
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
      }
    },

    //Função de "imprimir" na tela os nomes do serviço
    carregarServicos(dados) {
      for (var i = 0; i < dados.length; i++) {
        var li = document.createElement("option");
        li.className = "optionSelect"; 
        li.innerHTML = dados[i].title;
        document.getElementById("listaservicos").appendChild(li);
      }
      this.tagS = 0;
    },

    //Função do botão que avisa que para fazer um agendamento é necessário estar logado
    pesquisar() {
      var r = confirm(
        "Para poder continuar e agendar um horário é necessário estar logado. Deseja fazer login?"
      );

      if (r == false) return;
      else window.location.href = "login";
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

/*Define cor de fundo do site*/
body {
  background-color: #f2f2f2;
}

/*Estiliza título*/
h1 {
  font-size: 32px;
  text-align: center;
}

/*Estiliza todos os botões da página ('editar')*/
button {
  border: 1px solid rgb(101, 139, 82);
  background-color: rgb(119, 180, 85);
  border-radius: 5px;
  color: white;
  margin-top: 10px;
  font-size: 14px;
  padding: 8px 18px;
  text-transform: uppercase;
}



/*Estiliza o local de aparecer os serviços*/
.optionSelect {
  margin-left: 20%;
  border: none;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-left: 10px;
}

/*Estiliza a parte de escolher data*/
.chooseDate {
  width: 190px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
  text-align: center;
}
</style>
