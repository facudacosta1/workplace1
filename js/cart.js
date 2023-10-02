let userId = 25801;
let base_url_carrito = 'https://japceibal.github.io/emercado-api/user_cart/';
let dataCarrito = base_url_carrito + userId + '.json';

async function getCarrito(){
    try{
        const response = await fetch(dataCarrito);
        if(!response.ok){
            throw new Error('Error fetching data.')
        }
        jsonData = await response.json();
        showCarrito();
    } catch(error){
        console.error('Error:', error)
    }
}

getCarrito();


function showCarrito(){
    const itemsContainer = document.querySelector('#itemsCarritoContainer');
    let products = jsonData.articles;
    products.forEach(element => {
        var img = document.createElement("img");
        img.src = element.image;
        img.classList.add('col-1')
        itemsContainer.appendChild(img);
        
        var name = document.createElement("p");
        name.classList.add("col-2")
        name.innerText = element.name;
        itemsContainer.appendChild(name);

        var cost = document.createElement("p");
        cost.classList.add("col-2");
        cost.innerText = element.currency + " " + element.unitCost;
        itemsContainer.appendChild(cost);

        var count = document.createElement("input");
        count.type='text';
        count.classList.add('col-2','countItem');
        itemsContainer.appendChild(count);
    });
}

