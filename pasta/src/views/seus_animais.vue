<!--
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
  -->

<template>
  <div class="seus_animais">
    <!--Início das barras de navegação do pet shop-->
    <div class="top-bar">
      <div class="button-holder-top">
        <a id="logo" href="home_login">PET SHOP</a>
        <img id="imagem" src="../../png/pets.png" width="40" height="40" />
        <img id="imagem_carrinho" src="../../png/carrinhob.png" width="20" height="20" />
        <a id="logo_carrinho" href="carrinho_compras">Carrinho</a>

        <a href="dados_usuario">Seus Dados</a>
        <a href="seus_animais">Seus Animais</a>
        <img id="cart" src="../../png/cart.png" width="40" height="40" />
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

    <!--Título-->
    <h1>Seus Animais</h1>

    <!--Início da sessão onde onde estão os animais-->
    <div class="main" id="main">
      <!-- Area dos animais -->
      <div class="animal" id="animal">
        {{seus_animais()}}

        <!-- Area de adicionar animais-->
        <div class="addAnimal" id="Add">
          <img class="plus" id="plus" src="../../png/output_img.png" />
          <input
            class="botaosu"
            type="submit"
            value="Adicionar um amiguinho"
            v-on:click.prevent.stop="criando_area_addAnimal()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "",
    idade: "",
    raca: "",
    tag: 0, // A tag é usada para saber se é clicado pela primeira vez para pegar os dados do novo animal e pela segunda vez para adicionar no  BD
    id: "",
    photo: "",
    erros: "",
    carregar: 0
  }),

  methods: {
    //Função que criar a area de adicionar dados de um novo animal
    criando_area_addAnimal() {
      if (this.tag == 0) {
        var enter = document.createElement("br");

        var mais = document.getElementById("plus");
        if (mais.parentNode) {
          mais.parentNode.removeChild(mais);
        }

        // Guarda a referêncis do elemento no quela nóe queremos inserir o novo nó
        var elementoPai = document.getElementById("Add");
        // Guarda a referência do primeiro filho
        var primeiroFilho = elementoPai.firstChild;

        ///////Area do nome do animal////////////////////////////
        var dados1 = document.createElement("label");
        dados1.innerHTML = "Nome do animal: <br>";
        dados1.className = "dado";
        var inp1 = document.createElement("INPUT");
        inp1.setAttribute("type", "text");
        inp1.setAttribute("value", this.name);
        inp1.id = "iname";
        inp1.className = "inpu";
        elementoPai.insertBefore(dados1, primeiroFilho);
        elementoPai.insertBefore(inp1, primeiroFilho);

        ////////Area da idade do animal///////////////////////////////////////////////
        document.getElementById("animal").appendChild(enter);
        var dados2 = document.createElement("label");
        dados2.innerHTML = "Idade do animal (em anos): <br>";
        dados2.className = "dado";
        var inp2 = document.createElement("INPUT");
        inp2.setAttribute("type", "number");
        inp2.setAttribute("value", this.idade);
        inp2.className = "inpu";
        inp2.id = "iage";
        elementoPai.insertBefore(dados2, primeiroFilho);
        elementoPai.insertBefore(inp2, primeiroFilho);

        ////////Area da raça do animal////////////////////////////////////////////////
        var dados3 = document.createElement("label");
        dados3.innerHTML = "Raça do animal: <br>";
        dados3.className = "dado";
        var inp3 = document.createElement("INPUT");
        inp3.setAttribute("type", "text");
        inp3.setAttribute("value", this.raca);
        inp3.id = "irace";
        inp3.className = "inpu";
        elementoPai.insertBefore(dados3, primeiroFilho);
        elementoPai.insertBefore(inp3, primeiroFilho);

        ///////Area do link da imagem do animal//////////////////////////////////////
        var dados4 = document.createElement("label");
        dados4.innerHTML = "Link da imagem do animal: <br>";
        dados4.className = "dado";
        var inp4 = document.createElement("INPUT");
        inp4.setAttribute("type", "text");
        inp4.setAttribute("value", this.photo);
        inp4.id = "iphoto";
        inp4.className = "inpu";
        elementoPai.insertBefore(dados4, primeiroFilho);
        elementoPai.insertBefore(inp4, primeiroFilho);

        this.tag = 1;
      } else {
        //Chamando função para conferir se todos os campos foram preenchidos
        this.addAnimalBD();
      }
    },

    //Função que confere se todos as informações do novo animal foram preenchidas, caso tenham sido chama a funçãoo de adicionar no BD
    addAnimalBD() {
      this.name = document.getElementById("iname").value;
      this.idade = document.getElementById("iage").value;
      this.raca = document.getElementById("irace").value;
      this.photo = document.getElementById("iphoto").value;

      if (!this.name) this.erros += "O campo nome não foi preeenchido \n";

      if (!this.idade) this.erros += "O campo idade não foi preeenchido \n";
      else this.checkIdade(this.idade);

      if (!this.raca) this.erros += "O campo raça não foi preeenchido \n";

      if (!this.photo) this.erros += "O campo foto não foi preeenchido \n";

      if (this.erros == "") {
        //ADICIONAR NO BANCO DE DADOS
        this.addBD();
      } else {
        alert(this.erros);
        this.erros = "";
      }
    },

    //Função que checa se a idade do animal é > 0
    checkIdade(idade) {
      if (idade < 0) this.erros += "A idade do animal deve ser positiva \n";
    },

    //Função que adiciona o novo animal no BD
    addBD() {
      this.$axios
        .post("http://localhost:3000/animals/", {
          name: this.name,
          age: this.idade,
          race: this.raca,
          owner: this.id,
          photo: this.photo
        })
        .then(response => {
          if (response.status == 201) {
            alert("Animal cadastrado com sucesso!");
            window.location.href = "seus_animais";
          }
        })
        .catch(function(error) {
          alert("Erro");
          console.log(error)
        });

      this.tag = 0;
    },

    //Função para pegar o id do cliente logado
    logado(dados) {
      this.id = dados[0]._id;
    },

    //Função que carrega todos os animais do BD para mostrar na tela
    seus_animais() {
      //Primeiro pega o id do cliente logado
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

      //Depois pega todos os animais desse cliente
      fetch("http://localhost:3000/animals/owner/" + this.id, {
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
              this.carregar_seus_animais_agendamento(jsonRes);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    //Função que pega os agendamentos dos animais do cliente
    carregar_seus_animais_agendamento(dados) {

      fetch("http://localhost:3000/agendamento/user/" + this.id, {
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
              if (jsonRes.length > 0) {
                this.carregar_seus_animais(jsonRes, dados);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    //Função que imprime na tela todas as informações do animal junto com seus agendamentos
    carregar_seus_animais(agendamento, dados) {

      for (var i = dados.length - 1; i >= 0; i--) {
        var elementoPai = document.getElementById("main");
        var primeiroFilho = elementoPai.firstChild;

        var enter = document.createElement("br");

        var local = "animal" + i;
        var div = document.createElement("div");
        div.className = "animal";
        div.id = local;
        elementoPai.insertBefore(div, primeiroFilho);

        var img = document.createElement("IMG");
        img.src = dados[i].photo;
        img.style.width = "100px";
        img.style.height = "100px";
        img.className = "img-circle";
        img.style.marginLeft = "18px";
        document.getElementById(local).appendChild(img);

        var local2 = "animalInfo" + i;
        var div2 = document.createElement("div");
        div2.className = "animalInfo";
        div2.id = local2;
        document.getElementById(local).appendChild(div2);

        var p = document.createElement("p");
        p.className = "nome";
        p.id = "nomed" + i;
        p.innerHTML = dados[i].name;
        document.getElementById(local2).appendChild(p);
        document.getElementById(local2).appendChild(enter);
        document.getElementById(local2).appendChild(enter);

        var p2 = document.createElement("p");
        p2.innerHTML =
          "<br> Raça: " +
          dados[i].race +
          "<br> Idade: " +
          dados[i].age +
          "<br>";
        document.getElementById(local2).appendChild(p2);

        for (var j = 0; j < agendamento.length; j++) {
          var data = agendamento[j].date.split("-");
          var dia = data[2].split("T");
          var hoje = new Date();
          var dataAgendamento = new Date(data[0], data[1] - 1,dia[0], agendamento[j].hour);

          //Compara se a data do agendamento já passou (caso tenha passado não é mostrado para o usuario)
          if (agendamento[j].pet_id.name == dados[i].name && dataAgendamento >= hoje) {

            var local3 = "animalAgendamentoInfo" + [j];
            var div3 = document.createElement("div");
            div3.className = "animalAgendamento";
            div3.id = local3;
            document.getElementById(local).appendChild(div3);
            var p3 = document.createElement("p");
            p3.className = "agendamento";
            p3.id = "nomed" + i;
            p3.innerHTML = agendamento[j].service.title + ": " + dia[0] + "/" + data[1] +" - " + agendamento[j].hour + ":00";
            var enter2 = document.createElement("br");
            document.getElementById(local).appendChild(p3);
            document.getElementById(local).appendChild(enter2);
            document.getElementById(local).appendChild(enter2);
          }
        }

        var b = document.createElement("button");
        b.setAttribute("type", "submit");
        b.innerHTML = "Excluir";
        b.className = "botaoexcluir";

        //Botão que adiciona a função de excluir o animal caso o usuario deseje isso
        var button = document.createElement("button");
        button.innerHTML = "Excluir";
        button.id = dados[i]._id;
        button.className = "botaoexcluir";
        button.onclick = function() {
          var idBotao = window.event.srcElement.id;
          var r = confirm("Você apagará esse animalzinho, deseja continuar?");

          if (r == false) return;
          else {
            fetch("http://localhost:3000/animals/" + idBotao, {
              method: "DELETE"
            });

            window.location.href = "seus_animais";
          }
        };

        document.getElementById(local2).appendChild(button);
      }
    }
  }
};
</script>

<style>
/*Defini o estilo padrão da pagina */
* {
  font-family: "Baloo Bhaina 2";
  color: #4f4f4f;
  text-align: center;
  font-size: 18px;
}

/*Estiliza a posição inicial da main*/
#main {
  margin-left: 13%;
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

/*Defini o estilo do carrinho de compras */
#cart {
  margin-left: 90%;
}

/*define estilo e posição da imagem do logo do pet shop, localizado na .top-bar (verde clara)*/
#imagem {
  float: left;
  margin-top: 7px;
}

/*Define estilo e posição da imagem do logo do carrinho, localizado na .top-bar (verde clara)*/
#imagem_carrinho {
  float: right;
  margin-top: 17px;
  margin-left: -10px;
  max-width: 25px;
  max-height: 25px;
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

/*define formato circular para as imagens de cada animal*/
.img-circle {
  margin-top: 20px;
  width: 110px;
  height: 110px;
}

/*estiliza sessão de cada animal (tudo que se encontra no retangulo cinza)*/
.animal {
  display: inline-block;
  background-color: #e8e8e8;
  border-radius: 5px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 2%;
  width: 250px;
  height: 450px;
  text-align: center;
  vertical-align: top;
}

/*Estiliza os campos de input para pegar as infromações do novo animal*/
.inpu {
  width: 90%;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-left: 10px;
}

/*Estiliza os campos de nome do dado para pegar as infromações do novo animal (Por exemplo - Nome do animal: )*/
.dado {
  margin-left: 10px;
}

/*estiliza nome do animal*/
.nome {
  font-weight: bold;
  width: 100%;
  height: 20%;
}

/*estiliza botões da página*/
.botaosu {
  margin-left: 9px;
  border: 1px solid rgb(101, 139, 82);
  background-color: rgb(119, 180, 85);
  border-radius: 5px;
  color: white;
  margin-top: 27px;
  margin-bottom: 30px;
  font-size: 16px;
  padding: 10px 18px;
  text-transform: uppercase;
}

/*Estiliza o botão de excluir animal*/
.botaoexcluir {
  border-radius: 5px;
  color: white;
  margin-top: 10px;
  font-size: 15px;
  padding: 6px 7px;
  text-transform: uppercase;
  margin-top: 64%;
  background-color: red;
}

/*define limites para a sessão com as informações do animal*/
.animalInfo {
  width: 100%;
  height: 20%;
  text-align: center;
  margin-bottom: 28%;
}

/*estiliza imagem de + para adicionar mais animais*/
.plus {
  vertical-align: center;
  padding-top: 50%;
  padding-left: 20%;
  margin-bottom: 30%;
  width: 55%;
  height: 55%;
}
</style>
