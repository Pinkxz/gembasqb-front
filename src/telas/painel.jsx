function toggleProfileOptions() {
    var profileOptions = document.getElementById("profileOptions");
    if (profileOptions.style.display === "none") {
        profileOptions.style.display = "block";
    } else {
        profileOptions.style.display = "none";
    }
}

window.onload = function () {
    var caixaAberto = localStorage.getItem("caixaAberto");

    if (caixaAberto === "true") {
        document.getElementById("caixaFechado").style.display = "none";
        document.getElementById("frenteCaixa").style.display = "block";
        document.getElementById("saldoBloco").style.display = "block"; // Exibir bloco de saldo

        // Atualizar valor do saldo com o valor inicial inserido ao abrir o caixa
        var valorInicial = localStorage.getItem("valorInicial");
        document.getElementById("saldoInicial").innerText = "R$" + valorInicial;
    }
}

function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function abrirCaixa() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var time = hours + ":" + (minutes < 10 ? "0" : "") + minutes;
    document.getElementById("abertura").innerText = "Aberto em: " + now.toLocaleDateString() + " " + time;
    document.getElementById("caixaFechado").style.display = "none";
    document.getElementById("frenteCaixa").style.display = "block";
    document.getElementById("saldoBloco").style.display = "block"; // Exibir bloco de saldo
    var valorInicial = document.getElementById("valorInicial").value; // Obter o valor inicial inserido
    document.getElementById("saldoInicial").innerText = "R$" + valorInicial; // Atualizar valor do saldo
    localStorage.setItem("horaAbertura", now.toLocaleDateString() + " " + time); // Salvar horário de abertura
    localStorage.setItem("caixaAberto", "true");
    localStorage.setItem("valorInicial", valorInicial); // Salvar valor inicial no localStorage
    closePopup();
}


function fecharCaixa() {
    document.getElementById("caixaFechado").style.display = "block";
    document.getElementById("frenteCaixa").style.display = "none";
    localStorage.removeItem("caixaAberto");
}

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Função para fechar a modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

/*========================================================================Funcionamento Front-End acima==================================================*/

function preencherClientesSelect() {
    var select = $("#clientesSelect");

    // Limpa o select antes de adicionar as opções
    select.empty();

    // Adiciona uma opção vazia (se necessário)
    $("<option>").text("Selecione um cliente").appendTo(select);

    // Faz uma solicitação AJAX para obter os clientes do servidor
    $.ajax({
        url: "/clientes",
        type: "GET",
        dataType: "json",
        success: function(clientes) {
            $.each(clientes, function(i, cliente) {
                $("<option>").val(cliente.id).text(cliente.nome).appendTo(select);
            });
        },
        error: function(xhr, status, error) {
            console.error("Erro ao obter clientes:", status, error);
        }
    });
}