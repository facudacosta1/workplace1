const email = localStorage.getItem('user');

const inputNombre = document.getElementById('inputNombre');
const inputNombre2 = document.getElementById('inputNombre2');
const inputApellido = document.getElementById('inputApellido');
const inputEmail = document.getElementById('inputEmail');
const inputTelefono = document.getElementById('inputTelefono');
const inputFoto = document.getElementById('inputFoto');
const perfilImage = document.getElementById('perfilImage');

inputEmail.value = email;

const formPerfil = document.getElementById('formPerfil');

formPerfil.addEventListener('submit', function (e) {
    if (!formPerfil.checkValidity()) {
        e.preventDefault();
    } else {
        e.preventDefault();

        let perfilUser = {
            nombre: inputNombre.value,
            segundoNombre: inputNombre2.value,
            apellido: inputApellido.value,
            email: inputEmail.value,
            telefono: inputTelefono.value,
            foto: inputFoto.value
        }

        let perfilDatos = JSON.stringify(perfilUser);

        localStorage.setItem('perfil', perfilDatos);
    }
})

const perfilData = localStorage.getItem('perfil');

if (perfilData) {
    let perfil = JSON.parse(perfilData);
    inputNombre.value = perfil.nombre;
    inputNombre2.value = perfil.segundoNombre;
    inputApellido.value = perfil.apellido;
    inputTelefono.value = perfil.telefono;

    if (perfil.foto) {
        perfilImage.src = perfil.foto;
    }
}

inputFoto.addEventListener('change', function () {
    if (inputFoto.files.length > 0) {
        const selectedImage = inputFoto.files[0];
        const imageURL = URL.createObjectURL(selectedImage);
        perfilImage.src = imageURL;
    }
});

