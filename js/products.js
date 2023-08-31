document.addEventListener('DOMContentLoaded', function(){
    var storedUser = localStorage.getItem('user');
    var storedPassword = localStorage.getItem('password');

    if (!storedUser || !storedPassword){
        window.location = 'login.html';
    }
})

const catID = localStorage.getItem('catID');
const BASE_URL = 'https://japceibal.github.io/emercado-api/cats_products/';

//FUNCION PARA OBTENER EL JSON

function getJSON(callback){
    const url = BASE_URL + catID + '.json';
    fetch(url)
        .then(res=>{
            if(!res.ok){
                throw new Error ('Error al obtener el JSON.')
            }
            return res.json();
        })
        .then(data=>{
            callback(data);
        })
        .catch(error=>{
            console.error('Error: ', error);
        })
}

function showData(data){
    const products = data.products;
    let content = ``;
    products.forEach((product)=>{
        content += `
            <div class="product">
                <img class="product-img" src="${product.image}"> </img>
                <div class="product-details">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <p class="product-cost">Precio: USD$ ${product.cost}</p>
                </div>
            </div>
        `
    })

    document.getElementById('productContainer').innerHTML = content;
    document.getElementById('categoryName').textContent += `${data.catName.toLowerCase()}`
}

getJSON(showData);

// FUNCION PARA FILTRAR POR COSTO

function filtrar(data, minCost, maxCost){
    return data.products.filter(product =>{
        const productCost = parseFloat(product.cost);

        if(isNaN(productCost)){
            return false;
        } 

        if(!isNaN(minCost) && !isNaN(maxCost)){
            return productCost >= minCost && productCost <= maxCost;
        } else if (!isNaN(minCost)){
            return productCost >= minCost;
        }else if(!isNaN(maxCost)){
            return productCost <= maxCost;
        }else {
            return true;
        }
    });
}

// EVENTO AL BOTON FILTRAR

document.getElementById('filterBtn').addEventListener('click', function(){
    const minCostInput = document.getElementById('rangeFilterCountMin');
    const maxCostInput = document.getElementById('rangeFilterCountMax');
    const minCost = parseFloat(minCostInput.value); //toma valor del input y lo convierte a numero
    const maxCost = parseFloat(maxCostInput.value);

    getJSON(function(data){
        const productosFiltrados = filtrar(data, minCost, maxCost);
        mostrarProductosFiltrados(productosFiltrados); //llama a la funcion y pasa los productos filtrados
    });
});

// FUNCION: para mostrar productos filtrados

function mostrarProductosFiltrados(productos){
    let content = ``;
    productos.forEach((product)=>{
        content += `
            <div class="product">
                <img class="product-img" src="${product.image}"> </img>
                <div class="product-details">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <p class="product-cost">Precio: USD$ ${product.cost}</p>
                </div>
            </div>
        `
    });

    document.getElementById('productContainer').innerHTML = content;
}

// EVENTO: al boton limpiar

document.getElementById('clearBtn').addEventListener('click', function(){
    //limpia los valores de min y max y dispara filtrar automaticamente
    document.getElementById('rangeFilterCountMin').value = '';
    document.getElementById('rangeFilterCountMax').value = '';

    const filterBtn = document.getElementById('filterBtn');

    if(filterBtn){
        filterBtn.click();
    }

})


