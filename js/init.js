const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


var storedUser = localStorage.getItem('user');
const catID = localStorage.getItem('catID'); 

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

//EVENTO AL DOM PARA CADA PAGINA: 
  //Verifica si ingresaron user y password
  //Agrega nombre de usuario en esquina superior derecha
document.addEventListener("DOMContentLoaded", function(){
  var storedUser = localStorage.getItem('user');
  var storedPassword = localStorage.getItem('password');
  
  if (!storedUser || !storedPassword){
      window.location = 'login.html'
  }
  
  let nameUser = document.getElementById('nameUser');
  nameUser.innerText = "Usuario: " + storedUser;
  })
  let storedUsuario = localStorage.getItem("user");
  let storedContraseña = localStorage.getItem("password");
  let nameUsuario = document.getElementById("nameUsuario");

  function cerrarSesion(){
    localStorage.removeItem("user");
    localStorage.removeItem("password");
    localStorage.removeItem("theme-dark")
  }

  const temaOscuro = () => {
    document.querySelector("html").setAttribute("data-bs-theme", "dark");
    document.querySelector("#dl-icon").setAttribute("class", "bi bi-sun-fill");
    localStorage.setItem("theme-dark", true);
  }

  const temaClaro = () => {
    document.querySelector("html").setAttribute("data-bs-theme", "light");
    document.querySelector("#dl-icon").setAttribute("class", "bi bi-moon-fill");
    localStorage.setItem("theme-dark", false);
  }

  const cambiarTema = () => {
    const temaActual = document.querySelector("html").getAttribute("data-bs-theme");
    if (temaActual === "light") {
      temaOscuro();
    } else {
      temaClaro();
    }
  }

  if(localStorage.getItem("theme-dark") ==="true"){
    temaOscuro();
  }