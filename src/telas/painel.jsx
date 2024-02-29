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

// Função para obter dados do banco de dados
async function obterDadosDoBancoDeDados(endpoint) {
    try {
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Erro ao obter dados ${endpoint}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erro ao obter ${endpoint}:`, error);
        return [];
    }
}

// Função para preencher o grid com os dados obtidos do banco de dados
async function preencherGrid(elementId, data) {
    var grid = document.getElementById(elementId);
    data.forEach(function(item) {
        var itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.id = `${elementId}-${item.id}`;
        var img = document.createElement('img');
        if (item.foto) {
            img.src = item.foto;
        } else {
            img.src = 'caminho/para/imagem-padrao.jpg';
        }
        img.alt = item.nome;
        var nomeItem = document.createElement('p');
        nomeItem.textContent = item.nome;
        itemDiv.appendChild(img);
        itemDiv.appendChild(nomeItem);
        itemDiv.onclick = function() {
            selecionarItem(item.id, elementId);
        };
        grid.appendChild(itemDiv);
    });
}

// Função para selecionar um item
function selecionarItem(id, elementId) {
    var items = document.querySelectorAll(`#${elementId} .item`);
    items.forEach(function(item) {
        item.classList.remove('selected-item');
    });
    var selectedItem = document.getElementById(`${elementId}-${id}`);
    if (selectedItem) {
        selectedItem.classList.add('selected-item');
    }
}

// Função para adicionar dinamicamente os serviços na terceira etapa do modal
async function addServices() {
    var servicosContainer = document.getElementById("servicos");
    servicosContainer.innerHTML = "";
    var servicos = await obterDadosDoBancoDeDados("servicos");
    servicos.forEach(function(service) {
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

// Função para inicializar a aplicação
async function inicializarApp() {
    await preencherGrid("clientes-grid", await obterDadosDoBancoDeDados("clientes"));
    await preencherGrid("colaboradores-grid", await obterDadosDoBancoDeDados("colaboradores"));
    await addServices();
}

// Chamada para inicializar a aplicação
inicializarApp();


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