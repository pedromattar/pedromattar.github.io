// variável global para armazenar o naipe selecionado
var naipe = "";
function selecionaNaipeCopas() {
  naipe = "copas";
  document.getElementById("imagem-copas").src = "./assets/suit-hearts-fill.svg";
}

function selecionaNaipeEspadas() {
  naipe = "espadas";
  document.getElementById("imagem-espadas").src = "./assets/suit-spade-fill.svg";
}

function selecionaNaipeOuros() {
  naipe = "ouros";
  document.getElementById("imagem-ouros").src = "./assets/suit-diamond-fill.svg";
}

function selecionaNaipePaus() {
  naipe = "paus";
  document.getElementById("imagem-paus").src = "./assets/suit-clubs-fill.svg";
}

function enviarFormulario() {
  // Obter os valores dos campos do formulário
  var nome = document.getElementById("nome").value;
  var numero = document.getElementById("numero").value;
  var bebida = document.getElementById("bebida").value;
  
  // Criar uma nova linha para a tabela
  var novaLinha = document.createElement("tr");
  var novaCelulaNome = document.createElement("td");
  var novaCelulaBebida = document.createElement("td");
  var novaCelulaQuantidade = document.createElement("td");
  novaCelulaNome.innerHTML = nome;
  novaCelulaBebida.innerHTML = bebida;
  novaCelulaQuantidade.innerHTML = numero;
  novaLinha.appendChild(novaCelulaNome);
  novaLinha.appendChild(novaCelulaBebida);
  novaLinha.appendChild(novaCelulaQuantidade);
  
  // Obter a tabela correta com base no naipe selecionado
  var tabela = document.getElementById("tabela-" + naipe);
  var tbody = tabela.getElementsByTagName("tbody")[0];
  
  
  // Adicionar a nova linha à tabela
  tbody.appendChild(novaLinha);
}

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
