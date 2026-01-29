function login() {
  const pass = document.getElementById("passwordInput").value;
  const saved = localStorage.getItem("shadowPass");

  if (!saved) {
    localStorage.setItem("shadowPass", pass);
    startApp();
  } else if (pass === saved) {
    startApp();
  } else {
    document.getElementById("loginError").innerText = "Грешна парола";
  }
}

function startApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

function logout() {
  location.reload();
}
