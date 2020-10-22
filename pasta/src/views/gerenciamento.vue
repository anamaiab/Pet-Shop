<!--
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
  -->
<template>
  <div class="gerenciamento">
    <!--Início das barras de navegação do pet shop-->

    <div class="top-bar">
      <div class="button-holder-top">
        <a id="logo">PET SHOP</a>

        <img id="imagem" src="../../png/pets.png" width="40" height="40" />

        <!-- Botão de deslogar do adm-->

        <div id="barra1">
          <a v-on:click.prevent.stop="deslogarLogin()">Deslogar</a>
        </div>
      </div>
    </div>

    <div class="top-bar-2">
      <div class="button-holder-top">
        <a>Página de Gerenciamento</a>
      </div>
    </div>

    <!-- Fim das barras de navegação -->

    <!-- Título -->

    <h1>Gerenciamento</h1>

    <!--Criando sessão de gerenciamento serviços-->

    <div class="mai">
      <div class="section">
        <!--Criando a de adicionar serviços-->

        <h3>Adicionar</h3>

        <div class="elements_acao" id="add_area">
          <div id="addAdm">
            <button class="buton" v-on:click.prevent.stop="AddAdm()">Administrador</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="AddCliente()">Cliente</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="AddAgendamento()">Agendamento</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="AddAnimal()">Animais</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="AddProduto()">Produto</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="AddServico()">Serviço</button>
          </div>
        </div>
      </div>

      <div class="section">
        <!--Criando a seção da excluir serviços-->

        <h3>Excluir</h3>

        <div class="elements_acao" id="rem_area">
          <div>
            <button class="buton" v-on:click.prevent.stop="RemAdm()">Administrador</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="RemCliente()">Cliente</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="RemAgendamento()">Agendamentos</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="RemAnimal()">Animais</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="RemProduto()">Produtos</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="RemServico()">Serviço</button>
          </div>
        </div>
      </div>

      <div class="section">
        <!--Criando a de adicionar serviços-->

        <h3>Modificar</h3>

        <div class="elements_acao" id="mod_area">
          <div id="primeiroFilho">
            <div>
              <button class="buton" v-on:click.prevent.stop="ModAdministrador()">Administrador</button>
            </div>
            <button class="buton" v-on:click.prevent.stop="ModClientes()">Cliente</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="ModAgendamento()">Agendamento</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="ModAnimais()">Animais</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="ModProdutos()">Produto</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="ModServicos()">Serviço</button>
          </div>
        </div>
      </div>

      <div class="section">
        <!--Criando a seção da ganho dos serviços-->

        <h3>Ganhos</h3>

        <div id="elements_acao">
          <div>
            <button class="buton" v-on:click.prevent.stop="TotalServico(1)">Serviço</button>
          </div>

          <div>
            <button id="b2" v-on:click.prevent.stop="TotalServico(2)">Total dos Serviços</button>
          </div>

          <div>
            <button class="buton" v-on:click.prevent.stop="TotalProdutos(1)">Produtos</button>
          </div>

          <div>
            <button id="b2" v-on:click.prevent.stop="TotalProdutos(2)">Total dos Produtos</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Fim da seção de gerenciamento serviço -->
  </div>
</template>

<script>
//document.addEventListener("DOMContentLoaded", this.carregarProdutos());

