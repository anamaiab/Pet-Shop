<!--
    TRABALHO 2 - SCC0219 Introduction to Web Development 2020.01
    Ana Maia Baptistão NUSP: 9779221
    Beatriz Campos de Almeida de Castro Monteiro NUSP: 9778619
  -->
   
<template>
  <div class="login">
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
    <h1>Faça seu Login!</h1>

    <form>
      <div align="left" style="margin-left: 450px">
        <!--Input de email-->
        <label for="email">Email:</label>
        <br />
        <input class="inp" type="text" id="email" name="email" v-model="email" />
        <br />

        <!--Input de senha-->
        <label for="passw">Senha:</label>
        <br />
        <input class="pass" type="password" id="passw" name="passw" v-model="passw" />
        <br />

        <!--Botão submit-->
        <div class="submit">
          <input class="inpsu" type="submit" value="Submit" v-on:click.prevent.stop="checkLogin()" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "", //guarda
    passw: "" //Nome do afazer a ser apagado
  }),

  methods: {
    // Checa no BD se o email digitado está cadastrado
    // e se a senha bate com a que foi escolhida pelo usuário
    checkLogin() {
      fetch("http://localhost:3000/user/email/" + this.email, {
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
              this.isvalid(jsonRes);
            })
            .catch(error => {
              alert("Email não cadastrado");
              console.log(error);
            });
        }
      });
    },

    // checa se a senha está correta.
    // se sim, efetua o login, caso contrário mostra mensagem de erro
    isvalid(dados) {
      if (dados.password == this.passw) {
        //Se for adm sera encaminhado para a pagina de gerencimento
        if (dados.adm == 1) {
          alert("Login Efetuado");
          window.location.href = "gerenciamento";
        } else {
          //Atualizando o elemento do BD de login efetuado para true e depois encaminha o usuario para a pagina de home
          this.$axios
            .put("http://localhost:3000/user/" + dados._id, {
              logged: dados._id
            })
            .then(response => {
              alert("Login Efetuado");

              console.log(response);
              window.location.href = "home_login";
            })
            .catch(error => {
              console.log(error);
            });
        }
      } else {
        alert("Senha incorreta");
      }
    }
  }
};
</script>

<style >
/*Define para todos os textos: fonte, tamanho e cor do texto*/
* {
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

/*define estilo e posição da imagem do logo do pet shop, localizado na .top-bar (verde clara)*/
#logo {
  float: left;
  display: block;
  color: #f2f2f2;
  font-weight: bolder;
  text-align: center;
  padding: 14px 16px;
  size: 24px;
}

/*estiliza título*/
h1 {
  font-size: 32px;
  text-align: center;
}

/*define cor de fundo do site*/
body {
  background-color: #f2f2f2;
  text-align: center;
}

/*Estiliza o formulario*/
form {
  padding-left: 35%;
  margin-top: 3%;
}

/*Estiliza campos de input de texto*/
.inp {
  width: 55%;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

/*estiliza campo de input de senha*/
.pass {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
  min-width: 55%;
}

/*estiliza botão submit*/
.inpsu {
  border: 1px solid rgb(101, 139, 82);
  background-color: rgb(119, 180, 85);
  border-radius: 5px;
  color: white;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 17px;
  padding: 4px 18px;
  text-transform: uppercase;
  margin-left: 120%;
}
</style>