const DATA_AUTOS = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

const mostrarResultados = document.getElementById("products");

fetch(DATA_AUTOS)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al cargar.');
        }
        return response.json();
    })
    .then((data) => {
        const products = data.products;
        let content = '<h1 class="product-cat">Autos</h1>';

        products.forEach((product) => {
            content += `
            <div>
            <hr>
            <div class="product-div-img">
                <img src="${product.image}" alt="${product.name}" class="product-img">
            
                <h2 class="product-name">${product.name}</h2>
                <p class="product-descr">${product.description}</p>
                <p class="product-price">Precio: $${product.price}</p>
            </div>
            </div>`;
        });

        mostrarResultados.innerHTML = content;
    })
    .catch((error) => {
        console.error(error);
    });

    