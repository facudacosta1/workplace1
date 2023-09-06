const BASE_URL = 'https://japceibal.github.io/emercado-api/cats_products/'; // base link JSON
const catID = localStorage.getItem('catID'); //Obtiene catID del localStorage
let jsonData; 

// Función para cargar los datos JSON y mostrarlos 
async function loadAndDisplayData() {
    const url = BASE_URL + catID + '.json';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching data.');
        }
        jsonData = await response.json(); //obtiene JSON
            //ordena por precio de mayor a menor antes de mostrar productos
        jsonData.products.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost)); 

            //Muestra nombre de la categoria arriba del buscador
        const categoryName=document.getElementById('categoryName'); 
        categoryName.innerText += ` ${jsonData.catName.toLowerCase()}`;

            //llama a la función que mostrará los productos en la página
        displayProducts(jsonData.products);
    
    } catch (error) {
        console.error('Error:', error);
    }
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

// Función para mostrar los productos en el div productContainer
function displayProducts(products) {
    let content = '';
    products.forEach(product => {
        content += `
            <div class="product" onclick="setProductID(${product.id})">
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


//FUNCION PARA EL BUSCADOR EN TIEMPO REAL

const searchInput = document.getElementById('search-input');
const productContainer = document.getElementById('productContainer');

    //Evento tipo "input" para filtrar en tiempo real
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase(); //selecciona el valor ingresado
        
        // Si no se ingresa un valor en el input muestra todos los elementos
    if (searchTerm === '') {
        displayProducts(jsonData.products);
    } else { // Si se ingresa, filtra elementos que coincidan con el término de búsqueda
        const filteredProducts = jsonData.products.filter(product => { //filtra el objeto del JSON
                //devuelve los elementos filtrados por nombre o descripción
            return product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts); //muestra los elementos filtrados
    }
});


//EVENTO PARA FILTRAR POR RANGO DE PRECIOS

const rangeFilterCountMin = document.getElementById('rangeFilterCountMin');
const rangeFilterCountMax = document.getElementById('rangeFilterCountMax');
const filterBtn = document.getElementById('filterBtn');
const clearBtn = document.getElementById('clearBtn');

    //Evento tipo "click" para el botón "filtrar"
filterBtn.addEventListener('click', function () {
    const minPrice = parseFloat(rangeFilterCountMin.value);
    const maxPrice = parseFloat(rangeFilterCountMax.value);
    
        //filtra los productos por el precio utilizando "filter" 
    const filteredProducts = jsonData.products.filter(product => {
        const productPrice = parseFloat(product.cost);
        return (!isNaN(minPrice) ? productPrice >= minPrice : true) &&
               (!isNaN(maxPrice) ? productPrice <= maxPrice : true);
    });

        // Muestra los productos filtrados
    displayProducts(filteredProducts);
});

//EVENTO PARA BOTON LIMPIAR 
clearBtn.addEventListener('click', function () {
        // Limpia los valores de los input y muestra los productos
    rangeFilterCountMin.value = '';
    rangeFilterCountMax.value = '';
    displayProducts(jsonData.products);
});


//FUNCION PARA ORDENAR ALFABÉTICAMENTE

function sortProducts(ascending) {
        //selecciona el contenedor con los productos
        //selecciona los elementos con clase "products" y lo guarda en un array
    const productContainer = document.getElementById('productContainer');
    const products = Array.from(productContainer.getElementsByClassName('product')); 

        //Se ordenan los elementos guardados en el array con metodo sort
    products.sort(function(a, b) {
            //selecciona elementos con la class "product-name" y los pasa a minuscula
        const nameA = a.querySelector('.product-name').textContent.trim().toUpperCase(); // Cambio aquí
        const nameB = b.querySelector('.product-name').textContent.trim().toUpperCase(); // Cambio aquí

            //localeCompare compara las palabras y ordena alfabeticamente
        if (ascending) {
            return nameA.localeCompare(nameB); 
        } else {
            return nameB.localeCompare(nameA);
        }
    });

    products.forEach(function(product) {
        productContainer.appendChild(product); //muestra los productos ordenados
    });
}

//evento tipo "click" para los input de ordenar
document.getElementById('sortAsc').addEventListener('click', function() {
    sortProducts(true);
});

document.getElementById('sortDesc').addEventListener('click', function() {
    sortProducts(false);
});

//FUNCIÓN PARA ORDENAR POR PRECIO

function sortByPrice() {
    var sortByPriceIcon = document.getElementById("sortByPrice-i");

        //evalúa si el input esta para orden descendente o ascendente
        //luego le cambia la clase al input para que se vea alreves
    if (sortByPriceIcon.className === 'fas fa-sort-amount-up mr-1') {
        sortByPriceIcon.className = 'fas fa-sort-amount-down mr-1';
            //ordena los productos a partir del costo
        jsonData.products.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
    } else {
        sortByPriceIcon.className = 'fas fa-sort-amount-up mr-1';
        jsonData.products.sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost)); // Cambiado a parseFloat(b.cost) - parseFloat(a.cost) para orden ascendente.
    }

    displayProducts(jsonData.products); // Muestra los productos ordenados en productContainer
}

//eventos tipo "click" al input de ordenar por precio
document.getElementById('sortByPrice').addEventListener('click',function(){
    sortByPrice();
})
document.getElementById('sortByCount').addEventListener('click',function(){
    sortByCount();
})


//FUNCION PARA ORDENAR POR ARTICULOS VENDIDOS
//Hace lo mismo que la función de ordenar por precio pero con cant. de articulos vendidos.
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

//SE LLAMA A LA FUNCIÓN PARA MOSTRAR TODOS LOS ELEMENTOS AL CARGAR LA PAGINA
loadAndDisplayData();