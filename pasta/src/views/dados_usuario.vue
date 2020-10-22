<!--
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
  -->
<template>
  <div class="dados_usuario">
    <!--Início das barras de navegação do pet shop-->
    <div class="top-bar">
      <div class="button-holder-top">
        <a id="logo" href="/home_login">PET SHOP</a>
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

    <!--Carregando os dados do usuario-->

    {{pegandoDados()}}
    <!-- Título -->
    <div id="titulo">
      <h1>Seus Dados</h1>
    </div>

    <!--Criando a seção dos dados-->
    <div id="data" class="opcoess">
      <div class="maiin">
        <!--Criando a seção da foto-->
        <div class="dad" id="photoCircular"></div>

        <!--Criando a seção do nome-->
        <label for="name" class="dad">Nome:</label>
        <input class="inputt" type="text" id="fname" name="fname" placeholder="usuario" v-model="subfname" />
        <br />

        <!--Criando a seção do email-->
        <label for="email" class="dad">Email:</label>
        <input class="inputt" type="text" id="email" name="email" placeholder="email" v-model="subemail"  />
        <br />

        <!--Criando a seção da senha-->
        <label for="passw" class="dad">Senha:</label>
        <input class="inputt" type="password" id="passw" name="passw" placeholder="senha" v-model="subpassw" />
        <br />

        <!--Criando a seção da telefone-->
        <label for="cel" class="dad">Telefone:</label>
        <input class="inputt" type="text" id="phone" name="phone" placeholder="telefone" v-model="subcel" />
        <br />

        <!--Criando a seção do endereço-->
        <label for="addr" class="dad">Endereço:</label>
        <input class="inputt" type="text" id="addr" name="addr" placeholder="endereço" v-model="subaddr" />
        <br />

        <!--Criando a seção do link da foto-->
        <label for="foto" class="dad">Link da foto:</label>
        <input class="inputt" type="text" id="foto" name="foto" placeholder="link da foto" v-model="subfoto"/>
        <br />
      </div>
      <br />
      <!--Fim da seção dos dados-->

      <!--Criando o botão de atualizar dados-->
      <div class="submit">
        <input class="inpusub" type="submit" id="atualizar" value="Atualizar" v-on:click.prevent.stop="atualizarLogin()"/>
        <input class="inpusub" type="submit" id="deslogar" value="Deslogar" v-on:click.prevent.stop="deslogarLogin()"/>
        <input class="inpusub" type="submit" id="excluir" value="Excluir" v-on:click.prevent.stop="deletarLogin()"/>
      </div>
      <br />
      <!-- Fim do botão de atualizar dados-->
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    fname: "",
    email: "",
    passw: "",
    cel: "",
    addr: "",
    foto: "",
    id: "",
    photo: "",
    subfname: "",
    subemail: "",
    subpassw: "",
    subcel: "",
    subaddr: "",
    subfoto: "",
    erros: ""
  }),

  methods: {
    // busca no banco de dados os dados do usuário logado
    // utilizando a variável "logged".
    pegandoDados() {
      fetch("http://localhost:3000/user/logged", {
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
    },

    // escreve na tela os dados do usuário logado
    // após buscá-los do banco de dados
    logado(dados) {
      
      this.fname = dados[0].user
      this.email = dados[0].email
      this.passw = dados[0].password
      this.addr = dados[0].adress
      this.cel = dados[0].cel
      this.id = dados[0]._id
      this.photo = dados[0].photo
      this.foto = dados[0].photo;

      var img = document.createElement("IMG");
      img.src = this.photo;
      img.style.width = "100px";
      img.style.height = "100px";
      img.className = "img-circle";
      img.style.id = "img-profile";
      document.getElementById("photoCircular").appendChild(img);

      var ph = document.getElementById("phone");
      ph.placeholder = this.cel;

      var nam = document.getElementById("fname");
      nam.placeholder = this.fname;

      var em = document.getElementById("email");
      em.placeholder = this.email;

      var senha = document.getElementById("passw");
      senha.placeholder = this.passw;

      var ende = document.getElementById("addr");
      ende.placeholder = this.addr;

      var foto = document.getElementById("foto");
      foto.placeholder = this.photo;
    },

    // deleta o usuário do banco de dados.
    deletarLogin() {
      // pede para que o usuário confirma a ação
      var r = confirm("Você apagará esse usuário, deseja continuar?");

      if (r == false) return;
      else {
        //Deletando no banco
        this.$axios.delete("http://localhost:3000/user/" + this.email, {});

        window.location.href = "login";
      }
    },

    // logout do usuário logado, atualiza o dado logegd para falso
    deslogarLogin() {
      //Atualizando no banco (logged para 0)
      this.$axios
        .put("http://localhost:3000/user/" + this.id, {
          logged: "0"
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

      // redireciona para a página de login
      window.location.href = "login";
    },

    // logout do usuário logado, atualiza o dado logegd para falso
    atualizarLogin() {
      //Pegando os dados atualizados
      if (!this.subfname) this.subfname = this.fname;

      if (!this.subemail) this.subemail = this.email;
      else {
        if (!this.checkEmail(this.subemail)) {
          alert(
            "Formato de email inválido \n Deve-se seguir o formato: \n exemplo@email.com(.br)"
          );
          return;
        }
      }

      if (!this.subpassw) this.subpassw = this.passw;
      if (!this.subcel) this.subcel = this.cel;
      if (!this.subaddr) this.subaddr = this.addr;

      if (!this.subfoto) this.subfoto = this.foto;

      //Atualizando no bd
      this.$axios
        .put("http://localhost:3000/user/update/" + this.id, {
          user: this.subfname,
          email: this.subemail,
          cel: this.subcel,
          password: this.subpassw,
          adress: this.subaddr,
          photo: this.subfoto
        })
        .then(response => {
          alert("Usuário atualizado com sucesso");
          console.log(response);
          window.location.href = "dados_usuario";
        })
        .catch(error => {
          alert("Erro: Usuário ou email já existente no sistema");
          console.log(error);
        });
    },

    // função que verifica se o email está correto
    checkEmail(email) {
      var len = email.length;
      var cnt = 0;
      var valid = 0;

      for (var i = 0; i < len; i++) {
        // verifica se existe @ no email e se este nao é o primeiro nem o ultimo caractere
        if (email[i] == "@") {
          cnt += 1;
          if (i > 0 && i < len - 1) valid += 1;
        }
      }

      if (cnt == 1 && valid == 1) return true;
      return false;
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
  background-repeat: no-repeat;
  background-size: cover;
  height: 703px;
  color: #4f4f4f;
  background-color: #f2f2f2;
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

/*Estiliza a posição do título*/
#titulo {
  margin-top: 50px;
}

/*Estiliza o titulo*/
h1 {
  text-align: center;
  font-size: 32px;
}

/*Estiliza a posição dos dados do cliente*/
.maiin {
  margin-left: 12%;
}

/*Estiliza os titulos dos dados (Nome, E-mail, etc)*/
.dad {
  font-size: 23px;
  margin-top: 10px;
  color: #4f4f4f;
  margin-left: 28%;
}

/*Estilizando o texto dos dados (como Ana Maia Baptistão no nome)*/
p {
  font-size: 18px;
  color: #696969;
  display: inline;
  margin-left: 5px;
}

/*Estilizando a foto de perfil */
.img-circle {
  width: 90px;
  margin-top: -6px;
  height: 100px;
  border-radius: 50px 50px 50px 50px;
  border-style: solid;
  border-width: 3px;
  border-color: #696969;
  margin-left: 58px;
  position: unset;
}

/* Estilizando os retangulos de input*/
.inputt {
  width: 23%;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

/*Estilizando a posição da foto de perfil */
#photoCircular {
  margin-top: 20px;
  text-align: center;
  margin-left: -18%;
  margin-bottom: 3%;
}


/*Estiliza a posição do botão atualizar dados*/
.submit {
  text-align: center;
  display: inline-block;
  margin-left: 34%;
}

/* estiliza o botão de excluir */
#excluir {
  margin-right: 70px;
  background-color: red;
}

/* estiliza o botão de atualizar */
#atualizar {
  margin-right: 70px;
}

/* estiliza o botão de excluir */
#deslogar {
  margin-right: 70px;
}

/*Estiliza a estilo do botão atualizar dados*/
.inpusub {
  border: 1px solid rgb(101, 139, 82);
  background-color: rgb(119, 180, 85);
  border-radius: 5px;
  color: white;
  margin-top: 10px;
  font-size: 14px;
  padding: 4px 18px;
  text-transform: uppercase;
}
</style>