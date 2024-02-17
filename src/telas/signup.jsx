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
     // document.getElementById('nameError').innerHTML = "Por favor, informe seu nome";
     // mostrarPopup("Por favor, informe seu nome"); // Chamando a função mostrarPopup quando há erro no nome
      alert("Por favor, informe seu nome");
      return;
  } else {
      document.getElementById('nameError').innerHTML = "";
  }

  // Verificação de e-mail
  var emailError = document.getElementById('emailError');
  emailError.innerHTML = "";
  if (!email.includes('@') || email.split('@')[0].length === 0) {
   //   emailError.innerHTML = "Email inválido";
    //  mostrarPopup("E-Mail inválido"); // Chamando a função mostrarPopup quando há erro no email
      alert("E-Mail inválido");
      return;
  }

  // Verificação de senha
  var passwordError = document.getElementById('passwordError');
  passwordError.innerHTML = "";
  if (password.length < 8 || !password.match(/(?=.*[A-Z])(?=.*\d)/)) {
    //  passwordError.innerHTML = "A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula e 1 número";
   //   mostrarPopup("A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula e 1 número"); // Chamando a função mostrarPopup quando há erro na senha
      alert("A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula e 1 número");
      return;
  }

  // Verificação de confirmação de senha
  var confirmError = document.getElementById('confirmError');
  confirmError.innerHTML = "";
  if (password !== confirmPassword) {
     // confirmError.innerHTML = "As senhas não correspondem";
      //mostrarPopup("As senhas não correspondem"); // Chamando a função mostrarPopup quando há erro na confirmação de senha
      alert("As senhas não correspondem");
      return;
  }

  // Verificação de número
  if (!number.trim()) {
     // document.getElementById('numberError').innerHTML = "Por favor, informe seu número de telefone";
     // mostrarPopup("Por favor, informe seu número"); // Chamando a função mostrarPopup quando há erro no número
      alert("Por favor, informe seu número");
      return;
  } else {
     // document.getElementById('numberError').innerHTML = "";
  }

  // Outras verificações ou envio do formulário
  document.getElementById('registrationForm').submit();
}

function mostrarPopup(mensagem) {
  document.getElementById('error-popup-message').textContent = mensagem;
  document.getElementById('error-popup').style.display = 'block';
}

function fecharPopup() {
  document.getElementById('error-popup').style.display = 'none';
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
