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

function preencherGridClientes() {
    fetch("http://localhost:8080/clientes/")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao obter clientes: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Limpar o grid antes de adicionar os clientes
            document.getElementById("clientes-grid").innerHTML = "";

            // Iterar sobre cada cliente e adicionar um card ao grid
            data.forEach(cliente => {
                var card = `
                    <div class="cliente-card" id="cliente-${cliente.idCliente}" onclick="selecionarCliente('${cliente.idCliente}')">
                        <img src="${cliente.foto}" alt="${cliente.nomeCliente}">
                        <p>${cliente.nomeCliente}</p>
                    </div>
                `;
                document.getElementById("clientes-grid").innerHTML += card;
            });
        })
        .catch(error => {
            console.error(error);
        });
}

// Função para selecionar um cliente
function selecionarCliente(idCliente) {
    // Remover a classe 'selected-item' de todos os clientes
    document.querySelectorAll('.cliente-card').forEach(card => {
        card.classList.remove('selected-card');
    });
    
    // Adicionar a classe 'selected-item' apenas ao cliente clicado
    document.getElementById(`cliente-${idCliente}`).classList.add('selected-card');
    
    // Implemente o que desejar ao selecionar um cliente
    console.log("Cliente selecionado:", idCliente);
}

// Chamar a função para preencher o grid de clientes quando a página carregar
document.addEventListener("DOMContentLoaded", preencherGridClientes);

//=====================================================================================


function preencherGridColaboradores() {
    fetch("http://localhost:8080/colaboradores/")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao obter colaboradores: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Limpar o grid antes de adicionar os Collabs
            document.getElementById("colaboradores-grid").innerHTML = "";

            // Iterar sobre cada Collab e adicionar um card ao grid
            data.forEach(Collab => {
                var card = `
                    <div class="colaborador-card" id="colaborador-${Collab.idCollabUuid}" onclick="selecionarColaborador('${Collab.idCollabUuid}')">
                        <img src="${Collab.foto}" alt="${Collab.nomeCollab}">
                        <p>${Collab.nomeCollab}</p>
                    </div>
                `;
                document.getElementById("colaboradores-grid").innerHTML += card;
            });
        })
        .catch(error => {
            console.error(error);
        });
}

// Função para selecionar um colaborador
function selecionarColaborador(idCollabUuid) {
    // Remover a classe 'selected-card' de todos os colaboradores
    document.querySelectorAll('.colaborador-card').forEach(card => {
        card.classList.remove('selected-card');
    });
    
    // Adicionar a classe 'selected-card' apenas ao colaborador clicado
    document.getElementById(`colaborador-${idCollabUuid}`).classList.add('selected-card');
    
    // Implemente o que desejar ao selecionar um colaborador
    console.log("Colaborador selecionado:", idCollabUuid);
}

// Chamar a função para preencher o grid de colaboradores quando a página carregar
document.addEventListener("DOMContentLoaded", preencherGridColaboradores);


        
function preencherServicos() {
    fetch("http://localhost:8080/servicos/")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao obter serviços: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            const servicosContainer = document.getElementById("servicos");
            servicosContainer.innerHTML = ""; // Limpar o conteúdo anterior

            data.forEach(servico => {
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = `servico-${servico.idServico}`; // Defina um ID único para cada checkbox
                checkbox.value = servico.nomeServico; // Valor do checkbox é o ID do serviço
                const label = document.createElement("label");
                label.htmlFor = `servico-${servico.idServico}`;
                label.textContent = servico.nomeServico; // Use o nome do serviço como texto do label

                servicosContainer.appendChild(checkbox);
                servicosContainer.appendChild(label);
                servicosContainer.appendChild(document.createElement("br")); // Adicione uma quebra de linha
            });
        })
        .catch(error => {
            console.error(error);
        });
}

// Chame a função para preencher os serviços quando a página carregar
document.addEventListener("DOMContentLoaded", preencherServicos);


function calcularTotal(servicosSelecionados) {
    let total = 0;

    // Iterar sobre os serviços selecionados e somar seus preços
    servicosSelecionados.forEach(servico => {
        // Suponha que cada serviço tenha um atributo 'preco' que represente seu custo
        total += parseFloat(servico.preco);
    });

    return total;
}



f// Função para processar a escolha entre agendar ou fazer agora
function processarEscolha() {
    const escolha = document.querySelector('input[name="escolha"]:checked').value;

    if (escolha === "fazerAgora") {
        // Capturar o horário de abertura do serviço
        const horarioAbertura = new Date().toLocaleTimeString();

        // Coletar informações dos passos anteriores
        const cliente = document.getElementById("clienteSelecionado").innerText; // Suponha que haja um elemento com ID "clienteSelecionado" que mostra o nome do cliente selecionado
        const servicos = obterServicosSelecionados(); // Implemente a função obterServicosSelecionados() para retornar os serviços selecionados
        const profissional = document.getElementById("profissionalSelecionado").innerText; // Suponha que haja um elemento com ID "profissionalSelecionado" que mostra o nome do profissional selecionado

        // Construir objeto com os dados da comanda
        const comanda = {
            cliente: cliente,
            servicos: servicos,
            profissional: profissional,
            status: "Em andamento", // Defina o status inicial da comanda
            total: calcularTotal(servicos), // Implemente a função calcularTotal() para calcular o total com base nos serviços selecionados
            dataInicio: horarioAbertura // Adicione o horário de abertura do serviço à comanda
        };

        // Enviar a comanda para o backend
        enviarComanda(comanda);
    } else if (escolha === "agendar") {
        // Implemente a lógica para lidar com o agendamento
    }
}

// Função para enviar a comanda para o backend
function enviarComanda(comanda) {
    fetch("http://localhost:8080/comandas/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comanda)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao enviar comanda: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        // Lógica após o envio bem-sucedido da comanda
        console.log("Comanda enviada com sucesso:", data);
        // Limpar o container ou executar outras ações, se necessário
    })
    .catch(error => {
        console.error(error);
        // Lógica de tratamento de erro, se necessário
    });
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