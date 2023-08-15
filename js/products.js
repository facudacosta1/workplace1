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
        let content = '<h1>Autos</h1>';

        products.forEach((product) => {
            content += `
            <div>
            <hr>
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            </div>`;
        });

        mostrarResultados.innerHTML = content;
    })
    .catch((error) => {
        console.error(error);
    });

    