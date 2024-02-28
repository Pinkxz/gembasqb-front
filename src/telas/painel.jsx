function toggleProfileOptions() {
    var profileOptions = document.getElementById("profileOptions");
    if (profileOptions.style.display === "none") {
        profileOptions.style.display = "block";
    } else {
        profileOptions.style.display = "none";
    }
}

//Funcao para salvar o caixa aberto na maquina
window.onload = function () {
    var caixaAberto = localStorage.getItem("caixaAberto");
    preencherGridClientes();

    if (caixaAberto === "true") {
        document.getElementById("caixaFechado").style.display = "none";
        document.getElementById("frenteCaixa").style.display = "block";
        document.getElementById("saldoBloco").style.display = "block"; // Exibir bloco de saldo

        // Atualizar valor do saldo com o valor inicial inserido ao abrir o caixa
        var valorInicial = localStorage.getItem("valorInicial");
        document.getElementById("saldoInicial").innerText = "R$" + valorInicial;
    }
}

//Popup para decidir se abrirá o caixa ou não
function openPopup(action) {
    // Verifica qual ação foi passada como parâmetro
    if (action === 'abrirCaixa') {
        // Exibe o popup para abrir o caixa
        document.getElementById("popup").style.display = "block";
    } else if (action === 'fecharCaixa') {
        // Exibe o popup para outra ação
        document.getElementById("popupFechar").style.display = "block";
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("popupFechar").style.display = "none";
}


//Salva o horario e o valor incial na maquina od usuario
function abrirCaixa() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var time = hours + ":" + (minutes < 10 ? "0" : "") + minutes;
    document.getElementById("abertura").innerText = "Aberto em: " + now.toLocaleDateString() + " " + time;
    document.getElementById("caixaFechado").style.display = "none";
    document.getElementById("frenteCaixa").style.display = "block";
    document.getElementById("saldoBloco").style.display = "block"; // Exibir bloco de saldo
    document.getElementById("serviceContainer").style.display = "block";
    var valorInicial = document.getElementById("valorInicial").value; // Obter o valor inicial inserido
    document.getElementById("saldoInicial").innerText = "R$" + valorInicial; // Atualizar valor do saldo
    localStorage.setItem("horaAbertura", now.toLocaleDateString() + " " + time); // Salvar horário de abertura
    localStorage.setItem("caixaAberto", "true");
    localStorage.setItem("valorInicial", valorInicial); // Salvar valor inicial no localStorage
    closePopup();
}

//Fechar o caixa(Ainda a adicionar)
function fecharCaixa() {
    document.getElementById("caixaFechado").style.display = "block";
    document.getElementById("frenteCaixa").style.display = "none";
    document.getElementById("serviceContainer").style.display = "none";
    document.getElementById("saldoBloco").style.display = "none";
    document.getElementById("popupFechar").style.display = "none";
    localStorage.removeItem("caixaAberto");
}
 


// Função para validar a etapa atual
function validateStep(step, isNext) {
  var isValid = false;
  var stepContent = document.getElementById('step' + step);
  
  switch(step) {
      case 1: // Etapa 1: Seleção de cliente
          var selectedClient = stepContent.querySelector('.selected-card');
          if (selectedClient) {
              isValid = true;
          } else {
              if (isNext) {
                  alert("Por favor, selecione um cliente antes de prosseguir.");
              }
          }
          break;
      case 2: // Etapa 2: Seleção de colaborador
          var selectedCollaborator = stepContent.querySelector('.selected-card');
          if (selectedCollaborator) {
              isValid = true;
          } else {
              if (isNext) {
                  alert("Por favor, selecione um colaborador antes de prosseguir.");
              }
          }
          break;
      case 3: // Etapa 3: Seleção de serviços
          var selectedServices = stepContent.querySelectorAll('input[type="checkbox"]:checked');
          if (selectedServices.length > 0) {
              isValid = true;
          } else {
              if (isNext) {
                  alert("Por favor, selecione pelo menos um serviço antes de prosseguir.");
              }
          }
          break;
      case 4: // Etapa 4: Agendamento ou serviço no momento
          var schedulingOption = stepContent.querySelector('input[type="radio"]:checked');
          if (schedulingOption) {
              isValid = true;
          } else {
              if (isNext) {
                  alert("Por favor, escolha entre agendar ou fazer no momento antes de prosseguir.");
              }
          }
          break;
      default:
          isValid = true;
          break;
  }
  
  return isValid;
}

  //Modal de adicionar comandas
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Função para fechar a modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
  showStep(1);
}

  // Função para avançar para a próxima etapa
  function nextStep() {
    var currentStep = getCurrentStep();
    
    // Valida a etapa atual antes de prosseguir
    var isValid = validateStep(currentStep, true);
    
    // Se a etapa atual for válida, avança para a próxima
    if (isValid) {
      var nextStep = currentStep + 1;
      showStep(nextStep);
    }
  }
  
  function prevStep() {
    var currentStep = getCurrentStep();
    
    // Verifica se a etapa atual é a primeira e fecha o modal se for
    if (currentStep == 1) {
        closeModal();
    } else {
        // Se a etapa atual não for a primeira, retrocede para a anterior
        var isValid = true; // Define isValid como true por padrão
        if (currentStep > 1) {
            isValid = validateStep(currentStep - 1, false); // Valida a etapa anterior
        }
        if (isValid) {
            var prevStep = currentStep - 1;
            showStep(prevStep);
        }
    }
}
  
  // Função para obter o número da etapa atual
  function getCurrentStep() {
    var steps = document.querySelectorAll('.step');
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].style.display !== 'none') {
        return i + 1;
      }
    }
    return 0;
  }
  
  // Função para exibir uma etapa específica
  function showStep(step) {
    var steps = document.querySelectorAll('.step');
    for (var i = 0; i < steps.length; i++) {
      steps[i].style.display = 'none';
    }
    document.getElementById('step' + step).style.display = 'block';
  }
  
