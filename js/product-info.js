const BASE_URL = 'https://japceibal.github.io/emercado-api/cats_products/'; 
const catID = localStorage.getItem('catID'); 
const productID=localStorage.getItem('productID');
const productInfoContainer=document.getElementById('product-info-container')
let jsonData;

async function loadAndDisplayData(){
    const url = BASE_URL + catID + '.json';
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Error fetching data.')
        }
        jsonData = await response.json();
        filterData();
    }catch (error){
        console.error('Error:', error)
    }
}
loadAndDisplayData();

function filterData() { 
    filteredProducts = jsonData.products.filter(product => {
        return product.id === parseInt(productID);
    });
    const filteredProduct = filteredProducts[0];
    displayProducts(filteredProduct);
}

function displayProducts(product){
    let content ='';
    content += `
        <div class="img-container">
                <img class="product-info-img" src="${product.image}">
        </div>
        <div class="product-info">
            <h1 class="product-name">${product.name}</h1>
            <p class="product-cost">$USD ${product.cost} </p>
            <p>${product.description}</p>
            <p>Categoría:  ${jsonData.catName}</p>
            <p>Cantidad de artículos vendidos: ${product.soldCount}</p>
        </div>
        
    `
    productInfoContainer.innerHTML=content;

}