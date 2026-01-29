const PASSWORD = "shadow123";

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const passwordInput = document.getElementById("passwordInput");
    const loginError = document.getElementById("loginError");
    const loginScreen = document.getElementById("loginScreen");
    const chatApp = document.getElementById("chatApp");
    const logoutBtn = document.getElementById("logoutBtn");

    loginBtn.addEventListener("click", () => {
        if (passwordInput.value === PASSWORD) {
            loginScreen.classList.add("hidden");
            chatApp.classList.remove("hidden");
        } else {
            loginError.textContent = "Грешна парола";
        }
    });

    logoutBtn.addEventListener("click", () => {
        location.reload();
    });
});
