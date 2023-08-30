const catID = localStorage.getItem('catID');
const BASE_URL= 'https://japceibal.github.io/emercado-api/cats_products/';
const DATA = BASE_URL + catID + '.json';

//selecciono el localstorage, creo una BASE_URL y a DATA_AUTOS le concateno catID y ".json"

document.addEventListener('DOMContentLoaded', function(){
  const mostrarResultados = document.getElementById("products");   
  const parrafo = document.getElementById('parrafo');

  fetch(DATA)
      .then((response) => {
          if (!response.ok) {
              throw new Error('Error al cargar.');
          }
          return response.json();
      })
      .then((data) => {
          const products = data.products;
          let content = ``;  
          products.forEach((product) => {
              content += `
              <div>
              <div class="container-products">
              <div class="product-div-img">
                  <img src="${product.image}" alt="${product.name}" class="product-img">
              </div>
                  <h2 class="product-name">${product.name}</h2>
                  <p class="product-descr">${product.description}</p>
                  <p class="product-price">Precio: USD$ ${product.cost}</p>
              </div>
              </div>`;
          });
  
          mostrarResultados.innerHTML = content;
          parrafo.textContent += ` ${data.catName.toLowerCase()}`

      })
      .catch((error) => {
          console.error(error);
      });
})

function filtrar (){
    let min = document.getElementById('rangeFilterCountMin').value;
    let max = document.getElementById('rangeFilterCountMax').value;
    const mostrarResultados = document.getElementById("products");   

    if(min == "" || max == ""){
        alert('completa minimo y maximo.');
        return;
    }
    
    fetch(DATA)
      .then((response) => {
          if (!response.ok) {
              throw new Error('Error al cargar.');
          }
          return response.json();
      })
      .then((data) => {
          const products = data.products;
          let content = ``;  
          products.forEach((product) => {
            if(product.cost > min && product.cost < max){
                content += `
              <div>
              <div class="container-products">
              <div class="product-div-img">
                  <img src="${product.image}" alt="${product.name}" class="product-img">
              </div>
                  <h2 class="product-name">${product.name}</h2>
                  <p class="product-descr">${product.description}</p>
                  <p class="product-price">Precio: USD$ ${product.cost}</p>
              </div>
              </div>`;
            } else {
                content += ``
            }
          });
  
          mostrarResultados.innerHTML = content;
      })
}

function limpiar(){
    window.location = 'products.html';
    return;
}