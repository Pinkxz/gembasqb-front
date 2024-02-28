// Função para abrir a modal
    function openModal() {
        document.getElementById("myModal").style.display = "block";
    }

    // Função para fechar a modal
    function closeModal() {
        document.getElementById("myModal").style.display = "none";
    }

function createSpan(text) {
    var span = document.createElement("span");
    span.textContent = text;
    span.style.flexBasis = "15%";
    return span;
}

  window.onload = function() {
    fetch('http://localhost:8080/servicos/')
        .then(response => response.json())
        .then(data => {
            data.forEach(servico => {
                exibirServico(servico);
            });
        });
}

function exibirServico(servico) {
    var container = document.getElementById("serviceContainer");
    var item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
        <span>${servico.nomeServico}</span>
        <span>${servico.categoria}</span>
        <span>${servico.preco}</span>
        <span>${servico.tempo}</span>
        <span>${servico.status}</span>
        <button onclick="deletarServico('${servico.id}')">Deletar</button>
    `;
    container.appendChild(item);
}


function adicionarServico() {
    var nomeServico = document.getElementById("nomeServico").value;
    var descricao = document.getElementById("descricao").value;
    var preco = document.getElementById("preco").value;
    var categoria = document.getElementById("categoria").value;
    var tempo = document.getElementById("tempo").value;
    var status = document.getElementById("status").value;
    var imagem = document.getElementById("imagem").value;
    var comissao = document.getElementById("comissao").value;
    var fidelidade = document.getElementById("fidelidade").value;

    var novoServico = {
        nomeServico: nomeServico,
        descricao: descricao,
        preco: preco,
        categoria: categoria,
        tempo: tempo,
        status: status,
        imagem: imagem,
        comissao: comissao,
        fidelidade: fidelidade
    };

    fetch('http://localhost:8080/servicos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoServico)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar serviço.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Serviço adicionado com sucesso:', data);
        // Aqui você pode adicionar lógica adicional, como atualizar a interface do usuário
        closeModal(); // Fecha a modal após adicionar o item
    })
    .catch(error => {
        console.error('Erro ao adicionar serviço:', error);
    });
}

// Call this function to delete a service by its ID
function deletarServico(id) {
    if (!id) {
        console.error('ID is undefined');
        return;
    }
    // Check if id is a valid UUID
    if (!isValidUUID(id)) {
        console.error('Invalid UUID');
        return;
    }

    // Log the ID value for debugging
    console.log('Deleting service with ID:', id);

    // Make the fetch request to delete the service
    fetch(`http://localhost:8080/servicos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            var container = document.getElementById("serviceContainer");
            var item = document.getElementById(`servico-${id}`);
            container.removeChild(item); // Remove o serviço da página
        } else {
            console.error('Erro ao deletar serviço.');
        }
    })
    .catch(error => {
        console.error('Erro ao deletar serviço:', error);
    });
}

// Function to check if a string is a valid UUID
function isValidUUID(uuid) {
    const uuidPattern = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    return uuidPattern.test(uuid);
}