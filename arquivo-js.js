function enviarFormulario() {
  // Obtenha os dados do formulário
  const nome = document.getElementById("nome").value;
  const naipe = document.querySelector(".naipe-botao.active").getAttribute("data-naipe");
  const numero = document.getElementById("numero").value;
  const bebida = document.getElementById("bebida").value;

  // Crie um objeto XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Configure a solicitação da API
  xhr.open("POST", "https://api.openai.com/v1/completions");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer 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");

  // Crie o corpo da solicitação com os dados do formulário
  const requestBody = {
    prompt: `${nome} pediu uma carta de ${numero} de ${naipe} e uma ${bebida}.`,
    max_tokens: 5
  };

  // Envie a solicitação da API
  xhr.send(JSON.stringify(requestBody));
}
xhr.onload = function() {
  // Manipule a resposta da API
  const response = JSON.parse(xhr.responseText);
  const texto = response.choices[0].text;

  // Exiba o texto no site
  const resultado = document.createElement("p");
  resultado.textContent = texto;
  document.body.appendChild(resultado);
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
