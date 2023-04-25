function enviarFormulario() {
  const nome = document.getElementById("nome").value;
  const naipeAtivo = document.querySelector(".naipe-botao.active");
  const naipe = naipeAtivo.dataset.naipe;
  const bebida = document.getElementById("bebida").value;
  const quantidade = document.getElementById("numero").value;

  const tabela = document.getElementById(`tabela-${naipe}`);

  // cria uma nova linha na tabela
  const novaLinha = tabela.insertRow();

  // cria as células para a linha criada
  const celulaNome = novaLinha.insertCell();
  const celulaBebida = novaLinha.insertCell();
  const celulaQuantidade = novaLinha.insertCell();

  // define o conteúdo de cada célula
  celulaNome.innerHTML = nome;
  celulaBebida.innerHTML = bebida;
  celulaQuantidade.innerHTML = quantidade;
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
