// Variables globales
const BASE_URL = 'https://japceibal.github.io/emercado-api/cats_products/';

// Verificar el inicio de sesión (similar a lo del index.html)
function verificarSesion() {
    const storedUser = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('password');
    if (!storedUser || !storedPassword) {
        window.location = 'login.html';
    }
}

// Obtener el catID de localStorage
const catID = localStorage.getItem('catID');


// FUNCION PARA OBTENER JSON Y MOSTRAR DATOS 


function obtenerYMostrarDatos() {
    const url = BASE_URL + catID + '.json';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            mostrarProductos(data.products);
            document.getElementById('categoryName').textContent = 'Verás aquí todos los productos de la categoria '+ data.catName.toLowerCase();
        })
        .catch(error => console.error('Error:', error));
}


// FUNCION PARA FILTRAR Y MOSTRAR PRODUCTOS FILTRADOS POR COSTO


function mostrarProductos(products) {
    const minCostInput = document.getElementById('rangeFilterCountMin');
    const maxCostInput = document.getElementById('rangeFilterCountMax');
    const minCost = parseFloat(minCostInput.value);
    const maxCost = parseFloat(maxCostInput.value);
    
    const productsFiltered = products.filter(product => {
        const productCost = parseFloat(product.cost);
        if (isNaN(productCost)) return false;
        if (!isNaN(minCost) && !isNaN(maxCost)) return productCost >= minCost && productCost <= maxCost;
        if (!isNaN(minCost)) return productCost >= minCost;
        if (!isNaN(maxCost)) return productCost <= maxCost;
        return true;
    });
    
    let content = '';

    productsFiltered.forEach(product => {
        content += `
            <div class="product">
                <img class="product-img" src="${product.image}" alt="${product.name}">
                <div class="product-details">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <p class="product-cost">Precio: USD$ ${product.cost}</p>
                </div>
            </div>
        `;
    });
    const productContainer = document.getElementById('productContainer');
    if (productsFiltered.length > 0) {
        productContainer.innerHTML = content;
    } else {
        productContainer.innerHTML = '<div class="no-results">No se encontraron resultados similares.</div>';
    }
}


// FUNCION PARA FILTRAR BUSQUEDA


function filtrarPorBusqueda(products, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    return products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
    });
}


// EVENTO PARA LA BUSQUEDA A PARTIR DEL INPUT (DENTRO DE FORM)


const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', function (e) {
    e.preventDefault(); 
    const searchTerm = document.getElementById('search-input').value;
    buscarYMostrarResultados(searchTerm);
});


// FUNCION PARA OBTENER DATOS DEL JSON YA FILTRADOS POR BUSQUEDA


function buscarYMostrarResultados(searchTerm) {
    fetch(BASE_URL + catID + '.json')
        .then(res => res.json())
        .then(data => {
            const products = data.products;
            const filteredProducts = filtrarPorBusqueda(products, searchTerm);
            mostrarProductos(filteredProducts);
        })
        .catch(error => console.error('Error:', error));
}

// EVENTOS DE LA PAGINA 
document.addEventListener('DOMContentLoaded', verificarSesion);
document.getElementById('filterBtn').addEventListener('click', obtenerYMostrarDatos);
document.getElementById('clearBtn').addEventListener('click', function () {
    document.getElementById('rangeFilterCountMin').value = '';
    document.getElementById('rangeFilterCountMax').value = '';
    obtenerYMostrarDatos();
});

// LLAMADO INICIAL PARA MOSTRAR TODOS LOS PRODUCTOS

obtenerYMostrarDatos();

//Funcion para ordenar productos en orden alfabetico (A-Z) (Z-A)

function sortProducts(ascending) {
    const productContainer = document.getElementById('productContainer');
    const products = Array.from(productContainer.getElementsByClassName('container'));

    products.sort(function(a, b) {
        const nameA = a.querySelector('h2').textContent.trim().toUpperCase();
        const nameB = b.querySelector('h2').textContent.trim().toUpperCase();

        if (ascending) {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });

    products.forEach(function(product) {
        productContainer.appendChild(product);
    });
}

document.getElementById('sortAsc').addEventListener('click', function() {
    sortProducts(true);
});

document.getElementById('sortDesc').addEventListener('click', function() {
    sortProducts(false);
});
