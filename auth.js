document.addEventListener("DOMContentLoaded", () => {

    const loginScreen = document.getElementById("loginScreen");
    const appScreen = document.getElementById("appScreen");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const passwordInput = document.getElementById("passwordInput");

    const CORRECT_PASSWORD = "shadow";

    // Ако липсват елементи — не правим нищо (спасява UI-то)
    if (!loginScreen || !appScreen) return;

    function showApp() {
        loginScreen.style.display = "none";
        appScreen.style.display = "block";
    }

    function showLogin() {
        loginScreen.style.display = "flex";
        appScreen.style.display = "none";
    }

    // Проверка при зареждане
    if (localStorage.getItem("shadowLoggedIn") === "true") {
        showApp();
    } else {
        showLogin();
    }

    // Логин бутон
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            if (passwordInput && passwordInput.value === CORRECT_PASSWORD) {
                localStorage.setItem("shadowLoggedIn", "true");
                showApp();
                passwordInput.value = "";
            } else {
                alert("Грешна парола");
            }
        });
    }

    // Logout бутон
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("shadowLoggedIn");
            showLogin();
        });
    }

});
