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
  
  // Função para gerar senha aleatória
function generateRandomPassword() {
    var length = 8;
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@";
    var password = "";
    for (var i = 0; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

window.onload = function() {
    fetch('http://localhost:8080/colaboradores/')
        .then(response => response.json())
        .then(data => {
            data.forEach(colaborador => {
                exibirColaborador(colaborador);
            });
        });
}

function exibirColaborador(colaborador) {
    var container = document.getElementById("serviceContainer");
    var item = document.createElement("div");
    item.classList.add("item");
    var colaboradorId = colaborador.id; // Obter o ID do colaborador
    item.dataset.id = colaboradorId; // Definindo o ID do colaborador como atributo de dados

    item.innerHTML = `
        <span>${colaborador.nomeCollab}</span>
        <span>${colaborador.emailCollab}</span>
       
        <span>${colaborador.statusCollab}</span>
        <button onclick="deletarColaborador('${colaborador.idCollabUuid}')">Deletar</button>
    `;
    container.appendChild(item);
}

function adicionarColaborador() {
    var nome = document.getElementById("nomeCollab").value;
    var email = document.getElementById("descricao").value;
    var dataCadastro = document.getElementById("dataC").value
    var cpf = document.getElementById("cpf").value;
    var whatsapp = document.getElementById("Whatsapp").value;
    var status = document.getElementById("status").value;
    var dataPagamento = document.getElementById("periodoPag").value;
    var foto = document.getElementById("foto").value;

    var novoColaborador = {
        nomeCollab: nome,
        emailCollab: email,
        dataCadastro: dataCadastro,
        cpfcnpj: cpf,
        whatsapp: whatsapp,
        statusCollab: status,
        dataPagamento: dataPagamento,
        foto: foto
    };

    fetch('http://localhost:8080/colaboradores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoColaborador)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar colaborador.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Colaborador adicionado com sucesso:', data);
        // Aqui você pode adicionar lógica adicional, se necessário
        closeModal(); // Fecha a modal após adicionar o item
    })
    .catch(error => {
        console.error('Erro ao adicionar colaborador:', error);
    });
}

function deletarColaborador(idCollabUuid) {
    
    if (confirm("Tem certeza que deseja deletar este colaborador?")) {
        fetch(`http://localhost:8080/colaboradores/${idCollabUuid}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao deletar colaborador.');
            }
            return response.text();
        })
        .then(data => {
            console.log('Colaborador deletado com sucesso:', data);
            // Aqui você pode adicionar lógica adicional, se necessário
            // Por exemplo, remover o colaborador da interface após a exclusão
            var colaboradorElement = document.querySelector(`.item[data-id="${idCollabUuid}"]`);
            if (colaboradorElement) {
                console.log('Colaborador deletado com sucesso:', data);
                colaboradorElement.remove();
            }
        })
        .catch(error => {
            console.error('Erro ao deletar colaborador:', error);
        });
    }
}
