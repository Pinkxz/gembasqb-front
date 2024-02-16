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

        // Restaurar horário de abertura
        var horaAbertura = localStorage.getItem("horaAbertura");
        document.getElementById("abertura").innerText = "Aberto em: " + horaAbertura;
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
    localStorage.setItem("caixaAberto", "true");
    localStorage.setItem("horaAbertura", now.toLocaleDateString() + " " + time); // Salvar horário de abertura
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