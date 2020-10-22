<!--
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
  -->

<template>
  <div class="produtos">
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

    <!--Título-->
    <h1>Produtos para o seu melhor amigo</h1>

    <!-- Início da sessão onde estão os produtos -->
    <div class="mainn" id="mainn">{{carregarProdutosBD()}}</div>
  </div>
</template>

<script>
export default {
 methods: {
    //Função que carrega os produtos do BD
    carregarProdutosBD() {
      fetch("http://localhost:3000/products/", {
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
              this.carregarProdutos(jsonRes);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

  //Função que "imprimi" os produtos na tela
    carregarProdutos(dados) {
      for (var i = 0; i < dados.length; i++) {
        if (dados[i].estoque > 0) {
          var local1 = "productId" + i;
          var div = document.createElement("div");
          div.className = "productID";
          div.id = local1;
          document.getElementById("mainn").appendChild(div);

          var local2 = "productImg" + i;
          var a = document.createElement("a");
          a.className = "productImg";
          a.id = local2;
          document.getElementById(local1).appendChild(a);

          var img = document.createElement("IMG");
          img.src = dados[i].photo;
          img.style.width = "150px";
          img.style.height = "200px";
          img.style.marginBottom = "7%";
          document.getElementById(local2).appendChild(img);

          var local3 = "productInfo" + i;
          var div2 = document.createElement("div");
          div2.className = "productInfo";
          div2.id = local3;
          document.getElementById(local1).appendChild(div2);

          var local4 = "productName" + i;
          var div3 = document.createElement("div");
          div3.className = "productName";
          div3.id = local4;
          document.getElementById(local3).appendChild(div3);

          var a2 = document.createElement("a");
          a2.innerHTML = dados[i].name;
          a2.id = dados[i].name;
          document.getElementById(local4).appendChild(a2);

          var enter = document.createElement("br");
          document.getElementById(dados[i].name).appendChild(enter);

          var local5 = "productDescription" + i;
          var div4 = document.createElement("div");
          div4.className = "productDescription";
          div4.id = local5;
          document.getElementById(local3).appendChild(div4);

          var a3 = document.createElement("a");
          a3.innerHTML = dados[i].description;
          a3.id = dados[i].description;
          document.getElementById(local5).appendChild(a3);

          var enter1 = document.createElement("br");
          document.getElementById(dados[i].description).appendChild(enter1);

          var local6 = "productPrice" + i;
          var div5 = document.createElement("div");
          div5.className = "productPrice";
          div5.id = local6;
          document.getElementById(local3).appendChild(div5);

          var a4 = document.createElement("a");
          a4.innerHTML = "R$" + dados[i].price + "<br>";
          document.getElementById(local6).appendChild(a4);

          //Botão que tem a função de adicionar o produto no carrinho
          var b = document.createElement("button");
          b.setAttribute("type", "submit");
          b.className = "carrinho";
          b.innerHTML = "Adicionar ao carrinho";
          b.onclick = function() {
            //Se não estiver logado aparecerá um aviso para se logar
            var r = confirm(
              "Para adicionar produtos no carrinho é necessário estar logado. Deseja fazer login?"
            );

            if (r == false) return;
            else {
              window.location.href = "login";
            }
          };
          document.getElementById(local1).appendChild(b);

          var div6 = document.createElement("div");
          div6.className = "idProduto";
          div6.innerHTML = "Produto ID: " + dados[i]._id;
          document.getElementById(local1).appendChild(div6);
        }
      }
    },

  }
};
</script>
<style>
* {
  /*Define para todos os textos: fonte e cor do texto*/
  font-family: "Baloo Bhaina 2";
  color: #4f4f4f;
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
  size: 24px;
}

/*define estilo e posição da imagem do logo do pet shop, localizado na .top-bar (verde clara)*/
#imagem {
  float: left;
  margin-top: 7px;
}

/*define cor de fundo do site*/
body {
  background-color: #f2f2f2;
}

/*estiliza título*/
h1 {
  font-size: 32px;
  text-align: center;
}

/*estiliza a main*/
.mainn {
  margin-left: 9%;
  font-size: 18px;
}



/*estiliza sessão de cada produto (cria e estiliza retângulo cinza)*/
.productID {
  display: inline-block;
  background-color: #e8e8e8;
  border-radius: 5px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 2%;
  width: 22%;
  min-width: 300px;
  height: 450px;
  text-align: center;
  vertical-align: middle;
}

/*Esyiliza todos os botões da página ('editar')*/
button {
  border: 1px solid rgb(101, 139, 82);
  background-color: rgb(119, 180, 85);
  border-radius: 5px;
  color: white;
  margin-top: 10px;
  font-size: 14px;
  text-transform: uppercase;
  vertical-align: bottom;
}

/*Estiliza o botao de adicionar ao carrinho*/
.carrinho {
  margin-top: 10%;
}


/*define alinhamento do nome e preço dos protudos*/
.productInfo {
  text-align: center;
}

/*define margem para o preço do produto -> evitar se sobrepor ao nome, caso este seja muito grande*/
.productPrice {
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
}

/*define margem para a descrição do produto -> evitar se sobrepor caso esteka muito grande*/
.productDescription {
  margin-top: 15px;
  text-align: center;
}

/*define estilo para nome do produto*/
.productName {
  width: 100%;
  height: 10%;
  font-weight: bold;
  line-height: 1;
  text-align: center;
}

/*Estiliza o id do produto*/
.idProduto {
  font-size: 8px;
  margin-left: 27%;
  margin-top: 2%;
  margin-bottom: -8%;
}

/*estiliza imagem de + na sessão para adicionar novo produto*/
.addProduct {
  vertical-align: middle;
  padding-top: 150px;
}
</style>
