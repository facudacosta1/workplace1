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
        let content = '<h1 class="product-cat">AUTOS</h1>';

        products.forEach((product) => {
            content += `
            <div>
            <div class="container-products">
            <div class="product-div-img">
                <img src="${product.image}" alt="${product.name}" class="product-img">
            </div>
                <h2 class="product-name">${product.name}</h2>
                <p class="product-descr">${product.description}</p>
                <p class="product-price">Precio: USD$ ${product.cost}</p>
            </div>
            </div>`;
        });

        mostrarResultados.innerHTML = content;
    })
    .catch((error) => {
        console.error(error);
    });

    