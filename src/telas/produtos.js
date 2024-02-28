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

  function adicionarProduto() {
    var nome = document.getElementById("nomeServico").value;
    var descricao = document.getElementById("descricao").value;
    var preco = document.getElementById("preco").value;
    var categoria = document.getElementById("categoria").value;
    var status = document.getElementById("status").value;
    var foto = document.getElementById("foto").value;

    var novoProduto = {
        nome: nome,
        descricao: descricao,
        preco: preco,
        categoria: categoria,
        status: status,
        foto: foto
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
  