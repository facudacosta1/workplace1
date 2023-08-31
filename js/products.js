// Variables globales
const BASE_URL = 'https://japceibal.github.io/emercado-api/cats_products/';

// Verificar el inicio de sesión
function verificarSesion() {
    const storedUser = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('password');
    if (!storedUser || !storedPassword) {
        window.location = 'login.html';
    }
}

// Obtener el catID de localStorage
const catID = localStorage.getItem('catID');

// Obtener y mostrar datos
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

// Mostrar productos
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
    
    document.getElementById('productContainer').innerHTML = content;
}

function filtrarPorBusqueda(products, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    return products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
    });
}

// Agregar evento de búsqueda al formulario
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir el envío del formulario por defecto
    const searchTerm = document.getElementById('search-input').value;
    buscarYMostrarResultados(searchTerm);
});

// Función para buscar y mostrar resultados
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

// Event listeners
document.addEventListener('DOMContentLoaded', verificarSesion);
document.getElementById('filterBtn').addEventListener('click', obtenerYMostrarDatos);
document.getElementById('clearBtn').addEventListener('click', function () {
    document.getElementById('rangeFilterCountMin').value = '';
    document.getElementById('rangeFilterCountMax').value = '';
    obtenerYMostrarDatos();
});

// Llamada inicial
obtenerYMostrarDatos();

// FUNCION: para buscador interno

