function enviarFormulario() {
  var nome = document.getElementById("nome").value;
  var naipe = document.querySelector(".naipe-botao.active input").value;
  var numero = document.getElementById("numero").value;
  var bebida = document.getElementById("bebida").value;

  var formulario = {
    nome: nome,
    naipe: naipe,
    numero: numero,
    bebida: bebida
  };

  if (naipe === "copas") {
    var tabela = document.getElementById("tabela-copas");
    var tbody = tabela.getElementsByTagName("tbody")[0];
    var novaLinha = tbody.insertRow();
    var nomeCelula = novaLinha.insertCell();
    nomeCelula.innerHTML = nome;
    var bebidaCelula = novaLinha.insertCell();
    bebidaCelula.innerHTML = bebida;
    var quantidadeCelula = novaLinha.insertCell();
    quantidadeCelula.innerHTML = numero;
  } else if (naipe === "espadas") {
    var tabela = document.getElementById("tabela-espadas");
    var tbody = tabela.getElementsByTagName("tbody")[0];
    var novaLinha = tbody.insertRow();
    var nomeCelula = novaLinha.insertCell();
    nomeCelula.innerHTML = nome;
    var bebidaCelula = novaLinha.insertCell();
    bebidaCelula.innerHTML = bebida;
    var quantidadeCelula = novaLinha.insertCell();
    quantidadeCelula.innerHTML = numero;
  } else if (naipe === "paus") {
    var tabela = document.getElementById("tabela-paus");
    var tbody = tabela.getElementsByTagName("tbody")[0];
    var novaLinha = tbody.insertRow();
    var nomeCelula = novaLinha.insertCell();
    nomeCelula.innerHTML = nome;
    var bebidaCelula = novaLinha.insertCell();
    bebidaCelula.innerHTML = bebida;
    var quantidadeCelula = novaLinha.insertCell();
    quantidadeCelula.innerHTML = numero;
  } else if (naipe === "ouros") {
    var tabela = document.getElementById("tabela-ouros");
    var tbody = tabela.getElementsByTagName("tbody")[0];
    var novaLinha = tbody.insertRow();
    var nomeCelula = novaLinha.insertCell();
    nomeCelula.innerHTML = nome;
    var bebidaCelula = novaLinha.insertCell();
    bebidaCelula.innerHTML = bebida;
    var quantidadeCelula = novaLinha.insertCell();
    quantidadeCelula.innerHTML = numero;
  }
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
