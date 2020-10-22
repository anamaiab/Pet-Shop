<!--
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
  -->
  
<template>
  <div class="cadastro_usuario">
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
    <h1>Cadastre-se!</h1>

    <!--Início da seção de dados para cadastro -->
    <div class="main" style="margin-left: 450px;">
      <form>
        <div align="left">
          <label for="name">Nome do usuário:</label>
          <br />
          <input class="inp" type="text" id="fname" name="fname" v-model="fname" />
          <br />

          <label for="email">Email:</label>
          <br />
          <input class="inp" type="text" id="email" name="email" v-model="email" />
          <br />

          <!-- as senhas são tipo password para que os caracteres sejam ocultos -->
          <label for="passw">Senha:</label>
          <br />
          <input class="pass" type="password" id="passw" name="passw" v-model="passw" />
          <br />

          <label for="passw">Confirmar Senha:</label>
          <br />
          <input class="pass" type="password" id="cpassw" name="cpassw" v-model="cpassw" />
          <br />

          <label for="cel">Telefone:</label>
          <br />
          <input class="inp" type="text" id="cel" name="cel" v-model="cel" />
          <br />

          <label for="addr">Endereço:</label>
          <br />
          <input class="inp" type="text" id="addr" name="addr" v-model="addr" />
          <br />

          <label for="photo">Foto:</label>
          <br />
          <input class="inp" type="text" id="photo" name="photo" v-model="photo" />

          <br />

          <!-- botão submit -->
          <div class="submit">
            <input id="inpsub" type="submit" value="Submit" v-on:click.prevent.stop="addUser()" />
          </div>
        </div>
        <!-- fim da seção de dados para cadastro -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    fname: "",
    email: "",
    passw: "",
    cpassw: "",
    addr: "",
    cel: "",
    photo: "",
    logged: "",
    erros: ""
  }),

  methods: {
    //Função de adicionar as funções no banco de dados
    addUserBD() {
      this.$axios
        .post("http://localhost:3000/user/", {
          user: this.fname,
          email: this.email,
          password: this.passw,
          adress: this.addr,
          cel: this.cel,
          photo: this.photo,
          logged: "0",
          adm: "0"
        })
        .then(response => {
          if (response.status == 201) {
            alert("Usuário cadastrado com sucesso!");
            window.location.href = "login"
          }
        })
        .catch(function(error) {
          alert("Email ou Usuário já existente");
          console.log(error)
        });
    },

    //Confere se os dados foram preenchidos, so se todos forem serã atualizando no bd
    addUser() {

      //Conferindo se os campos foram preenchidos da forma certa

      //Vendo se o campo *usuario* foi preenchido, caso tenha sido chama função para saber se foi colocado caracteres invalidos
      if (!this.fname) this.erros += "Inserir nome de usuário \n ";
      else this.checkUserName(this.fname);

       //Vendo se o campo *email* foi preenchido, ele deve seguir o padrao seuemail@endereco
      if (!this.email) {
        this.erros = this.erros + "O campo email não foi preeenchido \n";
      } else if (this.checkEmail(this.email) == false) {
        this.erros +=
          "Formato de email inválido \n Deve-se seguir o formato: \n exemplo@email.com(.br) \n";
      } else {
        this.checkEmailExistente(this.email);
      }

      //Vendo se o campo *senha* foi preenchido, caso tenha sido chama função para saber se nao existem espaços e se ele possui pelo menos 8 caracteres
      if (!this.passw) this.erros += "O campo senha não foi preeenchido \n";
      else this.checkPassword(this.passw);

      //Verifica se as senhas sao iguais
      if (!this.cpassw)
        this.erros += "O campo confirmar senha não foi preeenchido \n";
      else this.verifyPassword(this.passw, this.cpassw);

      //Vendo se o campo endereco foi preenchido
      if (!this.addr) this.erros += "O campo *Endereço* não foi preeenchido \n";

      //Vendo se o campo telefone foi preenchido
      if (!this.cel) this.erros += "O campo *Telefone* não foi preeenchido \n";

      //Imprimindo os possiveis this.erros na tela
      if (this.erros != "") alert(this.erros);

      //Vendo se o formulário foi preenchido de maneira correta
      if (this.erros == "") {
        //ADICIONAR NO BANCO DE DADOS
        this.addUserBD();
      }

      this.erros = "";
    },

    // verifica se o nome do usuário está dentro do esperado
    checkUserName(fname) {
      // caracteres inválidos
      var invalid = [
        "!",
        "-",
        "@",
        "$",
        "%",
        "¨",
        "&",
        "*",
        "(",
        ")",
        "_",
        "+",
        "=",
        "[",
        "]",
        "{",
        "}",
        "?",
        "/",
        "|",
        ",",
        ":",
        ";",
        ">",
        "<"
      ];

      var len = fname.length;
      // verifica se o usuario possui algum caracter inválido
      for (var i = 0; i < len; i++) {
        if (fname.includes(invalid[i])) {
          this.erros +=
            "O nome de usuário não pode incluir caracteres especiais (Só são aceitos letras) <br>";
          break;
        }
      }

      return;
    },

    // função que verifica se o email está correto
    checkEmail(email) {
      var len = email.length;
      var cnt = 0;
      var valid = 0;

      for (var i = 0; i < len; i++) {
        // verifica se existe @ no email e se este nao é o primeiro nem o ultimo caractere
        if (email[i] == "@") {
          cnt = cnt + 1;
          if (i > 0 && i < len - 1) valid = valid + 1;
        }
      }
      if (cnt == 1 && valid == 1) return true;
      return false;
    },

    //Função que conferer se já existe o email escolhido pelo usuario
    checkEmailExistente(email) {
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
              this.erros += "E-mail já cadastrado";
              console.log(jsonRes);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },

    // checa se a senha está dentro do padrão esperado
    checkPassword(passw) {
      var len = passw.length;

      if (passw.includes(" "))
        this.erros += "A senha não deve possuir espaços <br>";
      if (len < 8)
        this.erros += "A senha deve ter pelo menos 8 caracteres <br>";

      return;
    },

    // verifica se as duas senhas digitadas são iguais
    verifyPassword(passw, cpassw) {
      if (passw.trim() == cpassw.trim()) return true;
      this.erros += "As senhas devem ser iguais <br>";

      return false;
    }
  }
};
</script>

<style>
* {
  /*Define para todos os textos: alinhamento padrão a esquerda, fonte, cor do texto e tamanho da fonte*/
  text-align: left;
  font-family: "Baloo Bhaina 2";
  color: #4f4f4f;
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
  size: 24px;
}

/*define estilo e posição da imagem do logo do pet shop, localizado na .top-bar (verde clara)*/
#imagem {
  float: left;
  margin-top: 7px;
}

/*define cor de fundo*/
body {
  background-color: #f2f2f2;
}

/*estiliza título*/
h1 {
  font-size: 32px;
  text-align: center;
}

/*centraliza elemento principal do body*/
form {
  padding-left: 0px;
}

/*estiliza caixas de texto para o cadastro*/
.inp {
  width: 55%;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

/*estiliza caixas de texto para as senhas no cadastro (identico ao input[type=text])*/
.pass {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

/*input[type=submit] e .submit estilizam o botão de submit*/
#inpsub {
  border: 1px solid rgb(101, 139, 82);
  background-color: rgb(119, 180, 85);
  border-radius: 5px;
  color: white;
  margin-top: 6px;
  margin-bottom: 30px;
  font-size: 14px;
  padding: 10px 18px;
  margin-left: 139px;
  text-transform: uppercase;
}


</style>