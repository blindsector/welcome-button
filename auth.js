document.addEventListener("DOMContentLoaded", () => {
    const loginScreen = document.getElementById("loginScreen");
    const appScreen = document.getElementById("appScreen");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const passwordInput = document.getElementById("passwordInput");

    const PASSWORD = "shadow"; // можеш да си я смениш

    function checkLogin() {
        const loggedIn = localStorage.getItem("shadowLoggedIn");
        if (loggedIn === "true") {
            loginScreen.style.display = "none";
            appScreen.style.display = "block";
        } else {
            loginScreen.style.display = "flex";
            appScreen.style.display = "none";
        }
    }

    loginBtn.addEventListener("click", () => {
        if (passwordInput.value === PASSWORD) {
            localStorage.setItem("shadowLoggedIn", "true");
            checkLogin();
            passwordInput.value = "";
        } else {
            alert("Грешна парола");
        }
    });

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("shadowLoggedIn");
        checkLogin();
    });

    checkLogin(); // важно — проверява при всяко зареждане
});
