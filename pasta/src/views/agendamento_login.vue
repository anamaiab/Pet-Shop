<!--
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
  -->

<template>
  <div class="agendamento_login">
    <!--Início das barras de navegação do pet shop-->

    <div class="top-bar">
      <div class="button-holder-top">
        <a id="logo" href="/">PET SHOP</a>
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

    <!--Criando a seção de escolher animal-->

    <div id="animais" class="opcoes">
      Escolha uma amiguinho:
      <select id="listaanimais" class="optionSelect" v-model="animal">
        {{gerandoAnimaisLogado()}}
        <option selected value>Animal</option>
      </select>
    </div>

    <button id="pesquisar" v-on:click.prevent.stop="pesquisar()">Pesquisar horários</button>

    <!--Criando a seção dos resultados-->

    <div id="titulo-resultados" class="opcoes">Resultados:</div>

    <!--Mostrando os resultados - azul é valido, vermelho é ocupado-->

    <div id="resultados"></div>
  </div>
</template>


<script>
export default {
  data: () => ({
    servico: "",
    dono: "",
    animal: "",
    tagA: 1,
    tagS: 1,
    erro: "",
    data:"",
    tagBotaoPesquisar: 0
  }),

  methods: {
    //Função que pega quem é o usuario logado
    gerandoAnimaisLogado() {
      if (this.tagA == 1) {
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
                this.dono = jsonRes[0]._id;
                this.gerandoAnimais();
              })
              .catch(error => {
                console.log(error);
              });
          }
        });
      }
    },

    //Função que utiliza o valor do usuario logado para pegar quais são os seus animais
    gerandoAnimais() {
      if (this.tagA == 1) {
        fetch("http://localhost:3000/animals/owner/" + this.dono, {
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
                this.carregarAnimais(jsonRes);
                this.tagA = 2;
              })
              .catch(error => {
                console.log(error);
              });
          }
        });
      }
    },

    //Função que coloca nas opções quais são os animais a serem escolhidos
    carregarAnimais(dados) {
      if (this.tagA == 1) {
        for (var i = 0; i < dados.length; i++) {
          var li = document.createElement("option");
          li.className = "optionSelect"; 
          li.innerHTML = dados[i].name;
          document.getElementById("listaanimais").appendChild(li);
        }

        this.tagA = 2;
      }
    },

    //Pegando no BD quais são os serviços disponiveis
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

    //Função que coloca nas opções quais são os serviços a serem escolhidos
    carregarServicos(dados) {
      for (var i = 0; i < dados.length; i++) {
        var li = document.createElement("option");
        li.className = "optionSelect"; 
        li.innerHTML = dados[i].title;
        document.getElementById("listaservicos").appendChild(li);
      }

      this.tagS = 2;
    },

    //Função que confere se todos os campos estão preenchidos para realizar a pesquisa
    pesquisar() {
      if (this.tagBotaoPesquisar == 0) {
        if (!this.data)
          this.erro = this.erro + "É necessário escolher uma data para realizar a pesquisa \n";
        else {

        //Confere se a data escolhida é maior que a do dia de hoje
          var data = new Date();
          var dataMarcada = this.data.split("-");
          var dataEscolhida = [];

          for (var i = 0; i < 3; i++) {
            dataEscolhida[i] = parseInt(dataMarcada[i]);
          }

          if (dataEscolhida[0] != data.getFullYear())
            this.erro = this.erro + "Escolha um data no ano de " +  data.getFullYear() +"\n";
        else if (dataEscolhida[1] < data.getMonth() + 1)
            this.erro = this.erro + "Escolha um mês maior ou igual a " + (data.getMonth() + 1) + "\n";
          else if (dataEscolhida[1] == data.getMonth() + 1 && dataEscolhida[2] <= data.getDate())
            this.erro = this.erro + "Escolha uma data maior que ou igual a " + (data.getDate() + 1) + "/" + (data.getMonth() + 1) + "/" + data.getFullYear() + "\n";
        }
        if (!this.servico)
          this.erro = this.erro + "É necessário escolher um serviço para poder realizar a pesquisa \n";
        if (!this.animal)
          this.erro = this.erro + "É necessário escolher uma animais para realizar a pesquisa \n";

        if (!this.erro) {
          this.tagBotaoPesquisar = 1;
          this.pesquisarCalendario();
        } else {
          alert(this.erro);
          this.erro = "";
        }
      }
    },

    //Função que pega os horarios ocupados na data escolhida
    pesquisarCalendario() {
      fetch("http://localhost:3000/agendamento/date/" + this.data, {
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
              this.AddHorarios(jsonRes);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    //Função que adiciona no BD o horario e data escolhido
    AddHorarios(dados) {
      var horariosOcupados = [];

      var horarios = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

      var tamanho = dados.length;

      for (var i = 0; i < tamanho; i++) {
        horariosOcupados.push(dados[i].hour);
      }

        //Confere se a hora está ocupada ou nao
      for (var j = 0; j < 10; j++) {
        var verificaHorario = horariosOcupados.indexOf(horarios[j]);
        //Se estiver ocupada é criado os botões de horario invalido
        if (verificaHorario != -1) {
          var horaInvalida = document.createElement("button");
          horaInvalida.id = "hora" + horarios[j];
          var local1 = "hora" + horarios[j];
          horaInvalida.className = "invalido";
          horaInvalida.onclick = function() {
            alert("Horário ocupado");
          };

          document.getElementById("resultados").appendChild(horaInvalida);

        //Adicionando o horario no botão
          var horario = document.createElement("P");
          horario.id = "horario";
          horario.className = "horarios";
          horario.innerHTML = horarios[j] + ":00 - " + (horarios[j] + 1) + ":00" + "<br>";
          document.getElementById(local1).appendChild(horario);

        //Adicionando o nome do dono e do animal que estão reservados nesse horario
          var pet = document.createElement("p");
          pet.id = "pet";
          pet.className = "pet";
          pet.innerHTML = dados[verificaHorario].pet_id.name + " - " + dados[verificaHorario].user_id.user +  "<br>";
          document.getElementById(local1).appendChild(pet);
        
        //Adicionando a imagem do serviço no botão
          var img = document.createElement("IMG");
          img.className = "imagemHorario";
          img.src = dados[verificaHorario].service.photob;
          var enter = document.createElement("br");
          document.getElementById(local1).appendChild(img);
          document.getElementById(local1).appendChild(enter);

        //Adicionando o nome do serviço no botão
          var service = document.createElement("p");
          service.id = "service";
          service.className = "service";
          service.innerHTML = dados[verificaHorario].servicename.title;
          document.getElementById(local1).appendChild(service);
        } else {
            //Caso o horario esteja livre
          var horaValida = document.createElement("button");
          horaValida.className = "valido";
          var id =  horarios[j] +  "_" + this.servico +  "_" + this.animal + "_" + this.data + "_" + this.dono;          
          horaValida.id = id;
          var local2 = id;
          document.getElementById("resultados").appendChild(horaValida);

          //Se o botão for escolhido
          horaValida.onclick = function() {
            var idBotao = window.event.srcElement;
            var informacoes = idBotao.id;

            var infos = informacoes.split("_");

            var data = infos[3].split("-");

            var name = infos[1] + "<br>" + data[2] + "/" + data[1] + " - " + infos[0] + ":00" + "<br>" + infos[2];
            
            //Pegando o id do animal escolhido
            fetch(
              "http://localhost:3000/animals/name/" + infos[2] + "/" + infos[4],
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              }
            ).then(res => {
              if (res.ok) {
                res.json().then(jsonRes => {
                  var id_animal = jsonRes._id;

                    //Se foi possivel achar o id é procurado o id do serviço escolhido
                  fetch("http://localhost:3000/services/title/" + infos[1], {
                    method: "GET",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                    }
                  }).then(res => {
                    if (res.ok) {
                      res.json().then(jsonRes => {
                          //Se for achado é confirmado se o usuario quer agendar nesse horario mesmo
                        var id_servico = jsonRes._id;
                        var price = jsonRes.price;
                        var photo = jsonRes.photop;

                        var r = confirm("Você deseja confirmar seu agendamento para seu amiguinho nesse horário?");
                        //Caso seja escolhido
                        if (r == true) {
                          //Adicionando o horario na agenda
                          fetch("http://localhost:3000/agendamento", {
                            method: "post",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                              user_id: infos[4],
                              pet_id: id_animal,
                              service: id_servico,
                              date: infos[3],
                              hour: infos[0],
                              servicename: id_servico
                            })
                          }).then(res => {
                            
                            if (res.ok) {
                              res
                                .json()
                                .then(jsonRes => {
                                  
                                    //Se for possivel adicionar na agenda é adicionado o serviço no carrinho 
                                  fetch("http://localhost:3000/carrinho", {
                                    method: "post",
                                    headers: {
                                      Accept: "application/json",
                                      "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                      user_id: infos[4],
                                      price: price,
                                      name: name,
                                      photo: photo,
                                      quant: 1,
                                      service_id: jsonRes,
                                      tag: 0
                                    })
                                  }).then(response => {
                                    if (response.status == 201) {
                                        //Encaminha-se o usuario pro carrinho de compras para ele finalizar a compra
                                      alert(
                                        "Agendamento semi-confirmado! \nPor favor finalize a compra para que o agendamento sejá finalizado"
                                      );
                                      window.location.href = "carrinho_compras";
                                    } else {
                                      alert(
                                        "Problema em agendar serviço.\n Por favor, tente novamente"
                                      );
                                    }
                                  });

                                })
                                .catch(error => {
                                  alert("Email não cadastrado");
                                  console.log(error);
                                });
                            }
                          });

                        }
                      });
                    }
                  });
                });
              }
            });

          };

         //Adicionando o horario no botão
          var horario2 = document.createElement("P");
          horario2.id = "horario";
          horario2.className = "horarios";
          horario2.innerHTML =
            horarios[j] + ":00 - " + (horarios[j] + 1) + ":00" + "<br>";
          document.getElementById(local2).appendChild(horario2);

        //Adicionando a alavra livre no botão
          var livre = document.createElement("p");
          livre.id = "livre";
          livre.className = "livre";
          livre.innerHTML = "Livre <br>";
          document.getElementById(local2).appendChild(livre);

        //Adiciona uma imagem que representa o horario livre no botão
          var img2 = document.createElement("IMG");
          img2.className = "imagemHorario";
          img2.style.width = "45px";
          img2.style.height = "45px";
          img2.src = "https://i.ibb.co/25dQ6gh/pets.png";
          document.getElementById(local2).appendChild(img2);
        }
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

