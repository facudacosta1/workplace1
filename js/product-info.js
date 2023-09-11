const BASE_URL = 'https://japceibal.github.io/emercado-api/cats_products/'; 
const catID = localStorage.getItem('catID'); 
const productID=localStorage.getItem('productID');
const productInfoContainer=document.getElementById('product-info-container');
const comentsContainer = document.getElementById('coments-container');
var storedUser = localStorage.getItem('user');
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
    const comentHeader = document.createElement('h1');
    comentHeader.innerText = 'Comentarios'
    comentsContainer.appendChild(comentHeader);
        
        coments.forEach(comment => {
            const p = document.createElement('p');
            p.classList.add('comment');
            let stars = '';
            for (let i = 0; i < comment.score; i++) {
                stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>`;
            }
            p.innerHTML = `${stars} ${comment.user}: ${comment.description}`;
            comentsContainer.appendChild(p);
        });
}

function postComentario(){
    let datos = {
        "product": productID,
        "score": calificacion.value,
        "user": storedUser,
    }

    const url = 'https://japceibal.github.io/emercado-api/products_comments/' + productID + '.json';

    fetch(url, {
        method:"POST",
        body: JSON.stringify(datos),
        headers:{"Content-type":"application/json; charset=UTF-8"}
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud de red.');
        }
        return response.json();
    })
    .then(json=>console.log(json))
    .catch(err=>console.log(err))
}

function enviarComentario(){
    const comentarioInput = document.getElementById('comentarioInput');
    const comentario = document.createElement('p');
    const calificacion = document.getElementById('calificacion')
    comentario.classList.add('comment');
    let stars = '';
    for (let i=0; i< calificacion.value ; i++){
        stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>`;
    }
    comentario.innerHTML = stars + storedUser +": " + comentarioInput.value ;
    comentsContainer.appendChild(comentario);
}
const enviarBtn = document.getElementById('enviarBtn');

  enviarBtn.addEventListener('click', function(e){
        enviarComentario();
        postComentario();
    })

