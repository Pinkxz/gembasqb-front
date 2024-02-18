// signup.js

//verificações de cadastro
function validateForm() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm-password').value;
  var number = document.getElementById('number').value;

  // Verificação de nome
  if (!name.trim()) {
    alert("Por favor, informe seu nome");
    return false;
  }

  // Verificação de e-mail
  if (!email.includes('@') || email.split('@')[0].length === 0) {
    alert("E-Mail inválido");
    return false;
  }

  // Verificação de senha
  if (password.length < 8 || !password.match(/(?=.*[A-Z])(?=.*\d)/)) {
    alert("A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula e 1 número");
    return false;
  }

  // Verificação de confirmação de senha
  if (password !== confirmPassword) {
    alert("As senhas não correspondem");
    return false;
  }

  // Verificação de número
  if (!number.trim()) {
    alert("Por favor, informe seu número");
    return false;
  }

  // Se todas as validações passarem, retorna true
  return true;
}

function formatPhoneNumber(input) {
    // Remove todos os caracteres não numéricos do número
    var phoneNumber = input.value.replace(/\D/g, '');
  
    // Formatação do número de telefone
    var formattedPhoneNumber = '';
  
    if (phoneNumber.length >= 2) {
      formattedPhoneNumber += '(' + phoneNumber.substring(0, 2) + ')';
    }
  
    if (phoneNumber.length > 2 && phoneNumber.length <= 10) {
      formattedPhoneNumber += ' ' + phoneNumber.substring(2, 7);
    } else if (phoneNumber.length > 10) {
      formattedPhoneNumber += ' ' + phoneNumber.substring(2, 3) + ' ' +
                             phoneNumber.substring(3, 7) + '-' +
                             phoneNumber.substring(7);
    }
  
    // Atualiza o valor do campo de entrada com o número formatado
    input.value = formattedPhoneNumber;
}

let currentStep = 1;

function nextStep() {
  if (currentStep < 4) {
    document.getElementById(`step${currentStep}`).style.display = 'none';
    currentStep++;
    document.getElementById(`step${currentStep}`).style.display = 'block';
  }
}

function prevStep() {
  if (currentStep > 1) {
    document.getElementById(`step${currentStep}`).style.display = 'none';
    currentStep--;
    document.getElementById(`step${currentStep}`).style.display = 'block';
  }
}

function selectCard(card) {
  // Remove a classe de todos os cards
  var cards = document.querySelectorAll('.dashboard-card');
  cards.forEach(function(card) {
    card.classList.remove('selected-card');
  });

  // Adiciona a classe apenas ao card clicado
  card.classList.add('selected-card');
}

function toggleHours(day) {
  var checkbox = document.getElementById(day);
  var hoursDiv = document.getElementById(day + '-hours');

  if (checkbox.checked) {
    hoursDiv.style.display = 'block';
  } else {
    hoursDiv.style.display = 'none';
  }
}

function preencherEnderecoPorCEP() {
  var cep = document.getElementById('cep').value;
  // Remover caracteres não numéricos do CEP
  cep = cep.replace(/\D/g, '');
  
  if (cep.length != 8) {
    alert("CEP inválido. Por favor, insira um CEP válido.");
    return;
  }

  var url = 'https://viacep.com.br/ws/' + cep + '/json/';

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var endereco = JSON.parse(xhr.responseText);
        document.getElementById('rua').value = endereco.logradouro;
        document.getElementById('estado').value = endereco.uf;
        document.getElementById('cidade').value = endereco.localidade;
        document.getElementById('bairro').value = endereco.bairro;
      } else {
        alert("Não foi possível obter o endereço para este CEP. Por favor, verifique o CEP e tente novamente.");
      }
    }
  };

  xhr.open('GET', url);
  xhr.send();
}

function mostrarDados() {
  // Passo 1
  var nome = document.getElementById('name').value;
  var telefone = document.getElementById('number').value;
  var email = document.getElementById('email').value;

  // Passo 2
  var nomeEmpresa = document.getElementById('companyName').value;
  var tipoNegocio = document.getElementById('negocio').value;
  var cep = document.getElementById('cep').value;
  var rua = document.getElementById('rua').value;
  var estado = document.getElementById('estado').value;
  var cidade = document.getElementById('cidade').value;
  var bairro = document.getElementById('bairro').value;
  var numero = document.getElementById('numero').value;

  // Exibir os dados na etapa 4
  document.getElementById('nome-resultado').value = nome;
  document.getElementById('telefone-resultado').value = telefone;
  document.getElementById('email-resultado').value = email;
  document.getElementById('nome-empresa-resultado').value = nomeEmpresa;
  document.getElementById('tipo-negocio-resultado').value = tipoNegocio;
  document.getElementById('cep-resultado').value = cep;
  document.getElementById('rua-resultado').value = rua;
  document.getElementById('estado-resultado').value = estado;
  document.getElementById('cidade-resultado').value = cidade;
  document.getElementById('bairro-resultado').value = bairro;
  document.getElementById('numero-resultado').value = numero;
}