/*Define estilo e posição da imagem do logo do carrinho, localizado na .top-bar (verde clara)*/
#imagem_carrinho {
  float: right;
  margin-top: 17px;
  margin-left: -10px;
  max-width: 25px;
  max-height: 25px;
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

/*Estiliza o local de escolher data*/
.chooseDate {
  width: 190px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
  text-align: center;
}

/*Estiliza o nome do dono e do animal no botão invalido*/
.pet {
  font-size: 15px;
  color: white;
}

/*Estiliza o nome do seerviço no botão invalido*/
.service {
  font-size: 12px;
  color: white;
}

/*Estiliza o nome livre botão valido*/
.livre {
  font-size: 15px;
  color: white;
}

/*Estiliza o horario nos botões*/
.horarios {
  font-size: 16px;
  color: white;
}

/*Estiliza o espaçamento entre as areas de escolher uma data, um serviço e os resultados*/
.opcoes {
  font-size: 25px;
  padding-top: 0%;
  padding-bottom: 0.5%;
}

/*Criando o estilo da parte do escolher o serviço*/
#servico {
  margin-top: 1%;
  padding-top: 0%;
  padding-bottom: 1.7%;
}

/*Criando o estilo dos botões da parte dos resultados*/
#resultados {
  display: inline;
  text-align: center;
}

/*Estilizando a posição do botão pesquisar*/
#pesquisar {
  margin-left: 50%;
}

/*Criando o estilo dos botões dos horários válidos*/
.valido {
  background-color: #57b3a5;
  color: white;
  width: 184px;
  height: 155px;
  margin-right: 1.1%;
  padding-top: 0.5%;
  margin-top: 1%;
  display: inline-block;
  text-align: center;
  padding-top: 0.5%;
}

/*Criando o estilo dos botões dos horários inválidos*/
.invalido {
  background-color: #ff4040;
  width: 184px;
  height: 155px;
  margin-right: 1.1%;
  padding-top: 0.5%;
  display: inline-block;
  text-align: center;
}


</style>
