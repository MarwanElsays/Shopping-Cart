let label = document.getElementById("label");
let carticon = document.getElementById("cartQuantity");
let ShoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let amount = 0;

let calculate = () =>{
    let carticon = document.getElementById("cartQuantity");
    basket.map((x)=>{
      let search = shopitems.find((y) => y.id === x.id);
      amount+=x.quantity*search.price;
    })
    carticon.innerHTML = basket.map((x) => x.quantity).reduce((x,y) => x+y,0);
}

calculate();

function menu(){
  label.innerHTML = `
  <h2>Total Bill $ ${amount} </h2>
  <button onclick="purchase()" class="checkout">Checkout</button>
  <button onclick="clearCart()" class="removeAll">Clear Cart</button>
  `;
}

menu();

let generateCartItems = () => {
    if (basket.length !== 0) {
      return (ShoppingCart.innerHTML = basket
        .map((x) => {
          let { id, quantity } = x;
          let search = shopitems.find((y) => y.id === id) || [];
          return `
        <div class="cart-item" id=${"product"+id}>
          <img width="100" src=${search.imgsrc} alt="" />
          <div class="details">
            <div class="title-price-x">
                <h4 class="title-price">
                  <p>${search.Title}</p>
                  <p class="cart-item-price">$ ${search.price}</p>
                </h4>
                <i  onclick="removeItem(${id})" class='bx bx-x'></i>
            </div>
            <div class="buttons">
                <i onclick="decrease(${id})" class='bx bx-minus'></i>
                <div id=${id} class="quantity">${quantity}</div>
                <i onclick="increase(${id})" class='bx bx-plus'></i>
            </div>
            <h3 id=${id+id}>$ ${quantity * search.price}</h3>
          </div>
        </div>
        `;
        })
        .join(""));
    } else {
        clear();
    }
};

function clear(){
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
}
  
generateCartItems();

let increase = (item) =>{
    let itemId = item.id;
    let tpriceId = itemId+itemId;
    let search = basket.find((x) => x.id === itemId)
    let search1 = shopitems.find((y) => y.id === itemId) 

    if(search === undefined){
        basket.push({
            id:itemId,
            quantity:1,
        })
    }
    else{
        search.quantity++;
    }
    document.getElementById(itemId).innerHTML++
    let z = document.getElementById(itemId).innerHTML;
    document.getElementById(tpriceId).innerHTML = "$ " + z*search1.price;
    amount=amount+search1.price;
    menu();
    cartQuantity.innerHTML++;
    localStorage.setItem("data",JSON.stringify(basket));
};

let decrease = (item) =>{
  console.log(item);
    let itemId = item.id;
    let tpriceId = itemId+itemId;
    let search1 = shopitems.find((y) => y.id === itemId) 
    if(document.getElementById(itemId).innerHTML == 0)return;
    let search = basket.find((x) => x.id === itemId)
    search.quantity--;
    document.getElementById(itemId).innerHTML--;
    let z = document.getElementById(itemId).innerHTML;
    document.getElementById(tpriceId).innerHTML = "$ " + z*search1.price;
    amount=amount-search1.price;
    menu();
    if(document.getElementById(itemId).innerHTML == 0)removeItem(item);
    cartQuantity.innerHTML--;
    basket = basket.filter((x) => x.quantity !== 0);
    localStorage.setItem("data",JSON.stringify(basket));
};

let removeItem = (item) =>{
    let itemId = "product"+item.id;
    let z = document.getElementById(itemId); 
    cartQuantity.innerHTML-=document.getElementById(item.id).innerHTML; 
    let search1 = shopitems.find((y) => y.id === item.id) 
    amount = amount - document.getElementById(item.id).innerHTML*search1.price;
    menu();
    z.remove();
    basket = basket.filter((x) => x.id !== item.id);
    if (basket.length === 0)clear();
    localStorage.setItem("data", JSON.stringify(basket));
}



let clearCart = () => {
  basket = [];
  carticon.innerHTML=0;
  clear();
  localStorage.setItem("data", JSON.stringify(basket));
};

let purchase = () =>{
  alert("Your Purchase is Succesful");
  basket = [];
  carticon.innerHTML=0;
  clear();
  localStorage.setItem("data", JSON.stringify(basket));
}

