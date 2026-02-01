const PASSWORD = "shadow123";

window.onload = function () {
    if (localStorage.getItem("loggedIn") === "true") {
        showApp();
    }

    const passInput = document.getElementById("passwordInput");
    if (passInput) {
        passInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                checkLogin();
            }
        });
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
