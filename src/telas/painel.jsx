function toggleProfileOptions() {
    var profileOptions = document.getElementById("profileOptions");
    if (profileOptions.style.display === "none") {
        profileOptions.style.display = "block";
    } else {
        profileOptions.style.display = "none";
    }
}

function toggleNavbar() {
    var navbar = document.getElementById("navbar");
    var overlay = document.getElementById("overlay");
    if (navbar.style.left === "-200px") {
        navbar.style.left = "0";
        overlay.style.display = "block";
    } else {
        navbar.style.left = "-200px";
        overlay.style.display = "none";
    }
}

/* Função para fechar a navbar */
function closeNavbar() {
    var navbar = document.getElementById("navbar");
    var overlay = document.getElementById("overlay");
    navbar.style.left = "-200px";
    overlay.style.display = "none";
}