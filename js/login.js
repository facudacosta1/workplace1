document.addEventListener('DOMContentLoaded', function() {
    var userInput = document.getElementById('user');
    var passwordInput = document.getElementById('password');
    var loginButton = document.getElementById('login-button');

    loginButton.addEventListener('click', function(event) {
        if (userInput.value.length === 0 || passwordInput.value.length === 0) {
            event.preventDefault(); // Detener la redirección si los campos no están llenos
        } else {
            localStorage.setItem('user', userInput.value);
            localStorage.setItem('password', passwordInput.value);
        }
    });

    function actualizarEstilos() {
        if (userInput.value.length > 0 && passwordInput.value.length > 0) {
            loginButton.classList.add('hovered');
        } else {
            loginButton.classList.remove('hovered');
        }
    }

    userInput.addEventListener('input', actualizarEstilos);
    passwordInput.addEventListener('input', actualizarEstilos);
});
