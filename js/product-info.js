const BASE_URL = 'https://japceibal.github.io/emercado-api/cats_products/' + catID + '.json'; 

const productID = localStorage.getItem('productID');
const BASE_URL_PRODUCT = 'https://japceibal.github.io/emercado-api/products/' + productID + '.json';

var storedUser = localStorage.getItem('user');
let jsonData;

async function getShowData(){
    try {
        const response = await fetch(BASE_URL_PRODUCT);
        if(!response.ok){
            throw new Error('Error fetching data.')
        }
        jsonData= await response.json();
        showProductInfo();
        showRelatedProducts();
        console.log(jsonData.relatedProducts);

    } catch (error) {
        console.error('Error:', error)
    }
}
getShowData();

function showProductInfo(){
    const productInfoContainer = document.getElementById('product-info-container');
    let content = '';
    content += `

    <div class="container" id="containerProductsInfo">
        <div id="carouselExampleCaptions" class="carousel slide">
            <div class="carousel-inner">
            <!-- Los elementos del carrusel se agregan aquí -->
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="product-info">
            <h1 class="product-name">${jsonData.name}</h1>
            <p class="product-cost">$USD ${jsonData.cost}</p>
            <p>${jsonData.description}</p>
            <p>Categoría: ${jsonData.category}</p>
            <p>${jsonData.soldCount} artículos vendidos</p>
        </div>
  </div>

    `

    productInfoContainer.innerHTML = content;

}
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function showRelatedProducts(){
    const recomendationsContainer = document.getElementById('recommendations');
    let content = '';
    let products = jsonData.relatedProducts;
    products.forEach(prod=>{
        content += `
        <div class="recommendations-products" onclick="setProductID(${prod.id})">
            <img class="recommendations-product-img" src="${prod.image}">
            <h2 class="recommendations-product-name">${prod.name}</h2>
        </div>
        `
    recomendationsContainer.innerHTML = content;
    })

}

async function getComments(){
    const url = PRODUCT_INFO_COMMENTS_URL + productID + '.json'
    try {
        const response = await fetch (url);
        if(!response.ok){
            throw new Error('Error fetching data')
        }
        comentsData = await response.json();

        //FUNCIONES
        showComments();
    } catch (error) {
        
    }
}
getComments();

function showComments() {
    const comentsContainer = document.getElementById('coments-container');
    const titulo = `<h1>Comentarios:</h1>`;
    comentsContainer.innerHTML = titulo;
    let content = '';

    comentsData.forEach(coment => {
        // Crear un string de estrellas en base a coment.score
        let stars = '';
        for (let i = 0; i < coment.score; i++) {
            stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" stroke="black" stroke-width="1" style="margin-right: 2px;" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>`; // Puedes usar cualquier carácter o icono para representar una estrella
        }

        content += `
            <p>${stars} ${coment.user}: ${coment.description}</p>
        `;
    });

    comentsContainer.innerHTML += content;
}
document.addEventListener('DOMContentLoaded', () => {
    // URL del JSON
    const jsonUrl = 'https://japceibal.github.io/emercado-api/products/' + productID + '.json';
  
    // Función para cargar el JSON
    async function fetchJson(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching JSON:', error);
      }
    }
  
    function addImagesToCarousel(images) {
      const carouselInner = document.querySelector('.carousel-inner');
    
      // Verificar si el elemento .carousel-inner existe
      if (!carouselInner) {
        console.error('No funciona el elemento con la clase .carousel-inner');
        return;
      }
    
      let isFirstImage = true;
    
      images.forEach((image, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
    
        if (isFirstImage) {
          carouselItem.classList.add('active');
          isFirstImage = false;
        }
    
        const img = document.createElement('img');
        img.classList.add('d-block', 'w-100', 'imgProductInfo');
        img.src = image;
        img.alt = `Slide ${index + 1}`;
    
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
      });
    }
    
  
    // Cargar el JSON y agregar las imágenes al carrusel
    fetchJson(jsonUrl)
      .then(data => {
        const images = data.images;
        addImagesToCarousel(images);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  });
  
  function enviarComentario(){
    const comentsContainer = document.getElementById('coments-container');
    const comentario = document.createElement('p');
    const calificacion = document.getElementById('calificacion')
    comentario.classList.add('comment');
    let stars = '';
    for (let i = 0; i < calificacion.value; i++) {
        stars += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" stroke="black" stroke-width="1" style="margin-right: 2px;" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>`;
    }
    comentario.innerHTML = `${stars} ${storedUser}: ${comentarioInput.value}`;
    comentsContainer.appendChild(comentario);
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


  const enviarBtn = document.getElementById('enviarBtn');
  enviarBtn.addEventListener('click', function(e){
    enviarComentario();
    postComentario();
});



