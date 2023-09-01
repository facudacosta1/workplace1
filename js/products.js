// Variables globales
const BASE_URL = 'https://japceibal.github.io/emercado-api/cats_products/';

// Obtener el catID de localStorage
const catID = localStorage.getItem('catID');


// FUNCION PARA OBTENER JSON Y MOSTRAR DATOS 


const searchInput = document.getElementById('search-input');
const productContainer = document.getElementById('productContainer');
let jsonData; // Variable para almacenar los datos JSON

// Función para cargar los datos JSON y mostrarlos inicialmente
async function loadAndDisplayData() {
    const url = BASE_URL + catID + '.json';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching data.');
        }
        jsonData = await response.json();
        jsonData.products.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
        const categoryName=document.getElementById('categoryName');
        categoryName.innerText += ` ${jsonData.catName.toLowerCase()}`;
        displayProducts(jsonData.products);
    } catch (error) {
        console.error('Error:', error);
    }
}


// Función para mostrar los productos en productContainer
function displayProducts(products) {
    let content = '';
    products.forEach(product => {
        content += `
            <div class="product">
                <img class="product-img" src="${product.image}" alt="${product.name}">
                <div class="product-details">
                    <h2 class="product-name">${product.name}</h2>
                    <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                    <p class="product-description">${product.description}</p>
                    <p class="product-cost">Precio: ${product.cost}</p>
                </div>
            </div>
        `;
    });
    productContainer.innerHTML = content;
}

// Función para manejar el evento "input" en el input de búsqueda
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === '') {
        // Si no se ingresa un valor en el input, mostrar todos los elementos
        displayProducts(jsonData.products);
    } else {
        // Filtrar elementos que coincidan con el término de búsqueda
        const filteredProducts = jsonData.products.filter(product => {
            return product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts);
    }
});
// Obtén referencias a los elementos HTML para los filtros
const rangeFilterCountMin = document.getElementById('rangeFilterCountMin');
const rangeFilterCountMax = document.getElementById('rangeFilterCountMax');
const filterBtn = document.getElementById('filterBtn');
const clearBtn = document.getElementById('clearBtn');

// Agrega un evento click al botón "Filtrar"
filterBtn.addEventListener('click', function () {
    // Obtiene los valores de los campos de entrada
    const minPrice = parseFloat(rangeFilterCountMin.value);
    const maxPrice = parseFloat(rangeFilterCountMax.value);

    // Filtra los productos en función de los precios
    const filteredProducts = jsonData.products.filter(product => {
        const productPrice = parseFloat(product.cost);
        return (!isNaN(minPrice) ? productPrice >= minPrice : true) &&
               (!isNaN(maxPrice) ? productPrice <= maxPrice : true);
    });

    // Muestra los productos filtrados
    displayProducts(filteredProducts);
});

// Agrega un evento click al botón "Limpiar"
clearBtn.addEventListener('click', function () {
    // Restablece los campos de entrada
    rangeFilterCountMin.value = '';
    rangeFilterCountMax.value = '';

    // Muestra todos los productos nuevamente
    displayProducts(jsonData.products);
});


function sortProducts(ascending) {
    const productContainer = document.getElementById('productContainer');
    const products = Array.from(productContainer.getElementsByClassName('product')); // Cambio aquí

    products.sort(function(a, b) {
        const nameA = a.querySelector('.product-name').textContent.trim().toUpperCase(); // Cambio aquí
        const nameB = b.querySelector('.product-name').textContent.trim().toUpperCase(); // Cambio aquí

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

document.getElementById('sortByPrice').addEventListener('click',function(){
    sortByPrice();
})

document.getElementById('sortByCount').addEventListener('click',function(){
    sortByCount();
})


function sortByPrice() {
    var sortByPriceIcon = document.getElementById("sortByPrice-i");

    if (sortByPriceIcon.className === 'fas fa-sort-amount-up mr-1') {
        sortByPriceIcon.className = 'fas fa-sort-amount-down mr-1';
        jsonData.products.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
    } else {
        sortByPriceIcon.className = 'fas fa-sort-amount-up mr-1';
        jsonData.products.sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost)); // Cambiado a parseFloat(b.cost) - parseFloat(a.cost) para orden ascendente.
    }

    // Muestra los productos ordenados en productContainer
    displayProducts(jsonData.products);
}

function sortByCount() {
    var sortByCountIcon = document.getElementById("sortByCount-i");

    if (sortByCountIcon.className === 'fas fa-sort-amount-up mr-1') {
        sortByCountIcon.className = 'fas fa-sort-amount-down mr-1';
        jsonData.products.sort((a, b) => parseFloat(b.soldCount) - parseFloat(a.soldCount));
    } else {
        sortByCountIcon.className = 'fas fa-sort-amount-up mr-1';
        jsonData.products.sort((a, b) => parseFloat(a.soldCount) - parseFloat(b.soldCount)); // Cambiado a parseFloat(b.cost) - parseFloat(a.cost) para orden ascendente.
    }

    // Muestra los productos ordenados en productContainer
    displayProducts(jsonData.products);
}

// Cargar y mostrar los datos iniciales
loadAndDisplayData();