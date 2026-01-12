let users = JSON.parse(localStorage.getItem("users")) || [];

function register() {
    let user = document.getElementById("regUser").value;
    let pass = document.getElementById("regPass").value;
    let role = document.getElementById("role").value;

    users.push({ user, pass, role });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully");
    window.location.href = "index.html";
}

function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    let found = users.find(x => x.user === u && x.pass === p);
    if (found) {
        localStorage.setItem("currentUser", JSON.stringify(found));
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid login");
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
