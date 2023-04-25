// Capturando o formulário
const formulario = document.getElementById('formulario');

// Capturando os campos do formulário
const nome = document.getElementById('nome');
const naipe = document.getElementById('naipe');
const valor = document.getElementById('numero');

// Adicionando o evento de submit ao formulário
function EnviarFormulario() {
  // Prevenindo o comportamento padrão do formulário de ser submetido
  event.preventDefault();

  // Verificando qual é o naipe selecionado
  switch (naipe.value) {
    case 'copas':
      // Adicionando os dados na tabela de copas
      const tabelaCopas = document.getElementById('tabela-copas').querySelector('tbody');
      tabelaCopas.innerHTML += `
        <tr>
          <td>${nome.value}</td>
          <td>${valor.value}</td>
        </tr>
      `;
      break;
    case 'espadas':
      // Adicionando os dados na tabela de espadas
      const tabelaEspadas = document.getElementById('tabela-espadas').querySelector('tbody');
      tabelaEspadas.innerHTML += `
        <tr>
          <td>${nome.value}</td>
          <td>${valor.value}</td>
        </tr>
      `;
      break;
    case 'ouros':
      // Adicionando os dados na tabela de ouros
      const tabelaOuros = document.getElementById('tabela-ouros').querySelector('tbody');
      tabelaOuros.innerHTML += `
        <tr>
          <td>${nome.value}</td>
          <td>${valor.value}</td>
        </tr>
      `;
      break;
    case 'paus':
      // Adicionando os dados na tabela de paus
      const tabelaPaus = document.getElementById('tabela-paus').querySelector('tbody');
      tabelaPaus.innerHTML += `
        <tr>
          <td>${nome.value}</td>
          <td>${valor.value}</td>
        </tr>
      `;
      break;
    default:
      // Caso o naipe selecionado não seja válido, exibe um alerta
      alert('Naipe inválido!');
      break;
  }

  // Limpando os campos do formulário
  nome.value = '';
  naipe.value = '';
  valor.value = '';
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