/*========================================================================Funcionamento Front-End acima==================================================*/

function preencherClientesSelect() {
    var select = $("#clientesSelect");

    // Limpa o select antes de adicionar as opções
    select.empty();

    // Adiciona uma opção vazia (se necessário)
    $("<option>").text("Selecione um cliente").appendTo(select);

    // Faz uma solicitação AJAX para obter os clientes do servidor
    $.ajax({
        url: "/clientes",
        type: "GET",
        dataType: "json",
        success: function(clientes) {
            $.each(clientes, function(i, cliente) {
                $("<option>").val(cliente.id).text(cliente.nome).appendTo(select);
            });
        },
        error: function(xhr, status, error) {
            console.error("Erro ao obter clientes:", status, error);
        }
    });
}

// Função para obter clientes do banco de dados
function obterClientesDoBancoDeDados() {
    // Aqui você faria uma requisição para o backend para obter os clientes do banco de dados
    // Exemplo usando Fetch API
    return fetch('/api/clientes')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao obter clientes:', error);
            return []; // Retorna uma lista vazia em caso de erro
        });
}

// Função para obter colaboradores do banco de dados
function obterColaboradoresDoBancoDeDados() {
    // Aqui você faria uma requisição para o backend para obter os colaboradores do banco de dados
    // Exemplo usando Fetch API
    return fetch('/api/colaboradores')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao obter colaboradores:', error);
            return []; // Retorna uma lista vazia em caso de erro
        });
}

// Função para obter serviços do banco de dados
function obterServicosDoBancoDeDados() {
    // Aqui você faria uma requisição para o backend para obter os serviços do banco de dados
    // Exemplo usando Fetch API
    return fetch('/api/servicos')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao obter serviços:', error);
            return []; // Retorna uma lista vazia em caso de erro
        });
}

// Função para preencher o grid de clientes com os dados obtidos do banco de dados
async function preencherGridClientes() {
    var grid = document.getElementById('clientes-grid');
    var clientes = await obterClientesDoBancoDeDados();
    clientes.forEach(function(cliente) {
        // Restante do código para preencher o grid de clientes permanece o mesmo
    });
}

// Função para preencher o grid de colaboradores com os dados obtidos do banco de dados
async function preencherGridColaboradores() {
    var grid = document.getElementById('colaboradores-grid');
    var colaboradores = await obterColaboradoresDoBancoDeDados();
    colaboradores.forEach(function(colaborador) {
        // Restante do código para preencher o grid de colaboradores permanece o mesmo
    });
}

// Função para adicionar dinamicamente os serviços na terceira etapa do modal
async function addServices() {
    var servicosContainer = document.getElementById("servicos");

    // Limpa o conteúdo atual para evitar duplicatas
    servicosContainer.innerHTML = "";

    // Obtém os serviços do banco de dados
    var servicos = await obterServicosDoBancoDeDados();

    // Adiciona cada serviço ao contêiner de serviços
    servicos.forEach(function(service) {
        // Restante do código para adicionar os serviços permanece o mesmo
    });
}



