

// Capturando o formulário
const formulario = document.querySelector('#formulario');

// Capturando os campos do formulário
const nome = formulario.querySelector('#nome');
const naipe = formulario.querySelector('#naipe');
const valor = formulario.querySelector('#valor');

// Adicionando o evento de submit ao formulário
formulario.addEventListener('submit', (event) => {
  // Prevenindo o comportamento padrão do formulário de ser submetido
  event.preventDefault();

  // Verificando qual é o naipe selecionado
  switch (naipe.value) {
    case 'copas':
      // Adicionando os dados na tabela de copas
      const tabelaCopas = document.querySelector('#tabela-copas tbody');
      tabelaCopas.innerHTML += `
        <tr>
          <td>${nome.value}</td>
          <td>${valor.value}</td>
        </tr>
      `;
      break;
    case 'espadas':
      // Adicionando os dados na tabela de espadas
      const tabelaEspadas = document.querySelector('#tabela-espadas tbody');
      tabelaEspadas.innerHTML += `
        <tr>
          <td>${nome.value}</td>
          <td>${valor.value}</td>
        </tr>
      `;
      break;
    case 'ouros':
      // Adicionando os dados na tabela de ouros
      const tabelaOuros = document.querySelector('#tabela-ouros tbody');
      tabelaOuros.innerHTML += `
        <tr>
          <td>${nome.value}</td>
          <td>${valor.value}</td>
        </tr>
      `;
      break;
    case 'paus':
      // Adicionando os dados na tabela de paus
      const tabelaPaus = document.querySelector('#tabela-paus tbody');
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
});



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