export default {
  data: () => ({}),

  methods: {
    // logout do usuário logado, atualiza o dado logegd para falso
    deslogarLogin() {
      window.location.href = "/";
    },

    //Função para adicionar administrador
    AddAdm() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("add_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      ////////Area do email do administrador///////////////////////////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Email do Administrador: <br>";
      dados.className = "dados";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "AAemail";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      ///////////////Botão adicionar////////////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.className = "bottaao";
      b.innerHTML = "Adicionar";
      b.onclick = function() {
        var email = document.getElementById("AAemail").value;

        //Adicionando adm (mudando o adm de 0 para 1)
        fetch("http://localhost:3000/user/updateAdm/" + email, {
          method: "PUT",
          body: JSON.stringify({
            adm: 1
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => {
          if (response.status == 200) {
            alert("Administrador adicionado com sucesso");
            window.location.href = "gerenciamento";
          } else {
            alert("Não foi possivel adicionar o administrador");
            window.location.href = "gerenciamento";
          }
        });
      };
      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função para adicionar cliente
    AddCliente() {
      window.location.href = "cadastro_usuario";
    },

    //Função para adicionar agendamento
    AddAgendamento() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("add_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      /////////Adicionando campo do email///////////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Email do Cliente: <br>";
      dados.className = "dados";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "AAemail";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      /////////Adicionando campo do serviço///////////////////////
      var dados2 = document.createElement("label");
      dados2.innerHTML = "Nome do Serviço: <br>";
      dados2.className = "dados";
      var inp2 = document.createElement("INPUT");
      inp2.className = "dados";
      inp2.setAttribute("type", "text");
      inp2.setAttribute("value", "");
      inp2.id = "AAservico";
      elementoPai.insertBefore(dados2, primeiroFilho);
      elementoPai.insertBefore(inp2, primeiroFilho);

      /////////Adicionando campo do animal///////////////////////
      var dados3 = document.createElement("label");
      dados3.innerHTML = "Nome do Animal do Cliente: <br>";
      dados3.className = "dados";
      var inp3 = document.createElement("INPUT");
      inp3.className = "dados";
      inp3.setAttribute("type", "text");
      inp3.setAttribute("value", "");
      inp3.id = "AAanimal";
      elementoPai.insertBefore(dados3, primeiroFilho);
      elementoPai.insertBefore(inp3, primeiroFilho);

      /////////Adicionando campo da data///////////////////////
      var dados4 = document.createElement("label");
      dados4.innerHTML = "Data do Agendamento: <br>";
      dados4.className = "dados";
      var inp4 = document.createElement("INPUT");
      inp4.className = "dados";
      inp4.setAttribute("type", "date");
      inp4.setAttribute("value", "");
      inp4.id = "AAdata";
      elementoPai.insertBefore(dados4, primeiroFilho);
      elementoPai.insertBefore(inp4, primeiroFilho);

      /////////Adicionando horario do agendamento///////////////////////
      var dados5 = document.createElement("label");
      dados5.innerHTML = "Horário do Agendamento: <br>";
      dados5.className = "dados";
      var inp5 = document.createElement("INPUT");
      inp5.className = "dados";
      inp5.setAttribute("type", "number");
      inp5.setAttribute("value", "");
      inp5.id = "AAhora";
      elementoPai.insertBefore(dados5, primeiroFilho);
      elementoPai.insertBefore(inp5, primeiroFilho);

      ////////Botão adicionar/////////////////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.className = "bottaao";
      b.innerHTML = "Adicionar";
      b.onclick = function() {
        var email = document.getElementById("AAemail").value;
        var servico = document.getElementById("AAservico").value;
        var animal = document.getElementById("AAanimal").value;
        var data = document.getElementById("AAdata").value;
        var hora = document.getElementById("AAhora").value;

        //Adicionando o agendamento no bd
        fetch("http://localhost:3000/agendamento/adm", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            user_id: email,
            pet_id: animal,
            service: servico,
            servicename: servico,
            date: data,
            hour: hora
          })
        }).then(response => {
          if (response.status == 201) {
            alert("Agendamento adicionado com sucesso.");
            window.location.href = "gerenciamento";
          } else {
            alert(
              "Erro ao adicionar agendamento. \n Confira se todos os campos foram preenchidos corretamente."
            );
          }
        });
      };

      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função de adicionar animal
    AddAnimal() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("add_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      /////////Adicionando campo do email///////////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Email do Cliente: <br>";
      dados.className = "dados";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "ACemail";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      /////////Adicionando campo do nome///////////////////////
      var dados2 = document.createElement("label");
      dados2.innerHTML = "Nome do Animal: <br>";
      dados2.className = "dados";
      var inp2 = document.createElement("INPUT");
      inp2.className = "dados";
      inp2.setAttribute("type", "text");
      inp2.setAttribute("value", "");
      inp2.id = "ACnome";
      elementoPai.insertBefore(dados2, primeiroFilho);
      elementoPai.insertBefore(inp2, primeiroFilho);

      /////////Adicionando campo da idade///////////////////////
      var dados3 = document.createElement("label");
      dados3.innerHTML = "Idade do Animal (em anos): <br>";
      dados3.className = "dados";
      var inp3 = document.createElement("INPUT");
      inp3.className = "dados";
      inp3.setAttribute("type", "number");
      inp3.setAttribute("value", "");
      inp3.id = "ACidade";
      elementoPai.insertBefore(dados3, primeiroFilho);
      elementoPai.insertBefore(inp3, primeiroFilho);

      /////////Adicionando campo da raca///////////////////////
      var dados4 = document.createElement("label");
      dados4.innerHTML = "Raça do Animal: <br>";
      dados4.className = "dados";
      var inp4 = document.createElement("INPUT");
      inp4.className = "dados";
      inp4.setAttribute("type", "text");
      inp4.setAttribute("value", "");
      inp4.id = "ACraca";
      elementoPai.insertBefore(dados4, primeiroFilho);
      elementoPai.insertBefore(inp4, primeiroFilho);

      /////////Adicionando campo da photo///////////////////////
      var dados5 = document.createElement("label");
      dados5.innerHTML = "Link da Foto: <br>";
      dados5.className = "dados";
      var inp5 = document.createElement("INPUT");
      inp5.className = "dados";
      inp5.setAttribute("type", "text");
      inp5.setAttribute("value", "");
      inp5.id = "ACfoto";
      elementoPai.insertBefore(dados5, primeiroFilho);
      elementoPai.insertBefore(inp5, primeiroFilho);

      /////Botão de adicionar////////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.className = "bottaao";
      b.innerHTML = "Adicionar";
      b.onclick = function() {
        //Pegando os dados inserido
        var email = document.getElementById("ACemail").value;
        var nome = document.getElementById("ACnome").value;
        var idade = document.getElementById("ACidade").value;
        var raca = document.getElementById("ACraca").value;
        var photo = document.getElementById("ACfoto").value;

        //Pegando o id do cliente atraves do email
        fetch("http://localhost:3000/user/email/" + email, {
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
                var user_id = jsonRes._id;
                //Caso de certo pegar o id do usuário vamos pegar qual o id do animal vamos adicionar no banco os dados do animal
                fetch("http://localhost:3000/animals", {
                  method: "post",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify({
                    name: nome,
                    age: idade,
                    race: raca,
                    owner: user_id,
                    photo: photo
                  })
                }).then(response => {
                  if (response.status == 201) {
                    alert("Animal adicionado com sucesso.");
                    window.location.href = "gerenciamento";
                  } else {
                    alert(
                      "Erro ao adicionar animal. \nConfira se todos os campos foram preenchidos corretamente."
                    );
                  }
                });
              })
              .catch(error => {
                alert("Email não cadastrado");
                console.log(error);
              });
          } else {
            alert(
              "Erro ao adicionar animal. \nConfira se todos os campos foram preenchidos corretamente."
            );
          }
        });
      };

      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função adicionar produto
    AddProduto() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("add_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      /////////Adicionando campo do nome///////////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Nome do Produto: <br>";
      dados.className = "dados";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "APnome";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      /////////Adicionando campo do nome///////////////////////
      var dados1 = document.createElement("label");
      dados1.innerHTML = "Descrição do Produto: <br>";
      dados1.className = "dados";
      var inp1 = document.createElement("INPUT");
      inp1.className = "dados";
      inp1.setAttribute("type", "text");
      inp1.setAttribute("value", "");
      inp1.id = "APdescricao";
      elementoPai.insertBefore(dados1, primeiroFilho);
      elementoPai.insertBefore(inp1, primeiroFilho);

      /////////Adicionando campo do preco///////////////////////
      var dados2 = document.createElement("label");
      dados2.innerHTML = "Preço do Produto: <br>";
      dados2.className = "dados";
      var inp2 = document.createElement("INPUT");
      inp2.className = "dados";
      inp2.setAttribute("type", "number");
      inp2.setAttribute("value", "");
      inp2.id = "APpreco";
      elementoPai.insertBefore(dados2, primeiroFilho);
      elementoPai.insertBefore(inp2, primeiroFilho);

      /////////Adicionando campo da foto///////////////////////
      var dados3 = document.createElement("label");
      dados3.innerHTML = "Link da Foto do Produto: <br>";
      dados3.className = "dados";
      var inp3 = document.createElement("INPUT");
      inp3.className = "dados";
      inp3.setAttribute("type", "text");
      inp3.setAttribute("value", "");
      inp3.id = "APfoto";
      elementoPai.insertBefore(dados3, primeiroFilho);
      elementoPai.insertBefore(inp3, primeiroFilho);

      /////////Adicionando campo do estoque///////////////////////
      var dados4 = document.createElement("label");
      dados4.innerHTML = "Quantidade em Estoque: <br>";
      dados4.className = "dados";
      var inp4 = document.createElement("INPUT");
      inp4.className = "dados";
      inp4.setAttribute("type", "number");
      inp4.setAttribute("value", "");
      inp4.id = "APestoque";
      elementoPai.insertBefore(dados4, primeiroFilho);
      elementoPai.insertBefore(inp4, primeiroFilho);

      /////////Adicionando campo de quantidade vendidos///////////////////////
      var dados5 = document.createElement("label");
      dados5.innerHTML = "Quantidade de Itens Vendidos: <br>";
      dados5.className = "dados";
      var inp5 = document.createElement("INPUT");
      inp5.className = "dados";
      inp5.setAttribute("type", "number");
      inp5.setAttribute("value", "");
      inp5.id = "APvendidos";
      elementoPai.insertBefore(dados5, primeiroFilho);
      elementoPai.insertBefore(inp5, primeiroFilho);

      /////////////Botãoo adicionar////////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.className = "bottaao";
      b.innerHTML = "Adicionar";
      b.onclick = function() {
        var nome = document.getElementById("APnome").value;
        var preco = document.getElementById("APpreco").value;
        var foto = document.getElementById("APfoto").value;
        var estoque = document.getElementById("APestoque").value;
        var vendidos = document.getElementById("APvendidos").value;
        var descricao = document.getElementById("APdescricao").value;

        //Adicionando o produto no banco
        fetch("http://localhost:3000/products", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: nome,
            price: preco,
            photo: foto,
            description: descricao,
            estoque: estoque,
            vendidos: vendidos
          })
        }).then(response => {
          if (response.status == 201) {
            alert("Produto adicionado com sucesso.");
            window.location.href = "gerenciamento";
          } else {
            alert(
              "Erro ao adicionar produto. \n Confira se todos os campos foram preenchidos corretamente."
            );
          }
        });
      };
      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função adicionar serviço
    AddServico() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("add_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      /////////Adicionando campo do nome///////////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Nome do Servico: <br>";
      dados.className = "dados";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "ASnome";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      /////////Adicionando campo do preco///////////////////////
      var dados2 = document.createElement("label");
      dados2.innerHTML = "Preço do Servico: <br>";
      dados2.className = "dados";
      var inp2 = document.createElement("INPUT");
      inp2.className = "dados";
      inp2.setAttribute("type", "number");
      inp2.setAttribute("value", "");
      inp2.id = "ASpreco";
      elementoPai.insertBefore(dados2, primeiroFilho);
      elementoPai.insertBefore(inp2, primeiroFilho);

      /////////Adicionando campo da descrição///////////////////////
      var dados3 = document.createElement("label");
      dados3.innerHTML = "Descrição do Serviço: <br>";
      dados3.className = "dados";
      var inp3 = document.createElement("INPUT");
      inp3.className = "dados";
      inp3.setAttribute("type", "text");
      inp3.setAttribute("value", "");
      inp3.id = "ASdescricao";
      elementoPai.insertBefore(dados3, primeiroFilho);
      elementoPai.insertBefore(inp3, primeiroFilho);

      /////////Adicionando campo da duracao///////////////////////
      var dados4 = document.createElement("label");
      dados4.innerHTML = "Duração do Serviço: <br>";
      dados4.className = "dados";
      var inp4 = document.createElement("INPUT");
      inp4.className = "dados";
      inp4.setAttribute("type", "number");
      inp4.setAttribute("value", "");
      inp4.id = "ASduracao";
      elementoPai.insertBefore(dados4, primeiroFilho);
      elementoPai.insertBefore(inp4, primeiroFilho);

      /////////Adicionando campo de link da foto preta///////////////////////
      var dados5 = document.createElement("label");
      dados5.innerHTML = "Link da Imagem em Preto: <br>";
      dados5.className = "dados";
      var inp5 = document.createElement("INPUT");
      inp5.className = "dados";
      inp5.setAttribute("type", "text");
      inp5.setAttribute("value", "");
      inp5.id = "ASfotop";
      elementoPai.insertBefore(dados5, primeiroFilho);
      elementoPai.insertBefore(inp5, primeiroFilho);

      /////////Adicionando campo de link da foto branca///////////////////////
      var dados6 = document.createElement("label");
      dados6.innerHTML = "Link da Imagem em Branco: <br>";
      dados6.className = "dados";
      var inp6 = document.createElement("INPUT");
      inp6.className = "dados";
      inp6.setAttribute("type", "text");
      inp6.setAttribute("value", "");
      inp6.id = "ASfotob";
      elementoPai.insertBefore(dados6, primeiroFilho);
      elementoPai.insertBefore(inp6, primeiroFilho);

      /////////Adicionando campo da quantiade de vendidos///////////////////////
      var dados7 = document.createElement("label");
      dados7.innerHTML = "Quantidade de Vendidos: <br>";
      dados7.className = "dados";
      var inp7 = document.createElement("INPUT");
      inp7.className = "dados";
      inp7.setAttribute("type", "number");
      inp7.setAttribute("value", "");
      inp7.id = "ASvendidos";
      elementoPai.insertBefore(dados7, primeiroFilho);
      elementoPai.insertBefore(inp7, primeiroFilho);

      /////////Botão adicionar//////////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.className = "bottaao";
      b.innerHTML = "Adicionar";
      b.onclick = function() {
        var nome = document.getElementById("ASnome").value;
        var preco = document.getElementById("ASpreco").value;
        var descricao = document.getElementById("ASdescricao").value;
        var duracao = document.getElementById("ASduracao").value;
        var fotop = document.getElementById("ASfotop").value;
        var fotob = document.getElementById("ASfotob").value;
        var vendidos = document.getElementById("ASvendidos").value;

        //Adicionando o serviço no BD
        fetch("http://localhost:3000/services", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            title: nome,
            price: preco,
            description: descricao,
            duration: duracao,
            photop: fotop,
            photob: fotob,
            vendidos: vendidos
          })
        }).then(response => {
          if (response.status == 201) {
            alert("Serviço adicionado com sucesso.");
            window.location.href = "gerenciamento";
          } else {
            alert(
              "Erro ao adicionar serviço. \n Confira se todos os campos foram preenchidos corretamente."
            );
          }
        });
      };
      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função de remover adm
    RemAdm() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("rem_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      /////////Area de email do administrador////////////////////////////////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Email do Administrador: <br>";
      dados.className = "dados";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "RAemail";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      ////////////////////Botão remover//////////////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.className = "bottaao";
      b.innerHTML = "Remover";
      b.onclick = function() {
        var email = document.getElementById("RAemail").value;

        //Removendo no bd
        fetch("http://localhost:3000/user/" + email, { method: "DELETE" }).then(
          response => {
            if (response.status == 200) {
              alert("Adminstrador removido com sucesso;");
              window.location.href = "gerenciamento";
            } else {
              alert(
                "Falha ao excluir administrador. \nConfira se os campos foram preenchidos corretamente."
              );
            }
          }
        );

        //
      };
      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função de remover cliente
    RemCliente() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("rem_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      ////////Criando area do email/////////////////////////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Email do Cliente: <br>";
      dados.className = "dados";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "RCemail";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      //////////Criando area do botão////////////////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.className = "bottaao";
      b.innerHTML = "Remover";
      b.onclick = function() {
        var email = document.getElementById("RCemail").value;

        //Excluindo no BD
        fetch("http://localhost:3000/user/" + email, { method: "DELETE" }).then(
          response => {
            if (response.status == 200) {
              alert("Cliente removido com sucesso;");
              window.location.href = "gerenciamento";
            } else {
              alert(
                "Falha ao excluir cliente. \nConfira se os campos foram preenchidos corretamente."
              );
            }
          }
        );
      };
      //

      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função de remover agendamento
    RemAgendamento() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("rem_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      ////////Criando area da data//////////////////////////////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Data do Agendamento: <br>";
      dados.className = "dados";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "date");
      inp.setAttribute("value", "");
      inp.id = "RAdata";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      ////////Criando area da hora///////////////////////////////////////
      var dados2 = document.createElement("label");
      dados2.innerHTML = "Hora do Agendamento: <br>";
      dados2.className = "dados";
      var inp2 = document.createElement("INPUT");
      inp2.className = "dados";
      inp2.setAttribute("type", "number");
      inp2.setAttribute("value", "");
      inp2.id = "RAhora";
      elementoPai.insertBefore(dados2, primeiroFilho);
      elementoPai.insertBefore(inp2, primeiroFilho);

      ///////Criando area do botão///////////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.className = "bottaao";
      b.innerHTML = "Remover";
      b.onclick = function() {
        var hora = document.getElementById("RAhora").value;
        var data = document.getElementById("RAdata").value;

        //primeiro vamos pegar o id do agendamento a partir da data e hora datas pelo adm
        fetch(
          "http://localhost:3000/agendamento/datehour/" + data + "/" + hora,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }
        ).then(res => {
          if (res.ok) {
            res
              .json()
              .then(jsonRes => {
                var id = jsonRes._id;
                //Caso consiga o id irá realizar o delete
                fetch("http://localhost:3000/agendamento/" + id, {
                  method: "DELETE"
                }).then(
                  alert("Agendamento removido com sucesso;"),
                  (window.location.href = "gerenciamento")
                );
              })
              .catch(error => {
                alert("Falha ao excluir agendamento");
                console.log(error);
              });
          } else {
            alert(
              "Falha ao excluir agendamento. \nConfira se os campos foram preenchidos corretamente."
            );
          }
        });
      };
      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função de remover animal
    RemAnimal() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("rem_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      ////////Criando area da email do usuario//////////////////////////////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Email do Dono do Animal: <br>";
      dados.className = "dados";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "RAemail";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      ////////Criando area do nome do animal///////////////////////////////////////
      var dados2 = document.createElement("label");
      dados2.innerHTML = "Nome do Animal: <br>";
      dados2.className = "dados";
      var inp2 = document.createElement("INPUT");
      inp2.className = "dados";
      inp2.setAttribute("type", "text");
      inp2.setAttribute("value", "");
      inp2.id = "RAanimal";
      elementoPai.insertBefore(dados2, primeiroFilho);
      elementoPai.insertBefore(inp2, primeiroFilho);

      ///////Criando area do botão///////////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.className = "bottaao";
      b.innerHTML = "Remover";
      (b.onclick = function() {
        var usuario = document.getElementById("RAemail").value;
        var animal = document.getElementById("RAanimal").value;

        //Primeiro tem que pegar o id do usuario atraves do email
        fetch("http://localhost:3000/user/email/" + usuario, {
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
                var user_id = jsonRes._id;
                //Se der certo vamos pegar o id do animal pelo nome
                fetch(
                  "http://localhost:3000/animals/name/" +
                    animal +
                    "/" +
                    user_id,
                  {
                    method: "GET",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                    }
                  }
                ).then(res => {
                  if (res.ok) {
                    res
                      .json()
                      .then(jsonRes => {
                        var animal_id = jsonRes._id;
                        //Se der certo vamos apagar o animal
                        fetch("http://localhost:3000/animals/" + animal_id, {
                          method: "DELETE"
                        })
                          .then(jsonRes => {
                            alert("Animal excluido com sucesso");
                            window.location.href = "gerenciamento";
                            console.log(jsonRes);
                          })
                          .catch(error => {
                            alert("Problema ao excluir animal");
                            console.log(error);
                          });
                      })
                      .catch(error => {
                        alert("Animal não cadastrado");
                        console.log(error);
                      });
                  } else {
                    alert(
                      "Falha ao excluir animal. \nConfira se os campos foram preenchidos corretamente."
                    );
                  }
                });
              })
              .catch(error => {
                alert("Email não cadastrado");
                console.log(error);
              });
          } else {
            alert(
              "Falha ao excluir animal. \nConfira se os campos foram preenchidos corretamente."
            );
          }
        });
      }),
        elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função de remover produtos
    RemProduto() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("rem_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      ////////Criando area do email/////////////////////////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "ID do Produto: <br>";
      dados.className = "dados";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "RPid";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      //////////Criando area do botão////////////////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.className = "bottaao";
      b.innerHTML = "Remover";
      b.onclick = function() {
        var id = document.getElementById("RPid").value;

        //Removendo o produto no bd
        fetch("http://localhost:3000/products/" + id, {
          method: "DELETE"
        }).then(response => {
          if (response.status == 200) {
            alert("Produto removido com sucesso.");
            window.location.href = "gerenciamento";
          } else {
            alert(
              "Falha ao excluir produto. \nConfira se os campos foram preenchidos corretamente."
            );
          }
        });
      };
      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função de remover serviço
    RemServico() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("rem_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      ////////Criando area do nome do serviço/////////////////////////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Nome do Serviço: <br>";
      dados.className = "dados";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "RSnome";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      //////////Criando area do botão////////////////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.className = "bottaao";
      b.innerHTML = "Remover";
      b.onclick = function() {
        var nome = document.getElementById("RSnome").value;

        //Removendo o serviço no bd
        fetch("http://localhost:3000/services/" + nome, {
          method: "DELETE"
        }).then(response => {
          if (response.status == 200) {
            alert("Serviço removido com sucesso.");
            window.location.href = "gerenciamento";
          } else {
            alert(
              "Falha ao excluir serviço. \nConfira se os campos foram preenchidos corretamente."
            );
          }
        });
      };

      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função de modificar administrador
    ModAdministrador() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("mod_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      //////Criando area do email do cliente//////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Email do Administrador: <br>";
      dados.className = "dados";
      dados.id = "MAd";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "MAemail";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      //////Criando area do botão//////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.id = "MA";
      b.className = "bottaao";
      b.innerHTML = "Modificar";
      b.onclick = function() {
        //Se for apertado o botão deverá se buscar todas as infromações do cliente, criar uma nova area com essas informações para que o administrador possa altera-las
        var email = document.getElementById("MAemail").value;

        fetch("http://localhost:3000/user/email/" + email, {
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
                //Caso ache, vamos criar a area para adicionar as informações

                //Removendo o elemento do email e do botão
                var node = document.getElementById("MAemail");
                node.parentNode.removeChild(node);

                var node2 = document.getElementById("MA");
                node2.parentNode.removeChild(node2);

                var node3 = document.getElementById("MAd");
                node3.parentNode.removeChild(node3);

                //Criando a area de dados do usuario
                var elementoPai = document.getElementById("mod_area");

                // Guarda a referência do primeiro filho
                var primeiroFilho = document.getElementById("primeiroFilho");

                /////////Adicionando campo do id do adm///////////////////////
                var dados0 = document.createElement("label");
                dados0.innerHTML = "ID do Administrador: <br>";
                dados0.className = "dados";
                var inp0 = document.createElement("p");
                inp0.className = "dadosp";
                inp0.innerHTML = jsonRes._id;
                inp0.id = "MAid";
                var enter = document.createElement("br");
                elementoPai.insertBefore(dados0, primeiroFilho);
                elementoPai.insertBefore(inp0, primeiroFilho);
                elementoPai.insertBefore(enter, primeiroFilho);

                ////////Adicionando campo do email do adm///////////////////////
                var dados = document.createElement("label");
                dados.innerHTML = "Email do Administrador: <br>";
                dados.className = "dados";
                var inp = document.createElement("p");
                inp.className = "dadosp";
                inp.innerHTML = jsonRes.email;
                inp.id = "MAemaill";
                var enter1 = document.createElement("br");
                elementoPai.insertBefore(dados, primeiroFilho);
                elementoPai.insertBefore(inp, primeiroFilho);
                elementoPai.insertBefore(enter1, primeiroFilho);

                /////////Adicionando campo do adm do Administrador///////////////////////
                var dados1 = document.createElement("label");
                dados1.innerHTML = "Tirar o ADM (Digite sim ou não): <br>";
                dados1.className = "dados";
                var inp1 = document.createElement("INPUT");
                inp1.className = "dadose";
                inp1.setAttribute("type", "text");
                inp1.setAttribute("value", "");
                inp1.id = "MAadm";
                elementoPai.insertBefore(dados1, primeiroFilho);
                elementoPai.insertBefore(inp1, primeiroFilho);

                ////////Adicionando botão de modificar/////////
                var b = document.createElement("button");
                b.setAttribute("type", "submit");
                b.id = "MA";
                b.className = "bottaao";
                b.innerHTML = "Modificar";
                b.onclick = function() {
                  //Caso seja apertado o botão iremos atualizar os dados

                  //Pegando os dados, se tiverem sido atualizados, sera possivel acessa-los a partir do value, caso contrario é possivel acessar os antigos pelo placeholder
                  var adm = document.getElementById("MAadm").value;

                  var email = document.getElementById("MAemaill").innerHTML;

                  //Se o adm disse sim para tirar o adm do usuario
                  if (adm == "sim") {
                    //Atualizando no banco
                    fetch("http://localhost:3000/user/updateAdm/" + email, {
                      method: "PUT",
                      body: JSON.stringify({
                        adm: 0
                      }),
                      headers: {
                        "Content-type": "application/json; charset=UTF-8"
                      }
                    }).then(response => {
                      if (response.status == 200) {
                        alert("(Ex-)Administrador atualizado com sucesso");
                      } else
                        alert("Não foi possível atualizar o administrador");
                      window.location.href = "gerenciamento";
                    });
                  }
                  //Caso contrário é reiniciado a pagina
                  else {
                    window.location.href = "gerenciamento";
                  }
                };
                elementoPai.insertBefore(b, primeiroFilho);
                window.scrollTo(0, 0);
              })
              .catch(error => {
                alert("Administrador com esse email não encontrado");
                console.log(error);
              });
          } else {
            alert("Campo de email vazio");
          }
        });
      };
      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função de modificar cliente
    ModClientes() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("mod_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      //////Criando area do email do cliente//////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Email do Cliente: <br>";
      dados.className = "dados";
      dados.id = "MCd";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "MCemail";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      //////Criando area do botão//////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.id = "MC";
      b.className = "bottaao";
      b.innerHTML = "Modificar";
      b.onclick = function() {
        //Se for apertado o botão deverá se buscar todas as infromações do cliente, criar uma nova area com essas informações para que o administrador possa altera-las
        var email = document.getElementById("MCemail").value;

        fetch("http://localhost:3000/user/emailm/" + email, {
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
                //Caso ache, vamos criar a area para adicionar as informações

                //Removendo o elemento do email e do botão
                var node = document.getElementById("MCemail");
                node.parentNode.removeChild(node);

                var node2 = document.getElementById("MC");
                node2.parentNode.removeChild(node2);

                var node3 = document.getElementById("MCd");
                node3.parentNode.removeChild(node3);

                //Criando a area de dados do usuario
                var elementoPai = document.getElementById("mod_area");

                // Guarda a referência do primeiro filho
                var primeiroFilho = document.getElementById("primeiroFilho");

                /////////Adicionando campo do id do user///////////////////////
                var dados0 = document.createElement("label");
                dados0.innerHTML = "ID do Cliente: <br>";
                dados0.className = "dados";
                var inp0 = document.createElement("p");
                inp0.className = "dadosp";
                inp0.innerHTML = jsonRes._id;
                inp0.id = "MCid";
                var enter = document.createElement("br");
                elementoPai.insertBefore(dados0, primeiroFilho);
                elementoPai.insertBefore(inp0, primeiroFilho);
                elementoPai.insertBefore(enter, primeiroFilho);

                /////////Adicionando campo do nome do user///////////////////////
                var dados = document.createElement("label");
                dados.innerHTML = "User do Cliente: <br>";
                dados.className = "dados";
                var inp = document.createElement("INPUT");
                inp.className = "dados";
                inp.setAttribute("type", "text");
                inp.setAttribute("placeholder", jsonRes.user);
                inp.setAttribute("value", "");
                inp.id = "MCuser";
                elementoPai.insertBefore(dados, primeiroFilho);
                elementoPai.insertBefore(inp, primeiroFilho);

                /////////Adicionando campo do nome do email///////////////////////
                var dados1 = document.createElement("label");
                dados1.innerHTML = "Email do Cliente: <br>";
                dados1.className = "dados";
                var inp1 = document.createElement("INPUT");
                inp1.className = "dados";
                inp1.setAttribute("type", "text");
                inp1.setAttribute("placeholder", jsonRes.email);
                inp1.setAttribute("value", "");
                inp1.id = "MCemail";
                elementoPai.insertBefore(dados1, primeiroFilho);
                elementoPai.insertBefore(inp1, primeiroFilho);

                /////////Adicionando campo da senha///////////////////////
                var dados2 = document.createElement("label");
                dados2.innerHTML = "Senha do Cliente: <br>";
                dados2.className = "dados";
                var inp2 = document.createElement("INPUT");
                inp2.className = "dados";
                inp2.setAttribute("type", "text");
                inp2.setAttribute("placeholder", jsonRes.password);
                inp2.setAttribute("value", "");
                inp2.id = "MCpassword";
                elementoPai.insertBefore(dados2, primeiroFilho);
                elementoPai.insertBefore(inp2, primeiroFilho);

                /////////Adicionando campo do celular///////////////////////
                var dados3 = document.createElement("label");
                dados3.innerHTML = "Celular do Cliente: <br>";
                dados3.className = "dados";
                var inp3 = document.createElement("INPUT");
                inp3.className = "dados";
                inp3.setAttribute("type", "text");
                inp3.setAttribute("placeholder", jsonRes.cel);
                inp3.setAttribute("value", "");
                inp3.id = "MCcel";
                elementoPai.insertBefore(dados3, primeiroFilho);
                elementoPai.insertBefore(inp3, primeiroFilho);

                /////////Adicionando campo do celular///////////////////////
                var dados4 = document.createElement("label");
                dados4.innerHTML = "Endereço do Cliente: <br>";
                dados4.className = "dados";
                var inp4 = document.createElement("INPUT");
                inp4.className = "dados";
                inp4.setAttribute("type", "text");
                inp4.setAttribute("placeholder", jsonRes.adress);
                inp4.setAttribute("value", "");
                inp4.id = "MCadress";
                elementoPai.insertBefore(dados4, primeiroFilho);
                elementoPai.insertBefore(inp4, primeiroFilho);

                /////////Adicionando campo da foto///////////////////////
                var dados5 = document.createElement("label");
                dados5.innerHTML = "Link da Foto: <br>";
                dados5.className = "dados";
                var inp5 = document.createElement("INPUT");
                inp5.className = "dados";
                inp5.setAttribute("type", "text");
                inp5.setAttribute("placeholder", jsonRes.photo);
                inp5.setAttribute("value", "");
                inp5.id = "MCfoto";
                elementoPai.insertBefore(dados5, primeiroFilho);
                elementoPai.insertBefore(inp5, primeiroFilho);

                /////////Adicionando campo da logado///////////////////////
                var dados6 = document.createElement("label");
                dados6.innerHTML = "Logged da Cliente: <br>";
                dados6.className = "dados";
                var inp6 = document.createElement("INPUT");
                inp6.className = "dados";
                inp6.setAttribute("type", "text");
                inp6.setAttribute("placeholder", jsonRes.logged);
                inp6.setAttribute("value", "");
                inp6.id = "MClogged";
                elementoPai.insertBefore(dados6, primeiroFilho);
                elementoPai.insertBefore(inp6, primeiroFilho);

                var b = document.createElement("button");
                b.setAttribute("type", "submit");
                b.id = "MC";
                b.className = "bottaao";
                b.innerHTML = "Modificar";
                b.onclick = function() {
                  //Caso seja apertado o botão iremos atualizar os dados

                  //Pegando os dados, se tiverem sido atualizados, sera possivel acessa-los a partir do value, caso contrario é possivel acessar os antigos pelo placeholder
                  var user = document.getElementById("MCuser").value;
                  if (!user)
                    user = document.getElementById("MCuser").placeholder;

                  var email = document.getElementById("MCemail").value;
                  if (!email)
                    email = document.getElementById("MCemail").placeholder;

                  var password = document.getElementById("MCpassword").value;
                  if (!password)
                    password = document.getElementById("MCpassword")
                      .placeholder;

                  var cel = document.getElementById("MCcel").value;
                  if (!cel) cel = document.getElementById("MCcel").placeholder;

                  var adress = document.getElementById("MCadress").value;
                  if (!adress)
                    adress = document.getElementById("MCadress").placeholder;

                  var photo = document.getElementById("MCfoto").value;
                  if (!photo)
                    photo = document.getElementById("MCfoto").placeholder;

                  var logged = document.getElementById("MClogged").value;
                  if (!logged)
                    logged = document.getElementById("MClogged").placeholder;

                  var id = document.getElementById("MCid").innerHTML;

                  //Atualizando no banco
                  fetch("http://localhost:3000/user/updateinfo/" + id, {
                    method: "PUT",
                    body: JSON.stringify({
                      user: user,
                      password: password,
                      cel: cel,
                      adress: adress,
                      photo: photo,
                      logged: logged,
                      email: email
                    }),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                  })
                    .then(response => response.json())
                    .then(json => {
                      console.log(json);
                      alert("Cliente atualizado com sucesso");
                      window.location.href = "gerenciamento";
                    });
                };
                elementoPai.insertBefore(b, primeiroFilho);
                window.scrollTo(0, 0);
              })
              .catch(error => {
                alert("Cliente com esse email não encontrado");
                console.log(error);
              });
          } else {
            alert("Campo de email vazio");
          }
        });
      };
      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função modificar agendamento
    ModAgendamento() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("mod_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      //////Criando area da data do agendamento//////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Data do Agendamento: <br>";
      dados.className = "dados";
      dados.id = "MAd";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "date");
      inp.setAttribute("value", "");
      inp.id = "MAdata";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      //////Criando area da hora do agendamento//////////////////
      var dados2 = document.createElement("label");
      dados2.innerHTML = "Hora do Agendamento: <br>";
      dados2.className = "dados";
      dados2.id = "MAd2";
      var inp2 = document.createElement("INPUT");
      inp2.className = "dados";
      inp2.setAttribute("type", "number");
      inp2.setAttribute("value", "");
      inp2.id = "MAhora";
      elementoPai.insertBefore(dados2, primeiroFilho);
      elementoPai.insertBefore(inp2, primeiroFilho);

      //////Criando area do botão//////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.id = "MA";
      b.className = "bottaao";
      b.innerHTML = "Modificar";
      b.onclick = function() {
        //Se for apertado o botão deverá se buscar todas as infromações do cliente, criar uma nova area com essas informações para que o administrador possa altera-las
        var data = document.getElementById("MAdata").value;
        var hora = document.getElementById("MAhora").value;

        //Primeiro é necessário achar qual o agendamento procurando pela data e hora pedida pelo adm
        fetch(
          "http://localhost:3000/agendamento/datehour/" + data + "/" + hora,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }
        ).then(res => {
          if (res.ok) {
            res
              .json()
              .then(jsonRes => {
                //Caso ache, vamos criar a area para adicionar as informações

                //Removendo o elemento da data, hora e do botão
                var node = document.getElementById("MAhora");
                node.parentNode.removeChild(node);

                var node2 = document.getElementById("MAdata");
                node2.parentNode.removeChild(node2);

                var node3 = document.getElementById("MAd");
                node3.parentNode.removeChild(node3);

                var node4 = document.getElementById("MAd2");
                node4.parentNode.removeChild(node4);

                var node5 = document.getElementById("MA");
                node5.parentNode.removeChild(node5);

                //Criando a area de dados do usuario
                var elementoPai = document.getElementById("mod_area");

                // Guarda a referência do primeiro filho
                var primeiroFilho = document.getElementById("primeiroFilho");

                /////////Adicionando o campo do ID do agendamento///////////////////////
                var dado = document.createElement("label");
                dado.innerHTML = "ID do Agendamento: <br>";
                dado.className = "dados";
                var inpu = document.createElement("p");
                inpu.className = "dadosp";
                inpu.innerHTML = jsonRes._id;
                inpu.id = "MAid";
                var enter = document.createElement("br");
                elementoPai.insertBefore(dado, primeiroFilho);
                elementoPai.insertBefore(inpu, primeiroFilho);
                elementoPai.insertBefore(enter, primeiroFilho);

                /////////Adicionando campo do email do user///////////////////////
                var dados0 = document.createElement("label");
                dados0.innerHTML = "Email do Usuário: <br>";
                dados0.className = "dados";
                var inp0 = document.createElement("p");
                inp0.className = "dadosp";
                inp0.innerHTML = jsonRes.user_id.email;
                inp0.id = "MAuser";
                var enter0 = document.createElement("br");
                elementoPai.insertBefore(dados0, primeiroFilho);
                elementoPai.insertBefore(inp0, primeiroFilho);
                elementoPai.insertBefore(enter0, primeiroFilho);

                /////////Adicionando campo da data do agendamento///////////////////////
                var dados1 = document.createElement("label");
                dados1.innerHTML = "Data do Agendamento: <br>";
                dados1.className = "dados";
                var inp1 = document.createElement("p");
                inp1.className = "dadosp";
                inp1.innerHTML = data;
                inp1.id = "MAdate";
                var enter1 = document.createElement("br");
                elementoPai.insertBefore(dados1, primeiroFilho);
                elementoPai.insertBefore(inp1, primeiroFilho);
                elementoPai.insertBefore(enter1, primeiroFilho);

                /////////Adicionando campo da hora do agendamento///////////////////////
                var dados = document.createElement("label");
                dados.innerHTML = "Hora do Agendamento: <br>";
                dados.className = "dados";
                var inp = document.createElement("INPUT");
                inp.className = "dados";
                inp.setAttribute("type", "number");
                inp.setAttribute("placeholder", jsonRes.hour);
                inp.setAttribute("value", "");
                inp.id = "MAhour";
                elementoPai.insertBefore(dados, primeiroFilho);
                elementoPai.insertBefore(inp, primeiroFilho);

                /////////Adicionando campo do nome do pet///////////////////////
                var dados2 = document.createElement("label");
                dados2.innerHTML = "Nome do Pet: <br>";
                dados2.className = "dados";
                var inp2 = document.createElement("INPUT");
                inp2.className = "dados";
                inp2.setAttribute("type", "text");
                inp2.setAttribute("placeholder", jsonRes.pet_id.name);
                inp2.setAttribute("value", "");
                inp2.id = "MApet";
                elementoPai.insertBefore(dados2, primeiroFilho);
                elementoPai.insertBefore(inp2, primeiroFilho);

                /////////Adicionando campo do serviço ID///////////////////////
                var dados3 = document.createElement("label");
                dados3.innerHTML = "Nome do Serviço: <br>";
                dados3.className = "dados";
                var inp3 = document.createElement("INPUT");
                inp3.className = "dados";
                inp3.setAttribute("type", "text");
                inp3.setAttribute("placeholder", jsonRes.service.title);
                inp3.setAttribute("value", "");
                inp3.id = "MAservice";
                elementoPai.insertBefore(dados3, primeiroFilho);
                elementoPai.insertBefore(inp3, primeiroFilho);

                ///////Criando o botão modificar/////////////////////////
                var b = document.createElement("button");
                b.setAttribute("type", "submit");
                b.id = "MA";
                b.className = "bottaao";
                b.innerHTML = "Modificar";
                b.onclick = function() {
                  //Caso seja apertado o botão iremos atualizar os dados

                  //Pegando os dados, se tiverem sido atualizados, sera possivel acessa-los a partir do value, caso contrario é possivel acessar os antigos pelo placeholder

                  var hora = document.getElementById("MAhour").value;
                  if (!hora)
                    hora = document.getElementById("MAhour").placeholder;

                  var user = document.getElementById("MAuser").innerHTML;

                  var pet = document.getElementById("MApet").value;
                  if (!pet) pet = document.getElementById("MApet").placeholder;

                  var service = document.getElementById("MAservice").value;
                  if (!service)
                    service = document.getElementById("MAservice").placeholder;

                  var service_antes = document.getElementById("MAservice")
                    .placeholder;

                  var id = document.getElementById("MAid").innerHTML;

                  //Atualizando no banco
                  fetch("http://localhost:3000/agendamento/" + id, {
                    method: "PUT",
                    body: JSON.stringify({
                      email: user,
                      pet: pet,
                      service: service,
                      hour: hora,
                      serviceA: service_antes
                    }),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                  }).then(response => {
                    if (response.status == 200) {
                      alert("Agendamento atualizado com sucesso");
                    } else alert("Não foi possível atualizar o agendamento");
                    window.location.href = "gerenciamento";
                  });
                };
                elementoPai.insertBefore(b, primeiroFilho);
                window.scrollTo(0, 0);
              })
              .catch(error => {
                alert("Agendamento procurado não foi encontrado");
                console.log(error);
              });
          } else {
            alert("Não deixe campo(s) vazio(s).");
          }
        });
      };
      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função de modificar animais
    ModAnimais() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("mod_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      //////Criando area do email do cliente//////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Email do Dono do Animal: <br>";
      dados.className = "dados";
      dados.id = "MAd";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "MAemail";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      //////Criando area do nome do animal do cliente//////////////////
      var dados1 = document.createElement("label");
      dados1.innerHTML = "Nome do Animal: <br>";
      dados1.className = "dados";
      dados1.id = "MAda";
      var inp1 = document.createElement("INPUT");
      inp1.className = "dados";
      inp1.setAttribute("type", "text");
      inp1.setAttribute("value", "");
      inp1.id = "MAanimal";
      elementoPai.insertBefore(dados1, primeiroFilho);
      elementoPai.insertBefore(inp1, primeiroFilho);

      //////Criando area do botão//////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.id = "MA";
      b.className = "bottaao";
      b.innerHTML = "Modificar";
      b.onclick = function() {
        //Se for apertado o botão deverá se buscar todas as infromações do cliente e do anima, e depois criar uma nova area com essas informações para que o administrador possa altera-las
        var email = document.getElementById("MAemail").value;

        var animal = document.getElementById("MAanimal").value;

        //Procurando pelo ID do animal
        fetch("http://localhost:3000/animals/getadm/" + animal + "/" + email, {
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
                //Caso ache, vamos criar a area para adicionar as informações

                //Removendo o elemento do email, nome do animal e do botão
                var node = document.getElementById("MAemail");
                node.parentNode.removeChild(node);

                var node1 = document.getElementById("MAanimal");
                node1.parentNode.removeChild(node1);

                var node2 = document.getElementById("MA");
                node2.parentNode.removeChild(node2);

                var node3 = document.getElementById("MAd");
                node3.parentNode.removeChild(node3);

                var node4 = document.getElementById("MAda");
                node4.parentNode.removeChild(node4);

                //Criando a area de dados do usuario
                var elementoPai = document.getElementById("mod_area");

                // Guarda a referência do primeiro filho
                var primeiroFilho = document.getElementById("primeiroFilho");

                /////////Adicionando campo do id do animal///////////////////////
                var dados0 = document.createElement("label");
                dados0.innerHTML = "ID do Animal: <br>";
                dados0.className = "dados";
                var inp0 = document.createElement("p");
                inp0.className = "dadosp";
                inp0.innerHTML = jsonRes._id;
                inp0.id = "MAid";
                var enter = document.createElement("br");
                elementoPai.insertBefore(dados0, primeiroFilho);
                elementoPai.insertBefore(inp0, primeiroFilho);
                elementoPai.insertBefore(enter, primeiroFilho);

                /////////Adicionando campo do nome do animal///////////////////////
                var dados = document.createElement("label");
                dados.innerHTML = "Email do Dono: <br>";
                dados.className = "dados";
                var inp = document.createElement("p");
                inp.className = "dadose";
                inp.innerHTML = jsonRes.owner.email;
                inp.id = "MAemaill";
                var enter1 = document.createElement("br");
                elementoPai.insertBefore(dados, primeiroFilho);
                elementoPai.insertBefore(inp, primeiroFilho);
                elementoPai.insertBefore(enter1, primeiroFilho);

                /////////Adicionando campo do email do dono///////////////////////
                var dados1 = document.createElement("label");
                dados1.innerHTML = "Nome do Animal: <br>";
                dados1.className = "dados";
                var inp1 = document.createElement("INPUT");
                inp1.className = "dados";
                inp1.setAttribute("type", "text");
                inp1.setAttribute("placeholder", jsonRes.name);
                inp1.setAttribute("value", "");
                inp1.id = "MAanimal";
                elementoPai.insertBefore(dados1, primeiroFilho);
                elementoPai.insertBefore(inp1, primeiroFilho);

                /////////Adicionando campo da idade do animal///////////////////////
                var dados2 = document.createElement("label");
                dados2.innerHTML = "Idade do Animal (em anos): <br>";
                dados2.className = "dados";
                var inp2 = document.createElement("INPUT");
                inp2.className = "dados";
                inp2.setAttribute("type", "number");
                inp2.setAttribute("placeholder", jsonRes.age);
                inp2.setAttribute("value", "");
                inp2.id = "MAage";
                elementoPai.insertBefore(dados2, primeiroFilho);
                elementoPai.insertBefore(inp2, primeiroFilho);

                /////////Adicionando campo da raça do animal///////////////////////
                var dados3 = document.createElement("label");
                dados3.innerHTML = "Raça do Animal: <br>";
                dados3.className = "dados";
                var inp3 = document.createElement("INPUT");
                inp3.className = "dados";
                inp3.setAttribute("type", "text");
                inp3.setAttribute("placeholder", jsonRes.race);
                inp3.setAttribute("value", "");
                inp3.id = "MArace";
                elementoPai.insertBefore(dados3, primeiroFilho);
                elementoPai.insertBefore(inp3, primeiroFilho);

                /////////Adicionando campo da foto do animal///////////////////////
                var dados4 = document.createElement("label");
                dados4.innerHTML = "Link da Foto do Animal: <br>";
                dados4.className = "dados";
                var inp4 = document.createElement("INPUT");
                inp4.className = "dados";
                inp4.setAttribute("type", "text");
                inp4.setAttribute("placeholder", jsonRes.photo);
                inp4.setAttribute("value", "");
                inp4.id = "MAphoto";
                elementoPai.insertBefore(dados4, primeiroFilho);
                elementoPai.insertBefore(inp4, primeiroFilho);

                var b = document.createElement("button");
                b.setAttribute("type", "submit");
                b.id = "MC";
                b.className = "bottaao";
                b.innerHTML = "Modificar";
                b.onclick = function() {
                  //Caso seja apertado o botão iremos atualizar os dados

                  //Pegando os dados, se tiverem sido atualizados, sera possivel acessa-los a partir do value, caso contrario é possivel acessar os antigos pelo placeholder
                  var user = document.getElementById("MAemaill").value;
                  if (!user)
                    user = document.getElementById("MAemaill").placeholder;

                  var nome = document.getElementById("MAanimal").value;
                  if (!nome)
                    nome = document.getElementById("MAanimal").placeholder;

                  var age = document.getElementById("MAage").value;
                  if (!age) age = document.getElementById("MAage").placeholder;

                  var race = document.getElementById("MArace").value;
                  if (!race)
                    race = document.getElementById("MArace").placeholder;

                  var photo = document.getElementById("MAphoto").value;
                  if (!photo)
                    photo = document.getElementById("MAphoto").placeholder;

                  var id = document.getElementById("MAid").innerHTML;

                  //Atualizando no banco
                  fetch("http://localhost:3000/animals/" + id, {
                    method: "PUT",
                    body: JSON.stringify({
                      name: nome,
                      age: age,
                      race: race,
                      photo: photo
                    }),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                  }).then(response => {
                    if (response.status == 200) {
                      alert("Animal atualizado com sucesso");
                      window.location.href = "gerenciamento";
                    } else alert("Não foi possível atualizar o animal");
                  });
                };
                elementoPai.insertBefore(b, primeiroFilho);
                window.scrollTo(0, 0);
              })
              .catch(error => {
                alert("Esse animal ou o dono desse email não foi encontrado");
                console.log(error);
              });
          } else {
            alert("Não deixe campo(s) vazio(s).");
          }
        });
      };
      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //FUnção modificar produtos
    ModProdutos() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("mod_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      //////Criando area do ID do produto/////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "ID do Produto: <br>";
      dados.className = "dados";
      dados.id = "MPd";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "MPid";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      //////Criando area do botão//////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.id = "MP";
      b.className = "bottaao";
      b.innerHTML = "Modificar";
      b.onclick = function() {
        //Se for apertado o botão deverá se buscar todas as infromações do cliente e do anima, e depois criar uma nova area com essas informações para que o administrador possa altera-las
        var id = document.getElementById("MPid").value;

        //Procurando pelo ID do animal
        fetch("http://localhost:3000/products/id/" + id, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }).then(res => {
          if (res.ok) {
            res.json().then(jsonRes => {
              //Caso ache, vamos criar a area para adicionar as informações

              //Removendo o elemento do email, nome do animal e do botão
              var node = document.getElementById("MPid");
              node.parentNode.removeChild(node);

              var node1 = document.getElementById("MPd");
              node1.parentNode.removeChild(node1);

              var node2 = document.getElementById("MP");
              node2.parentNode.removeChild(node2);

              //Criando a area de dados do usuario
              var elementoPai = document.getElementById("mod_area");

              // Guarda a referência do primeiro filho
              var primeiroFilho = document.getElementById("primeiroFilho");

              /////////Adicionando campo do id do produto///////////////////////
              var dados0 = document.createElement("label");
              dados0.innerHTML = "ID do Produto: <br>";
              dados0.className = "dados";
              var inp0 = document.createElement("p");
              inp0.className = "dadosp";
              inp0.innerHTML = jsonRes._id;
              inp0.id = "MPid";
              var enter = document.createElement("br");
              elementoPai.insertBefore(dados0, primeiroFilho);
              elementoPai.insertBefore(inp0, primeiroFilho);
              elementoPai.insertBefore(enter, primeiroFilho);

              /////////Adicionando campo do nome do produto///////////////////////
              var dados = document.createElement("label");
              dados.innerHTML = "Nome do Produto: <br>";
              dados.className = "dados";
              var inp = document.createElement("INPUT");
              inp.className = "dados";
              inp.setAttribute("type", "text");
              inp.setAttribute("placeholder", jsonRes.name);
              inp.setAttribute("value", "");
              inp.id = "MPname";
              elementoPai.insertBefore(dados, primeiroFilho);
              elementoPai.insertBefore(inp, primeiroFilho);

              /////////Adicionando campo da descrição do produto///////////////////////
              var dadoss = document.createElement("label");
              dadoss.innerHTML = "Descrição do Produto: <br>";
              dadoss.className = "dados";
              var inpp = document.createElement("INPUT");
              inpp.className = "dados";
              inpp.setAttribute("type", "text");
              inpp.setAttribute("placeholder", jsonRes.description);
              inpp.setAttribute("value", "");
              inpp.id = "MPdescricao";
              elementoPai.insertBefore(dadoss, primeiroFilho);
              elementoPai.insertBefore(inpp, primeiroFilho);

              /////////Adicionando campo do preço do produto///////////////////////
              var dados1 = document.createElement("label");
              dados1.innerHTML = "Preço do Produto: <br>";
              dados1.className = "dados";
              var inp1 = document.createElement("INPUT");
              inp1.className = "dados";
              inp1.setAttribute("type", "number");
              inp1.setAttribute("placeholder", jsonRes.price);
              inp1.setAttribute("value", "");
              inp1.id = "MPpreco";
              elementoPai.insertBefore(dados1, primeiroFilho);
              elementoPai.insertBefore(inp1, primeiroFilho);

              /////////Adicionando campo da foto do produto///////////////////////
              var dados2 = document.createElement("label");
              dados2.innerHTML = "Link da Foto do Produto: <br>";
              dados2.className = "dados";
              var inp2 = document.createElement("INPUT");
              inp2.className = "dados";
              inp2.setAttribute("type", "text");
              inp2.setAttribute("placeholder", jsonRes.photo);
              inp2.setAttribute("value", "");
              inp2.id = "MPfoto";
              elementoPai.insertBefore(dados2, primeiroFilho);
              elementoPai.insertBefore(inp2, primeiroFilho);

              /////////Adicionando campo do estoque do produto///////////////////////
              var dados3 = document.createElement("label");
              dados3.innerHTML = "Produtos em Estoque: <br>";
              dados3.className = "dados";
              var inp3 = document.createElement("INPUT");
              inp3.className = "dados";
              inp3.setAttribute("type", "number");
              inp3.setAttribute("placeholder", jsonRes.estoque);
              inp3.setAttribute("value", "");
              inp3.id = "MPestoque";
              elementoPai.insertBefore(dados3, primeiroFilho);
              elementoPai.insertBefore(inp3, primeiroFilho);

              /////////Adicionando campo da quantidade de vendas do produto///////////////////////
              var dados4 = document.createElement("label");
              dados4.innerHTML = "Produtos Vendidos: <br>";
              dados4.className = "dados";
              var inp4 = document.createElement("INPUT");
              inp4.className = "dados";
              inp4.setAttribute("type", "number");
              inp4.setAttribute("placeholder", jsonRes.vendidos);
              inp4.setAttribute("value", "");
              inp4.id = "MPvendidos";
              elementoPai.insertBefore(dados4, primeiroFilho);
              elementoPai.insertBefore(inp4, primeiroFilho);

              var b = document.createElement("button");
              b.setAttribute("type", "submit");
              b.id = "MP";
              b.className = "bottaao";
              b.innerHTML = "Modificar";
              b.onclick = function() {
                //Caso seja apertado o botão iremos atualizar os dados

                //Pegando os dados, se tiverem sido atualizados, sera possivel acessa-los a partir do value, caso contrario é possivel acessar os antigos pelo placeholder
                var name = document.getElementById("MPname").value;
                if (!name) name = document.getElementById("MPname").placeholder;

                var preco = document.getElementById("MPpreco").value;
                if (!preco)
                  preco = document.getElementById("MPpreco").placeholder;

                var descricao = document.getElementById("MPdescricao").value;
                if (!descricao)
                  descricao = document.getElementById("MPdescricao")
                    .placeholder;

                var foto = document.getElementById("MPfoto").value;
                if (!foto) foto = document.getElementById("MPfoto").placeholder;

                var estoque = document.getElementById("MPestoque").value;
                if (!estoque)
                  estoque = document.getElementById("MPestoque").placeholder;

                var vendidos = document.getElementById("MPvendidos").value;
                if (!vendidos)
                  vendidos = document.getElementById("MPvendidos").placeholder;

                var id = document.getElementById("MPid").innerHTML;

                //Atualizando no banco
                fetch("http://localhost:3000/products/" + id, {
                  method: "PUT",
                  body: JSON.stringify({
                    name: name,
                    price: preco,
                    photo: foto,
                    estoque: estoque,
                    vendidos: vendidos,
                    description: descricao
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                }).then(response => {
                  if (response.status == 200) {
                    alert("Produto atualizado com sucesso");
                  } else alert("Não foi possível atualizar o produto");
                  window.location.href = "gerenciamento";
                });
              };
              elementoPai.insertBefore(b, primeiroFilho);
              window.scrollTo(0, 0);
            });
          } else if (res.status == 500) {
            alert("Esse produto não foi encontrado.");
          } else {
            alert("Não deixe o campo do ID do produto vazio");
          }
        });
      };
      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //Função de modificar serviços
    ModServicos() {
      // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
      var elementoPai = document.getElementById("mod_area");
      // Guarda a referência do primeiro filho
      var primeiroFilho = elementoPai.firstChild;

      //////Criando area do nome do serviço/////////////////
      var dados = document.createElement("label");
      dados.innerHTML = "Nome do Serviço: <br>";
      dados.className = "dados";
      dados.id = "MSd";
      var inp = document.createElement("INPUT");
      inp.className = "dados";
      inp.setAttribute("type", "text");
      inp.setAttribute("value", "");
      inp.id = "MSname";
      elementoPai.insertBefore(dados, primeiroFilho);
      elementoPai.insertBefore(inp, primeiroFilho);

      //////Criando area do botão//////////////////
      var b = document.createElement("button");
      b.setAttribute("type", "submit");
      b.id = "MS";
      b.className = "bottaao";
      b.innerHTML = "Modificar";
      b.onclick = function() {
        //Se for apertado o botão deverá se buscar todas as infromações do cliente e do anima, e depois criar uma nova area com essas informações para que o administrador possa altera-las
        var name = document.getElementById("MSname").value;

        //Procurando pelo ID do animal
        fetch("http://localhost:3000/services/title/" + name, {
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
                //Caso ache, vamos criar a area para adicionar as informações

                //Removendo o elemento do email, nome do animal e do botão
                var node = document.getElementById("MSname");
                node.parentNode.removeChild(node);

                var node1 = document.getElementById("MSd");
                node1.parentNode.removeChild(node1);

                var node2 = document.getElementById("MS");
                node2.parentNode.removeChild(node2);

                //Criando a area de dados do usuario
                var elementoPai = document.getElementById("mod_area");

                // Guarda a referência do primeiro filho
                var primeiroFilho = document.getElementById("primeiroFilho");

                /////////Adicionando campo do id do servico///////////////////////
                var dados0 = document.createElement("label");
                dados0.innerHTML = "ID do Serviço: <br>";
                dados0.className = "dados";
                var inp0 = document.createElement("p");
                inp0.className = "dadosp";
                inp0.innerHTML = jsonRes._id;
                inp0.id = "MSid";
                var enter = document.createElement("br");
                elementoPai.insertBefore(dados0, primeiroFilho);
                elementoPai.insertBefore(inp0, primeiroFilho);
                elementoPai.insertBefore(enter, primeiroFilho);

                /////////Adicionando campo do nome do serviço///////////////////////
                var dados = document.createElement("label");
                dados.innerHTML = "Nome do Serviço: <br>";
                dados.className = "dados";
                var inp = document.createElement("INPUT");
                inp.className = "dados";
                inp.setAttribute("type", "text");
                inp.setAttribute("placeholder", jsonRes.title);
                inp.setAttribute("value", "");
                inp.id = "MSname";
                elementoPai.insertBefore(dados, primeiroFilho);
                elementoPai.insertBefore(inp, primeiroFilho);

                /////////Adicionando campo da descrição do serviço///////////////////////
                var dado = document.createElement("label");
                dado.innerHTML = "Descrição do Serviço: <br>";
                dado.className = "dados";
                var inpu = document.createElement("INPUT");
                inpu.className = "dados";
                inpu.setAttribute("type", "text");
                inpu.setAttribute("placeholder", jsonRes.description);
                inpu.setAttribute("value", "");
                inpu.id = "MSdescricao";
                elementoPai.insertBefore(dado, primeiroFilho);
                elementoPai.insertBefore(inpu, primeiroFilho);

                /////////Adicionando campo da duração do serviço///////////////////////
                var dado1 = document.createElement("label");
                dado1.innerHTML = "Duração do Serviço (em horas): <br>";
                dado1.className = "dados";
                var inpu1 = document.createElement("INPUT");
                inpu1.className = "dados";
                inpu1.setAttribute("type", "text");
                inpu1.setAttribute("placeholder", jsonRes.duration);
                inpu1.setAttribute("value", "");
                inpu1.id = "MSduracao";
                elementoPai.insertBefore(dado1, primeiroFilho);
                elementoPai.insertBefore(inpu1, primeiroFilho);

                /////////Adicionando campo do preço do serviço///////////////////////
                var dados1 = document.createElement("label");
                dados1.innerHTML = "Preço do Serviço: <br>";
                dados1.className = "dados";
                var inp1 = document.createElement("INPUT");
                inp1.className = "dados";
                inp1.setAttribute("type", "number");
                inp1.setAttribute("placeholder", jsonRes.price);
                inp1.setAttribute("value", "");
                inp1.id = "MSpreco";
                elementoPai.insertBefore(dados1, primeiroFilho);
                elementoPai.insertBefore(inp1, primeiroFilho);

                /////////Adicionando campo da foto em preto do serviço///////////////////////
                var dados2 = document.createElement("label");
                dados2.innerHTML = "Link da Foto em Preto: <br>";
                dados2.className = "dados";
                var inp2 = document.createElement("INPUT");
                inp2.className = "dados";
                inp2.setAttribute("type", "text");
                inp2.setAttribute("placeholder", jsonRes.photop);
                inp2.setAttribute("value", "");
                inp2.id = "MSfotop";
                elementoPai.insertBefore(dados2, primeiroFilho);
                elementoPai.insertBefore(inp2, primeiroFilho);

                /////////Adicionando campo da foto em branco do serviço///////////////////////
                var dados3 = document.createElement("label");
                dados3.innerHTML = "Link da Foto em Branco: <br>";
                dados3.className = "dados";
                var inp3 = document.createElement("INPUT");
                inp3.className = "dados";
                inp3.setAttribute("type", "text");
                inp3.setAttribute("placeholder", jsonRes.photob);
                inp3.setAttribute("value", "");
                inp3.id = "MSfotob";
                elementoPai.insertBefore(dados3, primeiroFilho);
                elementoPai.insertBefore(inp3, primeiroFilho);

                /////////Adicionando campo da quantidade de vendas do produto///////////////////////
                var dados4 = document.createElement("label");
                dados4.innerHTML = "Número de Serviço Vendidos: <br>";
                dados4.className = "dados";
                var inp4 = document.createElement("INPUT");
                inp4.className = "dados";
                inp4.setAttribute("type", "number");
                inp4.setAttribute("placeholder", jsonRes.vendidos);
                inp4.setAttribute("value", "");
                inp4.id = "MSvendidos";
                elementoPai.insertBefore(dados4, primeiroFilho);
                elementoPai.insertBefore(inp4, primeiroFilho);

                var b = document.createElement("button");
                b.setAttribute("type", "submit");
                b.id = "MP";
                b.className = "bottaao";
                b.innerHTML = "Modificar";
                b.onclick = function() {
                  //Caso seja apertado o botão iremos atualizar os dados

                  //Pegando os dados, se tiverem sido atualizados, sera possivel acessa-los a partir do value, caso contrario é possivel acessar os antigos pelo placeholder
                  var title = document.getElementById("MSname").value;
                  if (!title)
                    title = document.getElementById("MSname").placeholder;

                  var descricao = document.getElementById("MSdescricao").value;
                  if (!descricao)
                    descricao = document.getElementById("MSdescricao")
                      .placeholder;

                  var preco = document.getElementById("MSpreco").value;
                  if (!preco)
                    preco = document.getElementById("MSpreco").placeholder;

                  var duracao = document.getElementById("MSduracao").value;
                  if (!duracao)
                    duracao = document.getElementById("MSduracao").placeholder;

                  var fotop = document.getElementById("MSfotop").value;
                  if (!fotop)
                    fotop = document.getElementById("MSfotop").placeholder;

                  var fotob = document.getElementById("MSfotob").value;
                  if (!fotob)
                    fotob = document.getElementById("MSfotob").placeholder;

                  var vendidos = document.getElementById("MSvendidos").value;
                  if (!vendidos)
                    vendidos = document.getElementById("MSvendidos")
                      .placeholder;

                  var id = document.getElementById("MSid").innerHTML;

                  //Atualizando no banco
                  fetch("http://localhost:3000/services/" + id, {
                    method: "PUT",
                    body: JSON.stringify({
                      title: title,
                      description: descricao,
                      price: preco,
                      duration: duracao,
                      photop: fotop,
                      photob: fotob,
                      vendidos: vendidos
                    }),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                  }).then(response => {
                    if (response.status == 200) {
                      alert("Serviço atualizado com sucesso");
                    } else alert("Não foi possível atualizar o serviço");
                    window.location.href = "gerenciamento";
                  });
                };
                elementoPai.insertBefore(b, primeiroFilho);
                window.scrollTo(0, 0);
              })
              .catch(error => {
                alert("Esse serviço não foi encontrado");
                console.log(error);
              });
          } else {
            alert("Não deixe o campo do nome do serviço vazio.");
          }
        });
      };
      elementoPai.insertBefore(b, primeiroFilho);
      window.scrollTo(0, 0);
    },

    //O botao indica qual função sera passada, o valor 1 significa que se quer o valor de cada serviço, 2 que se quer o valor final de todos os serviços
    TotalServico(qualBotao) {
      //Primeiro ira pegar os dados (nome, preço e quantidade vendida de cada serviço)
      fetch("http://localhost:3000/services/total/total", {
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
              if (qualBotao == 1) this.precoServico(jsonRes);
              else this.precoTotalServico(jsonRes);
            })
            .catch(error => {
              alert("Erro na procura dos serviços");
              console.log(error);
            });
        }
      });
    },

    //Função que "imprimi" todos os valores dos serviços
    precoServico(dados) {
      var texto = [];

      //Sera passado por todos os dados pegando o nome, preco e quantidade, e se fara a multiplicação para pegar o valor obtido por cada serviço

      for (var i = 0; i < dados.length; i++) {
        var nome = dados[i].title;
        var preco = dados[i].price;
        var quantidade = dados[i].vendidos;

        texto = texto + nome + ": R$ " + preco * quantidade + "\n";
      }

      alert(texto);

      window.location.href = "gerenciamento";
    },

    //Função que "imprimi" o preço total de todos os serviços
    precoTotalServico(dados) {
      var total = 0;

      //Sera passado por todos os dados pegando preco e quantidade, e se soma todo o valor

      for (var i = 0; i < dados.length; i++) {
        var preco = dados[i].price;
        var quantidade = dados[i].vendidos;

        total = total + preco * quantidade;
      }

      //Por fim se escreve o texto inteiro, ja com o valor final da soma
      var texto = "O valor total é R$" + total;

      //Imprime o texto
      alert(texto);

      window.location.href = "gerenciamento";
    },

    //O botao indica qual função sera passada, o valor 1 significa que se quer o valor de cada produto, 2 que se quer o valor final de todos os produtos
    TotalProdutos(qualBotao) {
      //Primeiro ira pegar os dados (nome, preço e quantidade vendida de cada produto)
      fetch("http://localhost:3000/products/total/total", {
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
              if (qualBotao == 1) this.precoProduto(jsonRes);
              else this.precoTotalProdutos(jsonRes);
            })
            .catch(error => {
              alert("Erro na procura dos produtos");
              console.log(error);
            });
        }
      });
    },

    //Função que "imprimi" todos os valores dos produtos
    precoProduto(dados) {
      var texto = [];

      //Sera passado por todos os dados pegando o nome, preco e quantidade, e se fara a multiplicação para pegar o valor obtido por cada produto

      for (var i = 0; i < dados.length; i++) {
        var nome = dados[i].name;
        var preco = dados[i].price;
        var quantidade = dados[i].vendidos;

        texto = texto + nome + ": R$ " + preco * quantidade + "\n";
      }

      alert(texto);

      window.location.href = "gerenciamento";
    },

    //Função que "imprimi" o preço total de todos os produtos
    precoTotalProdutos(dados) {
      var total = 0;

      //Sera passado por todos os dados pegando preco e quantidade, e se soma todo o valor

      for (var i = 0; i < dados.length; i++) {
        var preco = dados[i].price;
        var quantidade = dados[i].vendidos;

        total = total + preco * quantidade;
      }

      //Por fim se escreve o texto inteiro, ja com o valor final da soma
      var texto = "O valor total é R$" + total;

      //Imprime o texto
      alert(texto);

      window.location.href = "gerenciamento";
    }
  }
};
</script>
<style>
/*Define para todos os textos: fonte e cor do texto*/
* {
  font-family: "Baloo Bhaina 2";
  color: #4f4f4f;
  font-size: 18px;
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
  margin-top: 34px;
  text-align: center;
}

