// Função para abrir a modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Função para fechar a modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Função para adicionar um novo item
function adicionarItem() {
    var container = document.getElementById("serviceContainer");
    var item = document.createElement("div");
    item.classList.add("item");

    // Nome do Serviço
    var nomeServico = document.createElement("span");
    nomeServico.textContent = document.getElementById("nomeServico").value;
    nomeServico.style.flexBasis = "20%";
    item.appendChild(nomeServico);

    // Categoria
    var categoria = document.createElement("span");
    categoria.textContent = document.getElementById("categoria").value;
    categoria.style.flexBasis = "15%";
    item.appendChild(categoria);

    // Preço
    var preco = document.createElement("span");
    preco.textContent = document.getElementById("preco").value;
    preco.style.flexBasis = "15%";
    item.appendChild(preco);

    // Tempo
    var tempo = document.createElement("span");
    tempo.textContent = document.getElementById("tempo").value;
    tempo.style.flexBasis = "15%";
    item.appendChild(tempo);

    // Status
    var status = document.createElement("span");
    status.textContent = document.getElementById("status").value;
    status.style.flexBasis = "15%";
    item.appendChild(status);

    // Descrição (não mostrado no container)
    var descricao = document.createElement("span");
    descricao.textContent = document.getElementById("descricao").value;
    descricao.style.display = "none"; // Não mostrado no container
    item.appendChild(descricao);

    // Foto (não mostrado no container)
    var foto = document.createElement("span");
    foto.textContent = document.getElementById("foto").value;
    foto.style.display = "none"; // Não mostrado no container
    item.appendChild(foto);

    // Comissão (não mostrado no container)
    var comissao = document.createElement("span");
    comissao.textContent = document.getElementById("comissao").value;
    comissao.style.display = "none"; // Não mostrado no container
    item.appendChild(comissao);

    // Programa de Fidelidade (não mostrado no container)
    var programaFidelidade = document.createElement("span");
    programaFidelidade.textContent = document.getElementById("programaFidelidade").value;
    programaFidelidade.style.display = "none"; // Não mostrado no container
    item.appendChild(programaFidelidade);

    // Botão de Deletar
    var deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Deletar";
    deleteBtn.onclick = function() {
        container.removeChild(item);
    };
    deleteBtn.style.flexBasis = "5%";
    item.appendChild(deleteBtn);

    container.appendChild(item);
    closeModal(); // Fecha a modal após adicionar o item

    // Verifica se a altura do contêiner excede a altura máxima e ativa a barra de rolagem
    if (container.scrollHeight > container.clientHeight) {
        container.style.overflowY = "scroll";
    }
}

function toggleProfileOptions() {
    var profileOptions = document.getElementById("profileOptions");
    if (profileOptions.style.display === "none") {
        profileOptions.style.display = "block";
    } else {
        profileOptions.style.display = "none";
    }
  }
  