// Função para abrir a modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Função para fechar a modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

window.onload = function() {
    fetch('http://localhost:8080/produtos/')
        .then(response => response.json())
        .then(data => {
            data.forEach(produtos => {
                exibirProduto(produtos);
            });
        });
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
    fetch('http://localhost:8080/produtos/')
        .then(response => response.json())
        .then(data => {
            data.forEach(produto => {
                exibirProduto(produto);
            });
        });
}


  function exibirProduto(produto) {
    var container = document.getElementById("serviceContainer");
    var item = document.createElement("div");
    item.classList.add("item");
    item.dataset.id = produto.id; // Definindo o ID do produto como atributo de dados

    item.innerHTML = `
        <span>${produto.nomeProduto}</span>
        <span>${produto.categoriaProduto}</span>
        <span>${produto.precoProduto}</span>
        <span>${produto.statusProduto}</span>
        <button onclick="deletarProduto('${produto.idProduto}')">Deletar</button>
    `;
    container.appendChild(item);
}

  function adicionarProduto() {
    var nome = document.getElementById("nomeProduto").value;
    var descricao = document.getElementById("descricao").value;
    var preco = document.getElementById("preco").value;
    var peso = document.getElementById("peso").value
    var categoria = document.getElementById("categoria").value;
    var status = document.getElementById("status").value;
    var foto = document.getElementById("foto").value;

    var novoProduto = {
        nomeProduto: nome,
        descricaoProduto: descricao,
        precoProduto: preco,
        pesoProduto: peso,
        categoriaProduto: categoria,
        statusProduto: status,
        fotoProduto: foto
    };

    fetch('http://localhost:8080/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoProduto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar produto.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Produto adicionado com sucesso:', data);
        // Aqui você pode adicionar lógica adicional, se necessário
        closeModal(); // Fecha a modal após adicionar o item
    })
    .catch(error => {
        console.error('Erro ao adicionar produto:', error);
    });
}
  
function deletarProduto(produtoId) {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
        fetch(`http://localhost:8080/produtos/${produtoId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao deletar produto.');
            }
            return response.text();
        })
        .then(data => {
            console.log('produto deletado com sucesso:', data);
            // Aqui você pode adicionar lógica adicional, se necessário
            // Por exemplo, remover o produto da interface após a exclusão
            var produtoElement = document.querySelector(`.item[data-id="${produtoId}"]`);
            if (produtoElement) {
                console.log('produto deletado com sucesso:', data);
                produtoElement.remove();
            }
        })
        .catch(error => {
            console.error('Erro ao deletar produto:', error);
        });
    }
}