/*Estiliza os botões*/
.buton {
  background-color: rgb(101, 139, 82);
  margin-bottom: 20px;
  font-size: 18px;
  border-radius: 5px;
  height: 60px;
  width: 140px;
  color: white;
  margin-left: 25%;
  text-align: center;
  font-size: 15px;
}

/*Estiliza o botão de deslogar*/
.deslogar {
  border: 1px solid rgb(101, 139, 82);
  background-color: rgb(119, 180, 85);
  border-radius: 5px;
  color: white;
  margin-top: 10px;
  font-size: 14px;
  padding: 4px 18px;
  text-transform: uppercase;
  margin-left: 90%;
}

/*Estiliza os botões*/
.bottaao {
  background-color: rgb(119, 180, 85);
  font-size: 9px;
  height: 29px;
  width: 61px;
  margin-left: 74%;
  margin-top: -9%;
  text-align: center;
  padding-left: 2.5%;
  padding-top: 1.5%;
}

/*Estiliza a posição da main*/
.mai {
  margin-left: 7.5%;
  font-size: 18px;
}

/*Estiliza os input dos dados*/
.dados {
  margin-left: 10%;
  width: 77%;
}

/*Estiliza os inputs das informações que não se podem alterar (por exemplo id do usuario)*/
.dadosp {
  background: white;
  border: 1px solid #000000;
  margin-left: 10%;
  padding: 3px 3px 0px 1px;
  margin-bottom: 27.5px;
  padding-right: 2%;
  padding-left: 1%;
}

