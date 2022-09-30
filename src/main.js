let shop = document.getElementById("shoppingItems");
let cartQuantity = document.getElementById("cartQuantity");
let totalItems = 0;

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () =>{
    return(shop.innerHTML = shopitems.map((x)=>{
        let {id,imgsrc,Title,price} = x;
        let search = basket.find((x) => x.id === id) || [];
        if(search.quantity !== undefined)totalItems +=search.quantity;
        return`
        <div class="Item" id=${id+"x"}>
            <img width="200" height="200" src=${imgsrc}>
            <div class="Itemdetails">
                <h2>${Title}</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                <div class="price-Quantity">
                    <h3>$${price}</h3>
                    <div class="counter">
                        <i onclick="decrease(${id})" class='bx bx-minus'></i>
                        <div id=${id} class="Quantity">
                            ${search.quantity === undefined? 0: search.quantity}
                        </div>
                        <i onclick="increase(${id})" class='bx bx-plus'></i>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join(""));
};

generateShop();
cartQuantity.innerHTML = totalItems;

let increase = (item) =>{
    let itemId = item.id;
    let search = basket.find((x) => x.id === itemId)

    if(search === undefined){
        basket.push({
            id:itemId,
            quantity:1,
        })
    }
    else{
        search.quantity++;
    }
    document.getElementById(itemId).innerHTML++;
    totalItems++;
    cartQuantity.innerHTML++;
    localStorage.setItem("data",JSON.stringify(basket));
};

let decrease = (item) =>{
    let itemId = item.id;
    if(document.getElementById(itemId).innerHTML == 0)return;
    let search = basket.find((x) => x.id === itemId)
    search.quantity--;
    document.getElementById(itemId).innerHTML--;
    totalItems--;
    cartQuantity.innerHTML--;
    basket = basket.filter((x) => x.quantity !== 0);
    localStorage.setItem("data",JSON.stringify(basket));
   // console.log(basket);
};












