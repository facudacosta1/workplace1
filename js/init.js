const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//VALIDAR SI EL USUARIO ESTA LOGUEADO 
document.addEventListener('DOMContentLoaded',function(){
  
  const cuenta = localStorage.getItem('cuenta');
  if(!cuenta){
    window.location.href='login.html';
  } 
  
  nameUserInVar();

})


//MOSTRAR EL NOMBRE EN EL NAVBAR
function nameUserInVar(){
  let userName = JSON.parse(localStorage.getItem('cuenta'));
  const nameVarContainer = document.getElementById('userNameContainer');
  nameVarContainer.textContent = userName.usuario;
}

//CERRAR SESIÓN
function cerrarSesion(){
  localStorage.removeItem('cuenta');
  window.location.reload();
}

//CAMBIAR DE TEMA CLARO A OSCURO 
function temaClaro() {
  document.querySelector("html").setAttribute("data-bs-theme", "light");
  document.querySelector("#dl-icon-dark").classList.remove("d-none");
  document.querySelector("#dl-icon-sun").classList.add("d-none");
  localStorage.setItem("theme-dark", false);
  let imgCover = document.getElementById('imgCover');
  imgCover.src = 'img/cover_back.png';

}

function temaOscuro() {
  document.querySelector("html").setAttribute("data-bs-theme", "dark");
  document.querySelector("#dl-icon-dark").classList.add("d-none");
  document.querySelector("#dl-icon-sun").classList.remove("d-none");
  localStorage.setItem("theme-dark", true);
  let imgCover = document.getElementById('imgCover');
  imgCover.src = 'img/cover-back-black.png';
 
}

function cambiarTema() {
  const tema = document.querySelector("html").getAttribute("data-bs-theme");
  if (tema === "light") {
    temaOscuro();
  } else {
    temaClaro();
  }
}

//EVALUA SI EL TEMA ES OSCURO O CLARO
if(localStorage.getItem("theme-dark") ==="true"){
  temaOscuro();
} 

// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
(function () {
  'use strict'

  // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
  var forms = document.querySelectorAll('.needs-validation')

  // Bucle sobre ellos y evitar el envío
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()