/*Estiliza os input dos dados*/
.dadose {
  background: white;
  border: 1px solid #000000;
  margin-left: 10%;
  padding: 3px 3px 0px 1px;
  margin-bottom: 27.5px;
  width: 77%;
}

/*Estilizando os sub-titulos da página (como adicionar, excluir e ganhos)*/
h3 {
  font-size: 25px;
  text-decoration: none;
  text-align: center;
}

/*Estilizando as colunas das seções adicionar, excluir e ganhos)*/
.section {
  display: inline-block;
  background-color: #e8e8e8;
  text-align: center;
  border-radius: 5px;
  padding-top: 13px;
  margin: 1%;
  width: 275px;
  vertical-align: top;
}

/*Estiliza o tamanho do input da data*/
#AAdata {
  width: 77%;
}

/*Estiliza o tamanho do input da data*/
#RAdata {
  width: 77%;
}

/*Estiliza o tamanho do input da data*/
#MAdata {
  width: 77%;
}

/*Estiliza o tamanho do input da data*/
#MAdate {
  padding-right: 45%;
  padding-left: 1%;
}

/*Estiliza o tamanho do input da user*/
#MAuser {
  padding-right: 33%;
  padding-left: 1%;
}

/*Estiliza o tamanho do input do email*/
#MAemaill {
  padding-right: 33%;
  padding-left: 1%;
}

/*Estilizando a posição das ações dos sub-titulos*/
.elements_acao {
  margin-top: 20px;
}

/*Estilizando a posição das sub-ações dos sub-titulos (Total de Serviços e Total de Ganhos)*/
#b2 {
  background-color: rgb(119, 180, 85);
  margin-bottom: 20px;
  font-size: 10px;
  border-radius: 30px;
  height: 46px;
  width: 92px;
  margin-left: 35%;
  margin-top: -6%;
}
</style>
