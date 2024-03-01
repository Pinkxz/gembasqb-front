// Função para abrir a modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Função para fechar a modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
} 

function toggleProfileOptions() {
    var profileOptions = document.getElementById("profileOptions");
    if (profileOptions.style.display === "none") {
        profileOptions.style.display = "block";
    } else {
        profileOptions.style.display = "none";
    }
  }
  
  window.onload = function() {
    fetch('http://localhost:8080/clientes/')
        .then(response => response.json())
        .then(data => {
            data.forEach(cliente => {
                exibirCliente(cliente);
            });
        
        });
}

function exibirCliente(cliente) {
    var container = document.getElementById("serviceContainer");
    var item = document.createElement("div");
    item.classList.add("item");
    item.dataset.id = cliente.idCliente; // Definindo o ID do cliente como atributo de dados

    item.innerHTML = `
        <span>${cliente.nomeCliente}</span>
        <span>${cliente.emailCliente}</span>
        <span>${cliente.dataCadastro}</span>
        <span>${cliente.statusCliente}</span>
        <button onclick="deletarCliente('${cliente.idCliente}')">Deletar</button>
        <button onclick="editarCliente('${cliente.idCliente}')">Editar</button>
    `;
    container.appendChild(item);
}



function adicionarCliente() {
    var nome = document.getElementById("nomeServico").value;
    var email = document.getElementById("email").value;
    var dataCadastro = document.getElementById("dataC").value;
    var cpf = document.getElementById("cpf").value;
    var numero= document.getElementById("Whatsapp").value;
    var status = document.getElementById("status").value;
    var foto = document.getElementById("foto").value;

    var novoCliente = {
        nomeCliente: nome,
        emailCliente: email,
        dataCadastro: dataCadastro,
        cpfcnpj: cpf,
        whatsapp: numero,
        statusCliente: status,
        foto: foto
    };

    fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoCliente)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar cliente.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Cliente adicionado com sucesso:', data);
        // Aqui você pode adicionar lógica adicional, se necessário
        closeModal(); // Fecha a modal após adicionar o item
    })
    .catch(error => {
        console.error('Erro ao adicionar cliente:', error);
    });
}


function deletarCliente(clienteId) {
    if (confirm("Tem certeza que deseja deletar este cliente?")) {
        fetch(`http://localhost:8080/clientes/${clienteId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao deletar cliente.');
            }
            return response.text();
        })
        .then(data => {
           // console.log('Cliente deletado com sucesso:', data);
            // Aqui você pode adicionar lógica adicional, se necessário
            // Por exemplo, remover o cliente da interface após a exclusão
            var clienteElement = document.querySelector(`.item[data-id="${clienteId}"]`);
            if (clienteElement) {
                console.log('Cliente deletado com sucesso:', data);
                clienteElement.remove();
            }
        })
        .catch(error => {
            console.error('Erro ao deletar cliente:', error);
        });
    }
}

function editarCliente(idCliente) {
    // Encontrar o colaborador na lista de colaboradores
    var cliente = document.querySelector(`.item[data-id="${idCliente}"]`);
    
    // Verificar se o colaborador foi encontrado
    if (colaborador) {
        // Preencher os campos do modal com os dados do colaborador
        var nomeCliente = colaborador.querySelector('span:nth-child(1)');
        var descricaoElement = colaborador.querySelector('span:nth-child(2)');
        var statusElement = colaborador.querySelector('span:nth-child(3)');
        var dataElement = colaborador.querySelector('span:nth-child(4)');
        var cpfElement = colaborador.querySelector('span:nth-child(5)');
        var whatsappElement = colaborador.querySelector('span:nth-child(6)');
        var periodoPagElement = colaborador.querySelector('span:nth-child(7)');
        var statusElement = colaborador.querySelector('span:nth-child(8)');
        var fotoElement = colaborador.querySelector('span:nth-child(9)');
        
        if (nomeCollabElement && descricaoElement && statusElement && dataElement && cpfElement && whatsappElement && periodoPagElement && statusElement && fotoElement) {
            document.getElementById("nomeCollab").value = nomeCollabElement.textContent;
            document.getElementById("descricao").value = descricaoElement.textContent;
            document.getElementById("status").value = statusElement.textContent;
            document.getElementById("dataC").value = dataElement.textContent;
            document.getElementById("cpf").value = cpfElement.textContent;
            document.getElementById("Whatsapp").value = whatsappElement.textContent;
            document.getElementById("periodoPag").value = periodoPagElement.textContent;
            document.getElementById("status").value = statusElement.textContent;
            document.getElementById("foto").value = fotoElement.textContent;

            // Alterar o texto do botão para "Salvar" em vez de "Adicionar"
            document.querySelector(".button button").innerText = "Salvar";

            // Adicionar um evento de clique diferente ao botão para chamar a função de atualização
            document.querySelector(".button button").onclick = function() {
                atualizarColaborador(idCollabUuid);
            };

            // Exibir o modal de edição
            openModal();
        } else {
            console.error('Um ou mais elementos não foram encontrados dentro do colaborador.');
        }
    } else {
        console.error('Colaborador não encontrado.');
    }
}



function atualizarColaborador(idCollabUuid) {
    var nome = document.getElementById("nomeCollab").value;
    var email = document.getElementById("descricao").value;
    var status = document.getElementById("status").value;

    var dadosAtualizados = {
        nomeCollab: nome,
        emailCollab: email,
        statusCollab: status
    };

    fetch(`http://localhost:8080/colaboradores/${idCollabUuid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAtualizados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar colaborador.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Colaborador atualizado com sucesso:', data);
        // Aqui você pode adicionar lógica adicional, se necessário
        closeModal(); // Fecha o modal após atualizar o colaborador
    })
    .catch(error => {
        console.error('Erro ao atualizar colaborador:', error);
    });
}
