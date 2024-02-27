// signup.js

//verificações de cadastro
function validateForm() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm-password').value;
  var number = document.getElementById('number').value;


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

function validateStep2() {
  var companyName = document.getElementById('companyName').value;
  var negocio = document.getElementById('negocio').value;
  var cep = document.getElementById('cep').value;
  var rua = document.getElementById('rua').value;
  var estado = document.getElementById('estado').value;
  var cidade = document.getElementById('cidade').value;
  var bairro = document.getElementById('bairro').value;
  var numero = document.getElementById('numero').value;
  var tamanhoEmpresaSelecionado = document.getElementById('tamanhoEmpresaSelecionado').value;


  // Verificação do nome da empresa
  if (!companyName.trim()) {
    alert("Por favor, informe o nome da empresa");
    return false;
  }

  // Verificação do tipo de negócio
  if (!negocio.trim()) {
    alert("Por favor, informe o tipo de negócio");
    return false;
  }

  // Verificação do CEP
  if (!cep.trim()) {
    alert("Por favor, informe o CEP");
    return false;
  }

  // Verificação da rua
  if (!rua.trim()) {
    alert("Por favor, informe a rua");
    return false;
  }

  // Verificação do estado
  if (!estado.trim()) {
    alert("Por favor, informe o estado");
    return false;
  }

  // Verificação da cidade
  if (!cidade.trim()) {
    alert("Por favor, informe a cidade");
    return false;
  }

  // Verificação do bairro
  if (!bairro.trim()) {
    alert("Por favor, informe o bairro");
    return false;
  }

  // Verificação do número
  if (!numero.trim()) {
    alert("Por favor, informe o número");
    return false;
  }

  // Verificação do tamanho da empresa
  if (!tamanhoEmpresaSelecionado) {
    alert("Por favor, selecione o tamanho da empresa");
    return false;
  }

  // Se todas as validações passarem, retorna true
  return true;
}

/*
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
} */

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

    // Armazena o tamanho da empresa selecionado no campo oculto
    var tamanhoEmpresaSelecionado = document.getElementById('tamanhoEmpresaSelecionado');
    tamanhoEmpresaSelecionado.value = card.dataset.size;
  
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

function validateHours() {
  var days = ["segunda", "terça", "quarta", "quinta", "sexta", "sabádo", "domingo"];
  var isValid = true;

  days.forEach(function(day) {
    var checkbox = document.getElementById(day);
    var startInput = document.getElementById(day + '-inicio');
    var endInput = document.getElementById(day + '-fim');

    if (checkbox.checked && (!startInput.value || !endInput.value)) {
      isValid = false;
      alert("Por favor, preencha os horários de início e término para " + day.charAt(0).toUpperCase() + day.slice(1) + ".");
      return;
    }
  });

  if (isValid == false) {
    nextStep();
    mostrarDados();
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
  var tipoEmpresaSelecionado = document.querySelector('.dashboard-card.selected')?.dataset.size;

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
  document.getElementById('tamanho-empresa-resultado').value = tamanhoEmpresaSelecionado;
}




function cadastrar() {
  if (validateForm() && validateStep2()) {
    // Chama a função para cadastrar usuário
    cadastrarUsuario();
    // Chama a função para cadastrar empresa
    cadastrarEmpresa();
  }
}


function cadastrarUsuario() {
  // Recupera os dados do formulário de cadastro de usuário
  var nome = document.getElementById('name').value;
  var telefone = document.getElementById('number').value;
  var email = document.getElementById('email').value;
  var senha = document.getElementById('password').value;

  // Monta o objeto com os dados a serem enviados
  var dados = {
    nome: nome,
    numero: telefone,
    email: email,
    password: senha
  };

  // Envia os dados para o backend via requisição HTTP POST
  fetch('http://localhost:8080/users',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao cadastrar os dados do usuário');
    }
    return response.json();
  })
  .then(data => {
    // Trata a resposta do backend (opcional)
    console.log('Dados do usuário cadastrados com sucesso:', data);
    // Aqui você pode redirecionar o usuário para outra página, exibir uma mensagem de sucesso, etc.
  })
  .catch(error => {
    console.error('Erro ao cadastrar os dados do usuário:', error);
    // Aqui você pode exibir uma mensagem de erro para o usuário, por exemplo
  });
}

function cadastrarEmpresa() {
  // Recupera os dados do formulário de cadastro de empresa
  var nomeEmpresa = document.getElementById('companyName').value;
  var tipoNegocio = document.getElementById('negocio').value;
  var cep = document.getElementById('cep').value;
  var rua = document.getElementById('rua').value;
  var estado = document.getElementById('estado').value;
  var cidade = document.getElementById('cidade').value;
  var bairro = document.getElementById('bairro').value;
  var numero = document.getElementById('numero').value;
  var tamanhoEmpresa = document.getElementById('tamanhoEmpresaSelecionado').value;

  // Monta o objeto com os dados a serem enviados
  var dados = {
    compNome: nomeEmpresa,
    tipoNegocio: tipoNegocio,
    cep: cep,
    rua: rua,
    estado: estado,
    cidade: cidade,
    bairro: bairro,
    numeroEnd: numero,
    tamanhoEmpresa: tamanhoEmpresa
  };

  // Envia os dados para o backend via requisição HTTP POST
  fetch('http://localhost:8080/companys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao cadastrar os dados da empresa');
    }
    return response.json();
  })
  .then(data => {
    // Trata a resposta do backend (opcional)
    console.log('Dados da empresa cadastrados com sucesso:', data);
    // Aqui você pode redirecionar o usuário para outra página, exibir uma mensagem de sucesso, etc.
  })
  .catch(error => {
    console.error('Erro ao cadastrar os dados da empresa:', error);
    // Aqui você pode exibir uma mensagem de erro para o usuário, por exemplo
  });
}