/*
    // Adiciona cada serviço ao contêiner de serviços
    listaDeServicos.forEach(function(service) {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "servico";
        checkbox.value = service;
        
        var label = document.createElement("label");
        label.appendChild(document.createTextNode(service));

        var br = document.createElement("br");

        servicosContainer.appendChild(checkbox);
        servicosContainer.appendChild(label);
        servicosContainer.appendChild(br);
    });
}
*/
// Chamada da função para adicionar os serviços
addServices();

function processarEscolha() {
    var escolha = document.querySelector('input[name="escolha"]:checked').value;
    if (escolha === "fazerAgora") {
        abrirComanda();
    } else if (escolha === "agendar") {
        nextStep();
    }
}

    function abrirComanda(){
            // Extrair dados do cliente selecionado
            var clienteSelecionado = $("#step1 .selected-card").text().trim();
            
            // Extrair dados do colaborador selecionado
            var colaboradorSelecionado = $("#step2 .selected-card").text().trim();
            
            // Extrair serviços selecionados
            var servicosSelecionados = [];
            $("#step3 input[type='checkbox']:checked").each(function() {
                servicosSelecionados.push($(this).val());
            });
            
            // Verificar se é agendamento ou serviço no momento
            var opcaoSelecionada = $("input[name='escolha']:checked").val();
            
            // Criar objeto de comanda
            var comanda = {
                numero: Math.floor(Math.random() * 1000) + 1, // Número de comanda aleatório
                cliente: clienteSelecionado,
                servicos: servicosSelecionados,
                colaborador: colaboradorSelecionado,
                //data: dataSelecionada.toLocaleDateString(),
                //horario: horarioSelecionado,
                status: opcaoSelecionada === "fazerAgora" ? "Aberto" : "Concluído",
                total: calcularTotal(servicosSelecionados) // Função para calcular o total com base nos serviços selecionados
            };
            
            // Adicionar comanda ao container
            closeModal();
            adicionarComandaAoContainer(comanda);

    }


    function processarAgendamento() {
        var dataSelecionada = $("#datepicker").datepicker("getDate");
        var horarioSelecionado = $("#timepicker").val();
        
        if (dataSelecionada && horarioSelecionado) {
            // Extrair dados do cliente selecionado
            var clienteSelecionado = $("#step1 .selected-card").text().trim();
            
            // Extrair dados do colaborador selecionado
            var colaboradorSelecionado = $("#step2 .selected-card").text().trim();
            
            // Extrair serviços selecionados
            var servicosSelecionados = [];
            $("#step3 input[type='checkbox']:checked").each(function() {
                servicosSelecionados.push($(this).val());
            });
            
            // Verificar se é agendamento ou serviço no momento
            var opcaoSelecionada = $("input[name='escolha']:checked").val();
            
            // Criar objeto de comanda
            var comanda = {
                numero: Math.floor(Math.random() * 1000) + 1, // Número de comanda aleatório
                cliente: clienteSelecionado,
                servicos: servicosSelecionados,
                colaborador: colaboradorSelecionado,
                data: dataSelecionada.toLocaleDateString(),
                horario: horarioSelecionado,
                status: opcaoSelecionada === "agendar" ? "Agendado" : "Em andamento",
                total: calcularTotal(servicosSelecionados) // Função para calcular o total com base nos serviços selecionados
            };
            
            // Adicionar comanda ao container
            closeModal();
            adicionarComandaAoContainer(comanda);
            
            // Exibir mensagem de sucesso
            alert("Comanda agendada para: " + comanda.data + " às " + comanda.horario);
        } else {
            alert("Por favor, selecione uma data e um horário de agendamento.");
        }
    }
    
    // Função para calcular o total com base nos serviços selecionados
    function calcularTotal(servicosSelecionados) {
        // Lógica para calcular o total com base nos serviços selecionados
        return servicosSelecionados.length * 10; // Por exemplo, valor fixo de R$10 por serviço
    }
    

function adicionarComandaAoContainer(comanda) {
    var containerComandas = document.getElementById("serviceContainer");
    
    // Criar elementos HTML para a nova comanda
    var comandaElement = document.createElement("div");
    comandaElement.classList.add("comanda");
    
    var elementos = [
        comanda.numero,
        comanda.cliente,
        comanda.servicos.join(", "),
        comanda.colaborador,
        comanda.status,
        "R$" + comanda.total.toFixed(2) // Formata o total com duas casas decimais
    ];
    
    elementos.forEach(function(valor) {
        var span = document.createElement("span");
        span.textContent = valor;
        comandaElement.appendChild(span);
    });
    
    // Adicionar nova comanda ao container
    containerComandas.appendChild(comandaElement);
}