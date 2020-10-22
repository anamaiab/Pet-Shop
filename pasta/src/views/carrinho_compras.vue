<!--
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
  -->

<template>
  <div class="carrinho_compras">
    <!--Início das barras de navegação do pet shop-->
    <div class="top-bar">
      <div class="button-holder-top">
        <a id="logo" href="/home_login">PET SHOP</a>
        <img id="imagem" src="../../png/pets.png" width="40" height="40" />
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
    <!--Fim das barras de navegação -->

    <!--Título-->
    <h1>Carrinho de Compras</h1>

    <!--Sessão onde estão os produtos-->
    <div class="main" id="main">{{carrinho()}}</div>

    <!--Sessão do botão de finalizar compra-->
    <div class="finalizar">
      <button v-on:click.prevent.stop="criando_area_pagamento()">Finalizar compra</button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    user_id: "",
    quantidadeDeItens: 0,
    num_cartao: "",
    nome_cartao: "",
    data_val_cartao: "",
    cod_seguranca_cartao: "",
    cpf_cartao: "",
    card_tag: 0,
    erros: ""
  }),

  methods: {
    //Função para guuardar o id do usuario logado
    logado(dados) {
      this.user_id = dados[0]._id;
    },

    //Função para pegar os produtos e serviços no carrinho, primeiro se descobrre quem é a pessoa logada
    carrinho() {
      fetch("http://localhost:3000/user/logged/", {
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
              this.logado(jsonRes);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });

      this.carrinhoBD();
    },

    //Função para pegar os produtos e serviços do carrinho no bd
    carrinhoBD() {
      fetch("http://localhost:3000/carrinho/user/" + this.user_id, {
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
              this.carregar_carrinho(jsonRes);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    //Função que "imprimi" na tela os produtos/serviços do carrinho
    carregar_carrinho(dados) {
      var precofinal = 0;
      this.quantidadeDeItens = dados.length;

      for (var i = 0; i < dados.length; i++) {
        var local = "compra" + [i];
        var div = document.createElement("div");
        div.className = "compra";
        div.id = local;
        document.getElementById("main").appendChild(div);

        //Botão que deleta o produto ou serviço do carrinho
        var b = document.createElement("button");
        b.setAttribute("type", "submit");
        b.className = "deleteItem";
        b.innerHTML = "X";
        b.id = dados[i]._id;
        b.onclick = function() {
          var r = confirm(
            "Você irá remover esse produto do carrinho. Deseja continuar?"
          );

          var idBotao = window.event.srcElement.id;

          if (r == false) return;
          else {
            //Removendo do BD
            fetch("http://localhost:3000/carrinho/" + idBotao, {
              method: "DELETE"
            });
          }
           window.location.href = "carrinho_compras";
        };
        document.getElementById(local).appendChild(b);

        //Colocando imagem do produto/serviço
        var img = document.createElement("IMG");
        img.src = dados[i].photo;
        img.style.height = "150px";
        img.style.width = "150px";
        document.getElementById(local).appendChild(img);

        //Colocando nome do produto/serviço
        var prodTitle = document.createElement("a");
        prodTitle.title = dados[i].name;
        prodTitle.id = "nomeProduto";
        prodTitle.innerHTML = dados[i].name;
        document.getElementById(local).appendChild(prodTitle);

        //Colocando preço do produto/serviço
        var prodPrice = document.createElement("a");
        prodPrice.innerHTML = "R$ " + dados[i].price;
        document.getElementById(local).appendChild(prodPrice);

        //Colocando unidades do produto/serviço
        var a = document.createElement("a");
        a.className = "unidade";
        a.innerHTML = "Unidades: ";
        document.getElementById(local).appendChild(a);

        var quantidades = document.createElement("a");
        quantidades.title = dados[i].name;
        quantidades.id = dados[i].id;
        quantidades.innerHTML = dados[i].quant;
        document.getElementById(local).appendChild(quantidades);

        //Botão de aumentar a quantidade de produtos a serem comprados
        var b2 = document.createElement("button");
        b2.setAttribute("type", "submit");
        b2.className = "AddQuanti";
        b2.innerHTML = "+";
        b2.id = dados[i]._id;
        b2.onclick = function() {
          var idBotao = window.event.srcElement.id;

          //Atualizando no bd a quantidade de unidades requeridas
          fetch("http://localhost:3000/carrinho/" + idBotao, {
            method: "PUT",
            body: JSON.stringify({
              quant: 1
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
            .then(response => response.json())
            .then(json => console.log(json));

          window.location.href = "carrinho_compras";
        };
        document.getElementById(local).appendChild(b2);

        //Botão de diminuir a quantidade de produtos a serem comprados
        var b3 = document.createElement("button");
        b3.setAttribute("type", "submit");
        b3.className = "RemQuanti";
        b3.innerHTML = "-";
        b3.id = dados[i]._id;
        b3.onclick = function() {
          var idBotao = window.event.srcElement.id;

          //Atualizando no bd a quantidade de unidades requeridas
          fetch("http://localhost:3000/carrinho/" + idBotao, {
            method: "PUT",
            body: JSON.stringify({
              quant: 2
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
            .then(response => response.json())
            .then(json => console.log(json));

          window.location.href = "carrinho_compras";
        };
        document.getElementById(local).appendChild(b3);

        //Área do valor total
        var a2 = document.createElement("a");
        a2.id = "total";
        a2.innerHTML = "Valor total: R$";
        a2.style.display = "inline-block";
        a2.style.fontWeight = "bold";
        document.getElementById(local).appendChild(a2);

        var a3 = document.createElement("a");
        a3.innerHTML = dados[i].price * dados[i].quant;
        a3.style.fontWeight = "bold";
        document.getElementById(local).appendChild(a3);

        precofinal = precofinal + dados[i].price * dados[i].quant;
      }

      var div3 = document.createElement("div");
      div3.className = "precoTotal";
      div3.id = "precoTotal";
      div3.innerHTML = "Preço Total: " + precofinal;
      document.getElementById("main").appendChild(div3);
    },

    //Função de pegar os dados do cartão para fazer pagamento
    criando_area_pagamento() {
      if (this.card_tag == 0) {
        var div_pagamento = document.createElement("div");
        div_pagamento.className = "pagamento";
        div_pagamento.id = "pagamento";
        document.getElementById("main").appendChild(div_pagamento);

        //Bandeiras de cartao
        var flagsIMG = document.createElement("IMG");
        flagsIMG.src =
          "https://www.ecommercebrasil.com.br/wp-content/uploads/2017/03/bandeiras-de-cartao-mundipagg.png";
        flagsIMG.className = "cardFlags";
        document.getElementById("pagamento").appendChild(flagsIMG);

        //Numero do cartão
        var numero_cartao = document.createElement("label");
        numero_cartao.innerHTML = "<br>Número do cartão: <br>";
        numero_cartao.className = "card_num";
        document.getElementById("pagamento").appendChild(numero_cartao);

        var inp_card_num = document.createElement("INPUT");
        inp_card_num.setAttribute("type", "number");
        inp_card_num.setAttribute("value", this.num_cartao);
        inp_card_num.id = "card_num";
        inp_card_num.className = "inp_card";
        document.getElementById("pagamento").appendChild(inp_card_num);

        //Nome do Cartão
        var nome_cartao = document.createElement("label");
        nome_cartao.innerHTML = "<br>Nome como está no cartão: <br>";
        nome_cartao.className = "card_name";
        document.getElementById("pagamento").appendChild(nome_cartao);

        var inp_card_name = document.createElement("INPUT");
        inp_card_name.setAttribute("type", "text");
        inp_card_name.setAttribute("value", this.nome_cartao);
        inp_card_name.id = "card_name";
        inp_card_name.className = "inp_card";
        document.getElementById("pagamento").appendChild(inp_card_name);

        //Código de segurança do Cartão
        var cod_seguranca_cartao = document.createElement("label");
        cod_seguranca_cartao.innerHTML = "<br>Código de Segurança: <br>";
        cod_seguranca_cartao.className = "card_security_code";
        document.getElementById("pagamento").appendChild(cod_seguranca_cartao);

        var inp_card_sec_code = document.createElement("INPUT");
        inp_card_sec_code.setAttribute("type", "number");
        inp_card_sec_code.setAttribute("value", this.cod_seguranca_cartao);
        inp_card_sec_code.id = "cod_seguranca_cartao";
        inp_card_sec_code.className = "inp_card";
        document.getElementById("pagamento").appendChild(inp_card_sec_code);

        //Data de Validade do Cartão
        var val_cartao = document.createElement("label");
        val_cartao.innerHTML = "<br>Validade: <br>";
        val_cartao.className = "card_expiration_date";
        document.getElementById("pagamento").appendChild(val_cartao);

        var inp_val_cartao = document.createElement("INPUT");
        inp_val_cartao.setAttribute("type", "text");
        inp_val_cartao.setAttribute("value", this.data_val_cartao);
        inp_val_cartao.id = "card_expiration_date";
        inp_val_cartao.className = "inp_card";
        inp_val_cartao.placeholder = "mm/aa";
        document.getElementById("pagamento").appendChild(inp_val_cartao);

        //CPF Cartão
        var cpf_cartao = document.createElement("label");
        cpf_cartao.innerHTML = "<br>CPF: <br>";
        cpf_cartao.className = "card_owner_cpf";
        document.getElementById("pagamento").appendChild(cpf_cartao);

        var inp_cpf_cartao = document.createElement("INPUT");
        inp_cpf_cartao.setAttribute("type", "number");
        inp_cpf_cartao.setAttribute("value", this.cpf_cartao);
        inp_cpf_cartao.className = "inp_card";
        inp_cpf_cartao.id = "cpf_cartao";
        inp_cpf_cartao.mask = "000.000.000-00";
        inp_cpf_cartao.maxlength = "14";
        inp_cpf_cartao.placeholder = "555.555.555-55";
        document.getElementById("pagamento").appendChild(inp_cpf_cartao);

        this.card_tag = 1;
      } else {
        //Confere se todos os campos foram preenchidos, se foram chama a função de finalziar compra
        if (!document.getElementById("card_num").value) this.erros += "Campo do número do cartão está vazio\n";
        if (!document.getElementById("card_name").value) this.erros += "Campo do nome está vazio\n";
        if (!document.getElementById("cod_seguranca_cartao").value) this.erros += "Campo do código de segurança do cartão está vazio\n";
        if (!document.getElementById("card_expiration_date").value) this.erros += "Campo de validade do cartão está vazio\n";
        if (!document.getElementById("cpf_cartao").value) this.erros += "Campo do cpf está vazio\n";

        if (!this.erros) this.Finalizar();
        else alert(this.erros);
        this.erros = "";
      }
    },

    //Pega todos os produtos e serviços do carrinhos
    Finalizar() {
      fetch("http://localhost:3000/carrinho/user/" + this.user_id, {
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
              this.FinalizarCompra(jsonRes);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    //Função que atualiza a quantidade de produtos vendidos e a quantidade em estoque
    FinalizarCompra(dados) {
      var r = confirm("Você deseja finalizar a compra?");

      if (r == false) return;
      else {
        for (var i = 0; i < dados.length; i++) {
          this.$axios
            .put(
              "http://localhost:3000/products/compra/" + dados[i].product_id,
              {
                vendidos: dados[i].quant
              }
            )
            .then(response => {
              console.log(response);
              this.atualizarCarrinho();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    },

    //Por fim limpa-se o carrinho
    atualizarCarrinho() {
      this.$axios.delete("http://localhost:3000/carrinho/delete/", {
        data: {
          user_id: this.user_id
        }
      });

      window.location.href = "carrinho_compras";
    }
  }
};
</script>

<style>
/*Define para todos os textos: fonte, tamanho da fonte, centralização e cor do texto*/
* {
  font-family: "Baloo Bhaina 2";
  color: #4f4f4f;
  font-size: 20px;
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

/*define cor do plano de fundo*/
body {
  background-color: #f2f2f2;
}

/*estiliza titulo*/
h1 {
  font-size: 32px;
  text-align: center;
}

/*define visualização em blocos*/
.main {
  display: block;
}

/*define alinhamento das imagens com o resto das informações do produto*/
img {
  vertical-align: middle;
}

/*design do bloco que contém as informações do produto*/
.compra {
  display: block;
  text-align: left;
  background-color: #e8e8e8;
  vertical-align: middle;
  padding-right: 10px;
  margin-bottom: 2%;
  margin-left: -7%;
  width: 102%;
}

/*alinha e define padding do nome do produto*/
#nomeProduto {
  vertical-align: middle;
  padding-right: 7%;
  padding-left: 4%;
  display: inline-block;
}

/*estiliza "unidades"*/
.unidade {
  font-size: 20px;
  padding-left: 7%;
  padding-right: 6px;
}

/*estiliza seção de valor final (valor da unidade*quantidade)*/
#total {
  font-size: 20px;
  padding-left: 7%;
  padding-right: 5px;
}

/*estiliza seção de preço total*/
.precoTotal {
  font-weight: bold;
  margin-left: 78%;
}

/*estiliza botão de deletar produto*/
.deleteItem {
  font-weight: bold;
  padding-left: 0%;
  padding-right: 3%;
  background-color: #e8e8e8;
  border: none;
  font-size: 21px;
  color: #4f4f4f;
  padding-bottom: 4.5%;
}

/*Estiliza o botão de aumentar quantidade*/
.AddQuanti {
  font-weight: bold;
  padding-left: 0%;
  background-color: #e8e8e8;
  border: none;
  font-size: 23px;
  color: #4f4f4f;
  padding-bottom: 6%;
  margin-left: 1%;
}

/*Estiliza o botão de diminuir quantidade*/
.RemQuanti {
  font-weight: bold;
  padding-left: 0%;
  background-color: #e8e8e8;
  border: none;
  font-size: 23px;
  color: #4f4f4f;
  padding-bottom: 37px;
  margin-left: -28px;
}

/*estiliza botão de finalizar compra*/
button {
  border: 1px solid rgb(101, 139, 82);
  background-color: rgb(119, 180, 85);
  border-radius: 5px;
  color: white;
  margin-top: 10px;
  margin-left: 3%;
  font-size: 14px;
  padding: 4px 18px;
  text-transform: uppercase;
}

/*Estiliza o botão de finalizar compra*/
.finalizar {
  margin-left: 80%;
}

/*Estiliza as marcas do cartão*/
.cardFlags {
  width: 220px;
}

/*estiliza caixas de texto dados do cartão*/
.inp_card {
  width: 55%;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
</style>
