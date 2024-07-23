const cartContainer = document.getElementById("cart-container"),
  total = document.getElementById("total");
totalBtn = document.getElementById("total-btn");
let dataProductCart,
  contentCart = "";
localStorage.productCartShopping != null
  ? (dataProductCart = JSON.parse(localStorage.productCartShopping))
  : (dataProductCart = []);
const showDataShoppingCart = () => {
  contentCart = "";
  dataProductCart.forEach((el, i) => {
    contentCart += `
                        <div class="box-cart">
                            <div class="img">
                                <img src="../../${el.images[0]}" alt="">
                            </div>
                            <div class="details">
                                <div class="info">
                                    <h4>${el.title}</h4>
                                    <p>${el.price * el.quantity}$</p>
                                </div>
                                <div class="quantity">
                                    <h4>Quantity</h4>
                                    <p>${el.quantity}</p>
                                </div>
                                <div class="delete">
                                    <h4>Delete</h4>
                                    <i onclick="deleteCart(${i})" class="fa-solid fa-trash"></i>
                                </div>
                            </div>
                        </div>
        
        `;
  });
  cartContainer.innerHTML = contentCart;
  dataProductCart.length != 0
    ? (total.innerHTML = `${dataProductCart
        .map((e) => e.price * e.quantity)
        .reduce((acc, el) => acc + el)}$`)
    : (total.innerHTML = "0");
  dataProductCart.length != 0
    ? (totalBtn.innerHTML = `${dataProductCart
        .map((e) => e.price * e.quantity)
        .reduce((acc, el) => acc + el)}$`)
    : (totalBtn.innerHTML = "0");
};
showDataShoppingCart();
const deleteCart = (i) => {
  dataProductCart.splice(i, 1);
  localStorage.setItem("productCartShopping", JSON.stringify(dataProductCart));
  showDataShoppingCart();
};
