// Hent modalelementer
var registerModal = document.getElementById("registerModal");
var loginModal = document.getElementById("loginModal");

// Hent knapper som åpner modaler
var registerBtn = document.getElementById("registerBtn");
var loginBtn = document.getElementById("loginBtn");

// Hent <span>-elementer som lukker modaler
var closeRegister = document.getElementsByClassName("close")[0];
var closeLogin = document.getElementsByClassName("closeLogin")[0];

// Når brukeren klikker på knappen, åpne registreringsmodalen
registerBtn.onclick = function() {
    registerModal.style.display = "block";
}

// Når brukeren klikker på knappen, åpne innloggingsmodalen
loginBtn.onclick = function() {
    loginModal.style.display = "block";
}

// Når brukeren klikker på <span> (x), lukk registreringsmodalen
closeRegister.onclick = function() {
    registerModal.style.display = "none";
}

// Når brukeren klikker på <span> (x), lukk innloggingsmodalen
closeLogin.onclick = function() {
    loginModal.style.display = "none";
}

// Når brukeren klikker utenfor modalene, lukk modalene
window.onclick = function(event) {
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    } else if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}

// Håndter registrering
document.getElementById("registerForm").onsubmit = function(event) {
    event.preventDefault(); // Hindre sideinnlasting

    // Hent verdiene fra registreringsskjemaet
    var username = document.querySelector('input[name="username"]').value;
    var password = document.querySelector('input[name="password"]').value;

    // Sjekk om brukeren allerede eksisterer i localStorage
    if (localStorage.getItem(username)) {
        alert("Brukernavnet er allerede i bruk.");
    } else {
        // Lagre brukernavn og passord i localStorage
        localStorage.setItem(username, password);
        alert("Bruker registrert: " + username);
        registerModal.style.display = "none"; // Lukk modal
    }
}

// Håndter innlogging
document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault(); // Hindre sideinnlasting

    // Hent verdiene fra innloggingsskjemaet
    var username = document.querySelector('input[name="loginUsername"]').value;
    var password = document.querySelector('input[name="loginPassword"]').value;

    // Sjekk om brukernavn og passord samsvarer med det som er lagret i localStorage
    var storedPassword = localStorage.getItem(username);

    if (storedPassword && storedPassword === password) {
        alert("Innlogging vellykket!");
        loginModal.style.display = "none"; // Lukk modal
        // Her kan du dirigere brukeren videre til hovedinnholdet i appen
        window.location.href = "CORE/core.html"; // Send brukeren til hovedsiden
    } else {
        alert("Feil brukernavn eller passord. Prøv igjen.");
    }
}

// Forhåndsvis bilde ved opplasting
function previewImage(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(){
        var imagePreview = document.getElementById("imagePreview");
        imagePreview.src = reader.result;
        imagePreview.style.display = "block"; // Vis bildet
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}

// Hent knappen for bildeopplasting
document.getElementById("uploadBtn").onclick = function() {
    this.nextElementSibling.click(); // Klikk på filinputen
}
