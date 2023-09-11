const BASE_URL = 'https://japceibal.github.io/emercado-api/cats_products/'; 
const catID = localStorage.getItem('catID'); 
const productID=localStorage.getItem('productID');
const productInfoContainer=document.getElementById('product-info-container');
const comentsContainer = document.getElementById('coments-container')
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
            <p>${product.soldCount} artículos vendidos</p>
        </div>
        
    `
    productInfoContainer.innerHTML=content;

}

//FUNCION PARA OBTENER JSON DE COMENTARIOS

async function getComments(){
    const url = PRODUCT_INFO_COMMENTS_URL + productID + '.json'
    try {
        const response = await fetch (url);
        if(!response.ok){
            throw new Error('Error fetching data')
        }
        comentsData = await response.json();
        displayComents(comentsData);
    } catch (error) {
        
    }
}
getComments();

//FUNCION PARA MOSTRAR COMENTARIOS

function displayComents(coments) {
        const comentarios = document.createElement('h1');
        comentarios.textContent='Comentarios'
        comentsContainer.appendChild(comentarios)
        
        coments.forEach(coment => {
            const p = document.createElement('p');
            p.classList.add('coment');
            let stars = '';
            for (let i = 0; i < coment.score; i++) {
                stars += '⭐';
            }
            p.textContent = `${stars} ${coment.user}: ${coment.description}`;
            comentsContainer.appendChild(p);
        });
}
