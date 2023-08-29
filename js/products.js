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
        let content = '<h1 class="product-cat"></h1>';

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