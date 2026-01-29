const PASSWORD = "shadow123";

window.onload = function () {
    if (localStorage.getItem("loggedIn") === "true") {
        showApp();
    }
};

function checkLogin() {
    const input = document.getElementById("passwordInput").value;
    if (input === PASSWORD) {
        localStorage.setItem("loggedIn", "true");
        showApp();
    } else {
        alert("Грешна парола");
    }
}

function showApp() {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
}

function logout() {
    localStorage.removeItem("loggedIn");
    location.reload();
}
