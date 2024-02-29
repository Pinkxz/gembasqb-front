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

function toggleProfileOptions() {
    var profileOptions = document.getElementById("profileOptions");
    if (profileOptions.style.display === "none") {
        profileOptions.style.display = "block";
    } else {
        profileOptions.style.display = "none";
    }
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
        <button onclick="deletarServico('${servico.idServico}')">Deletar</button>
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
function deletarServico(servicoId) {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
        fetch(`http://localhost:8080/servicos/${servicoId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao deletar servico.');
            }
            return response.text();
        })
        .then(data => {
            console.log('servico deletado com sucesso:', data);
            // Aqui você pode adicionar lógica adicional, se necessário
            // Por exemplo, remover o servico da interface após a exclusão
            var servicoElement = document.querySelector(`.item[data-id="${servicoId}"]`);
            if (servicoElement) {
                console.log('servico deletado com sucesso:', data);
                servicoElement.remove();
            }
        })
        .catch(error => {
            console.error('Erro ao deletar servico:', error);
        });
    }
}
