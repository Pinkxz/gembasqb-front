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
