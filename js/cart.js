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
        
        const art = JSON.parse(localStorage.getItem("jsonArt"));
        showCarrito(art.articles);
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
        const productUnitCost = product.unitCost.toFixed(2);
        const productCurrency = product.currency;
        const id = product.id;
        content += `
        <tr data-productUnitCost="${productUnitCost}" data-productCurrency="${productCurrency}">
        <th scope="row" class="text-center"><img src="${product.image}" alt="imagen del" class="img-carrito"></th> 
        <td class="text-center">${product.name}</td>         
        <td class="text-center">${product.currency}${productUnitCost}</td>
        <td class="text-center">
            <input type="number" min="1" value="${product.count}" id="inputCantidad" oninput="actualizarSubtotal(${id},this.value)">
        </td>
        <td class="text-center d-none d-lg-block" id="productSubtotal">
            0.0
        </td> <!-- Se muestra un valor predeterminado de 0.0 -->
        <td class="text-center d-none d-lg-block"><button id="boton-vaciar-art" class="btn btn-danger" onclick="eliminarArticulo('${product.name}')">x</button>
        </td>         
        
        </tr>
        
        `;
    });
    tableBody.innerHTML = content;
}

/* En este código, hemos utilizado los atributos data-productUnitCost y data-productCurrency para almacenar los valores productUnitCost y productCurrency directamente en cada fila de la tabla 
*/

function actualizarCantidadProducto(id,value) {
    let datos = JSON.parse(localStorage.getItem("jsonArt"));
    if(datos != null){
        datos.articles.filter(function (articulo) {
            if(articulo.id == id){
                articulo.count = parseInt(value) || 1;
            }
        });
        localStorage.setItem("jsonArt", JSON.stringify(datos));
    }
    console.log(datos);
}

function actualizarSubtotal(id,value) {
    actualizarCantidadProducto(id,value);
    let totalShow = document.getElementById('total');
    let cantidadInputs = document.querySelectorAll('#inputCantidad');
    let subtotalElements = document.querySelectorAll('#productSubtotal');
    let total = 0;
    cantidadInputs.forEach((input, index) => {
        let cantidad = parseInt(input.value) || 1; 

        let fila = input.closest('tr'); // Obtener la fila actual
        let productUnitCost = parseFloat(fila.getAttribute('data-productUnitCost'));
        let productCurrency = fila.getAttribute('data-productCurrency');


        let costo = parseFloat(productUnitCost);
        let sub = cantidad * costo;
        let subtotal = sub.toFixed(2);
        let subtotalResult = productCurrency + subtotal;
        total = total + sub;
        
        // Actualizar el contenido del elemento td con id "productSubtotal"
        subtotalElements[index].textContent = subtotalResult; // Puedes ajustar el formato como desees
    });
    totalShow.innerHTML = total;

}

/*De esta manera, cada fila tiene sus propios valores productUnitCost y productCurrency asociados, y evitas la sobreescritura de variables en el bucle forEach. */


function borrar() {
    localStorage.removeItem("jsonArt"); // Elimina la información del carrito del almacenamiento local
    location.reload();
}
document.getElementById("boton-vaciar").addEventListener("click",borrar)

function eliminarArticulo(identificador) {
    let art = JSON.parse(localStorage.getItem("jsonArt"));
    
    // Encuentra el índice del artículo que coincide con el identificador único
    const index = art.articles.findIndex(article => article.name === identificador);
    
    // Si se encontró un artículo con el identificador, elimínalo del array
    if (index !== -1) {
        art.articles.splice(index, 1);
        localStorage.setItem("jsonArt", JSON.stringify(art));
        
        // Vuelve a cargar la página para reflejar los cambios
        location.reload();
    }
}


    
