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
        if (!localStorage.getItem("jsonArt")) {
            var jsonString = JSON.stringify(jsonData);
            localStorage.setItem("jsonArt", jsonString);
        }
        
        const m = JSON.parse(localStorage.getItem("jsonArt"));
        showCarrito(m.articles);
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
        productUnitCost = product.unitCost.toFixed(2);
        productCurrency = product.currency;
        content += `
        <tr>
        <th scope="row" class="text-center"><img src="${product.image}" alt="imagen del" class="img-carrito"></th> 
        <td class="text-center">${product.name}</td>         
        <td class="text-center">${product.currency}${productUnitCost}</td>
        <td class="text-center">
        <input type="number" min="1" value="1" id="inputCantidad" oninput="actualizarSubtotal()">
        </td>
        <td class="text-center" id="productSubtotal">0.0</td> <!-- Se muestra un valor predeterminado de 0.0 -->
        <td class="text-center"><button id="boton-vaciar-art" class="btn btn-danger" onclick="borrarArt()">x</button>
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
        let costo = parseFloat(productUnitCost);
        let sub = cantidad * costo;
        let subtotal = sub.toFixed(2);
        let subtotalResult = productCurrency + subtotal;
        
        // Actualizar el contenido del elemento td con id "productSubtotal"
        subtotalElements[index].textContent = subtotalResult; // Puedes ajustar el formato como desees
    });
}

function borrar() {
    localStorage.setItem("jsonArt", "" )
    location.reload()
}
document.getElementById("boton-vaciar").addEventListener("click",borrar)


    
