<!--
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
  -->
<template>
  <div class="home_login">
    <!--Início das barras de navegação do pet shop-->
    <div class="top-bar">
      <div class="button-holder-top">
        <a id="logo" href="home_login">PET SHOP</a>
        <img id="imagem" src="../../png/pets.png" width="40" height="40" />
        <img id="imagem_carrinho" src="../../png/carrinhob.png" width="20" height="20" />
        <a id="logo_carrinho" href="carrinho_compras">Carrinho</a>
        <a href="dados_usuario">Seus Dados</a>
        <a href="seus_animais">Seus Animais</a>

      </div>
    </div>

    <div class="top-bar-2">
      <div class="button-holder-top">
        <a href="produtos_login">Produtos</a>
        <a href="servicos_login">Serviços</a>
        <a href="agendamento_login">Agendamento de Serviços</a>
      </div>
    </div>
    <!-- Fim das barras de navegação -->

    <div class="main">
        <div class="center">

            <!--Título-->
            <h1>Bem Vindo!</h1>

            <!--Subtítulo-->
            <p>Somos um Pet Shop que oferece produtos e serviços para seu melhor amigo. <br> Conheça mais sobre o que
                oferecemos!</p>

            <!--Botões-->
            <div class="button-holder">
                <button> <a href="produtos_login">Comprar Produtos </a></button>
                <button><a href="servicos_login">Conheça Nossos Serviços</a></button>
                <button> <a href="agendamento_login">Agendar Serviços </a></button>
            </div>
        </div>
    </div>


  </div>
</template>

<style scoped>
/*Define para todos os textos: fonte e tamanho do texto*/
* {
  text-align: center;
  font-family: "Baloo Bhaina 2";
  font-size: 18px;
}

/*define estilo da barra do topo das páginas (verde clara)*/
.top-bar {
  overflow: hidden;
  background-color: rgb(119, 180, 85);
  position: fixed;
  margin-left: -8px;
  top: 0;
  width: 100%;
  font-size: 18px;
}

/*define estilo da segunda barra do topo (verde escura)*/
.top-bar-2 {
  overflow: hidden;
  background-color: rgb(101, 139, 82);
  position: fixed;
  margin-left: -8px;
  width: 100%;
  top: 55px;
  font-size: 18px;
}

/*define estilo do texto para todo o texto da barra do topo da página (verde clara)*/
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

/*define estilo do texto da segunda barra do topo da página (verde escura)*/
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

/*define estilo e posição ds escrita "PET SHOP", no logo do pet shop, localizado na .top-bar (verde clara)*/
#logo {
  float: left;
  display: block;
  color: #f2f2f2;
  font-weight: bolder;
  text-align: center;
  padding: 14px 16px;
  size: 12px;
}

/*define estilo e posição da imagem do logo do pet shop, localizado na .top-bar (verde clara)*/
#imagem {
  float: left;
  margin-top: 7px;
}

#imagem_carrinho{
  float: right;
  margin-top: 17px;
  margin-left: -10px;
  max-width: 25px;
  max-height: 25px;
}

/*define cor de fundo do site*/
body {
  background-image: url("../../png/animals.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 703px;
  color: #4f4f4f;
}

.home_login{
  background-image: url("../../png/animals.jpeg");
  background-repeat: no-repeat;
  background-size: 100%;
  height: 703px;
  color: #4f4f4f;
  margin-top: -35px;
}
/*Estiliza todos os botões da página*/
button {
  border: 1px solid rgb(101, 139, 82);
  background-color: rgb(119, 180, 85);
  border-radius: 5px;
  margin-top: 10px;
  padding: 8px 18px;
  text-transform: uppercase;
  margin-left: 10px;
}

/*define margem e tamanho da letra de toda a sessão em que aparecem os botões e o texto*/
.main {
  margin: 50px;
  min-width: 400px;
}

/*estiliza título*/
h1 {
  font-size: 40px;
  margin-left: -35px;
}

/*estiliza texto*/
p {
  margin-left: -57px;
}

/*estiliza conteudo do botao*/
a {
  text-decoration: none;
  color: white;
  font-size: 14px;
}
</style>
