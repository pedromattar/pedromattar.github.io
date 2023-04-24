function enviarFormulario() {
  // obtém o nome digitado pelo usuário
  var nome = document.getElementById("nome").value;

  // obtém o naipe selecionado pelo usuário
  var naipe = document.querySelector(".naipe-botao.active").dataset.naipe;

  // obtém o número digitado pelo usuário
  var numero = document.getElementById("numero").value;

  // obtém a bebida digitada pelo usuário
  var bebida = document.getElementById("bebida").value;

  // verifica se o nome, número ou bebida estão vazios
  if (nome === "" || numero === "" || bebida === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // cria um objeto com os dados do formulário
  var formulario = {
    nome: nome,
    naipe: naipe,
    numero: numero,
    bebida: bebida
  };

  // obtém a tabela correspondente ao naipe selecionado
  var tabela = document.getElementById("tabela-" + naipe);

  // obtém a referência ao corpo da tabela
  var tbody = tabela.getElementsByTagName("tbody")[0];

  // cria uma nova linha para a tabela
  var novaLinha = tbody.insertRow();

  // adiciona as células da nova linha
  var nomeCelula = novaLinha.insertCell();
  nomeCelula.innerHTML = nome;
  var bebidaCelula = novaLinha.insertCell();
  bebidaCelula.innerHTML = bebida;
  var quantidadeCelula = novaLinha.insertCell();
  quantidadeCelula.innerHTML = numero;

  // reseta o formulário
  document.getElementById("formulario").reset();
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
