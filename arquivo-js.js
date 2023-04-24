
  // função que envia o formulário
  function enviarFormulario() {
    // obtém o nome digitado pelo usuário
    var nome = document.getElementById("nome").value;

    // obtém o naipe selecionado pelo usuário
    var naipe = document.querySelector(".naipe-botao.active").dataset.naipe;

    // obtém o número digitado pelo usuário
    var numero = document.getElementById("numero").value;

    // obtém a bebida digitada pelo usuário
    var bebida = document.getElementById("bebida").value;

    // cria um objeto com os dados do formulário
    var formulario = {
      nome: nome,
      naipe: naipe,
      numero: numero,
      bebida: bebida
    };


  // função que aumenta o número
  function aumentarNumero() {
    var numero = parseInt(document.getElementById("numero").value);
    document.getElementById("numero").value = numero + 1;
  }

  // função que diminui o número
  function diminuirNumero() {
    var numero = parseInt(document.getElementById("numero").value);
    if (numero > 0) {
      document.getElementById("numero").value = numero - 1;
    }
  }

  // adiciona o evento de clique nos botões de naipe
  var botoesNaipe = document.querySelectorAll(".naipe-botao");
  for (var i = 0; i < botoesNaipe.length; i++) {
    botoesNaipe[i].addEventListener("click", function() {
      // remove a classe "active" de todos os botões
      for (var j = 0; j < botoesNaipe.length; j++) {
        botoesNaipe[j].classList.remove("active");
      }

      // adiciona a classe "active" apenas no botão clicado
      this.classList.add("active");
    });
  }
    
    
    // função para extrair os dados do formulário e adicioná-los à tabela correspondente
function adicionarDados() {
  // obter os valores dos campos de entrada
  var nome = document.getElementById("nome").value;
  var bebida = document.getElementById("bebida").value;
  var numero = document.getElementById("numero").value;

  // criar uma nova linha da tabela
  var novaLinha = document.createElement("tr");
  novaLinha.innerHTML = "<td>" + nome + "</td><td>" + bebida + "</td><td>" + numero + "</td>";

  // adicionar a nova linha à tabela correspondente
  var tabelaCopas = document.getElementById("tabela-copas");
  tabelaCopas.getElementsByTagName("tbody")[0].appendChild(novaLinha);
}

// adicionar ouvinte de evento ao botão "OK"
  var botaoOK = document.querySelector("#formulario button[type='submit']");
  botaoOK.addEventListener("click", function() {
    // verificar se o naipe selecionado é copas
    var naipeSelecionado = document.querySelector(".naipe-botao.active").getAttribute("data-naipe");
    if (naipeSelecionado === "copas") {
      // adicionar os dados à tabela de copas
      adicionarDados();
    }
  });

