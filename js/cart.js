let userId = 25801;
let base_url_carrito = 'https://japceibal.github.io/emercado-api/user_cart/';
let dataCarrito = base_url_carrito + userId + '.json';

async function getCarrito() {
    try {
        const response = await fetch(dataCarrito);
        if (!response.ok) {
            throw new Error('Error fetching data.')
        }
        jsonData = await response.json();
        showCarrito(jsonData.articles);
        actualizarSubtotal(); // Llama a esta función para mostrar los subtotales al cargar la página
    } catch (error) {
        console.error('Error:', error)
    }
}

getCarrito();

function showCarrito(articles) {
    let tableBody = document.querySelector('#tableBody');
    let content = '';
    articles.forEach((product, index) => {
        let costo = product.unitCost;

        content += `

            <tr>
                <th scope="row" class="text-center"><img src="${product.image}" alt="imagen del" class="img-carrito"></th> 
                <td class="text-center">${product.name}</td>         
                <td class="text-center">${product.unitCost}</td>
                <td class="text-center">
                    <input type="number" min="1" value="1" id="inputCantidad" oninput="actualizarSubtotal()">
                </td>
                <td class="text-center" id="productSubtotal">0.0</td> <!-- Se muestra un valor predeterminado de 0.0 -->
                <td class="text-center"><button id="boton-vaciar" class="btn btn-danger">x</button>
                </td>         

            </tr>
    
            `;
    });
    tableBody.innerHTML = content;
}

function actualizarSubtotal() {
    let cantidadInputs = document.querySelectorAll('#inputCantidad');
    let subtotalElements = document.querySelectorAll('#productSubtotal');

    cantidadInputs.forEach((input, index) => {
        let cantidad = parseInt(input.value) || 1; 
        let costo = parseFloat(input.closest('tr').querySelector('.text-center:nth-child(3)').textContent);
        let subtotal = cantidad * costo;

        // Actualizar el contenido del elemento td con id "productSubtotal"
        subtotalElements[index].textContent = subtotal.toFixed(2); // Puedes ajustar el formato como desees
    });
}


