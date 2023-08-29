const catID = localStorage.getItem('catID');
const BASE_URL= 'https://japceibal.github.io/emercado-api/cats_products/';
const DATA = BASE_URL + catID + '.json';

//selecciono el localstorage, creo una BASE_URL y a DATA_AUTOS le concateno catID y ".json"

const mostrarResultados = document.getElementById("products");          

fetch(DATA)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al cargar.');
        }
        return response.json();
    })
    .then((data) => {
        const products = data.products;
        let content = `
        <div class="text-center p-4"> 
            <h2>Productos</h2> 
            <p class="lead">Verás aquí todos los productos de la categoria ${data.catName}.</p>
        </div>
        <div class="container">
        <div class="row">
          <div class="col text-end">
            <div class="btn-group btn-group-toggle mb-4" data-bs-toggle="buttons">
              <input type="radio" class="btn-check" name="options" id="sortAsc">
              <label class="btn btn-light" for="sortAsc">A-Z</label>
              <input type="radio" class="btn-check" name="options" id="sortDesc">
              <label class="btn btn-light" for="sortDesc">Z-A</label>
              <input type="radio" class="btn-check" name="options" id="sortByCount" checked>
              <label class="btn btn-light" for="sortByCount"><i class="fas fa-sort-amount-down mr-1"></i></label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
            <div class="row container p-0 m-0">
              <div class="col">
                <p class="font-weight-normal text-end my-2">Cant.</p>
              </div>
              <div class="col">
                <input class="form-control" type="number" placeholder="min." id="rangeFilterCountMin">
              </div>
              <div class="col">
                <input class="form-control" type="number" placeholder="máx." id="rangeFilterCountMax">
              </div>
              <div class="col-3 p-0">
                <div class="btn-group" role="group">
                  <button class="btn btn-light btn-block" id="rangeFilterCount">Filtrar</button>
                  <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
                </div>
              </div>
            </div>
          </div>
        
        `;

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
    })
    .catch((error) => {
        console.error(error);
    });

document.addEventListener('DOMContentLoaded', function(){
    document.getElementsByClassName('cat-title').innerText = 'qweqe';
})