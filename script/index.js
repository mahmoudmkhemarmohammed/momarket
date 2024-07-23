window.onload = () => {
  !localStorage.getItem("logedin")
    ? window.location.replace("./assets/pages/login.html")
    : false;
};
const iconBars = document.querySelector("header .container .bars i"),
navBar = document.querySelector("header .container nav"),
accountUserIcon = document.querySelector("header .container nav .profile .icon i"),
shoppingCartIcon = document.querySelector("header .container nav .profile .bag i"),
allInputsAccount = document.querySelectorAll("header .container nav .profile .pass-account .inputs input"),
messageErrorContainer = document.querySelector("header .container nav .profile .pass-account .inputs p"),
inputCurrentPass = document.getElementById("cur-pas"),
inputNewPass = document.getElementById("new-pas"),
closeAccoutntUser = document.getElementById("close"),
sendData = document.getElementById("send"),
logOut = document.getElementById("log-out"),
accountBox = document.querySelector("header .container nav .profile .pass-account"),
slider = document.querySelector(".home .container .slider"),
productsDetailsContainer = document.querySelector(".products .container .products-details"),
productCartLength = document.querySelector("header .container nav .profile .bag span"),
allLisNav = document.querySelectorAll("header .container nav ul li"),
inputSearchProduct = document.querySelector(".products .container .search input");
let cardDetails = '',
dataProductCart,
btnScroller = document.querySelector(".btn-scroller");
// Handel Click NavBar For Small Device And Scroll To Section When Click
iconBars.addEventListener("click" , () => {
  if(!navBar.classList.contains("show")){
    navBar.classList.add("show");
    iconBars.style.color = 'red';
    iconBars.className = 'fa-solid fa-close show'
  }
  else {
    navBar.classList.remove("show");
    iconBars.style.color = '#FFF';
    iconBars.className = 'fa-solid fa-bars'
  }
})
allLisNav.forEach( li => {
  li.addEventListener("click" , (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({behavior: "smooth"});
    navBar.classList.remove("show");
  })
})
// Change Password Account And Valdutaion
accountUserIcon.addEventListener("click" , () => {
  accountBox.classList.add("show");
})
closeAccoutntUser.addEventListener("click" , () => {
  accountBox.classList.remove("show");
})
sendData.addEventListener("click" , () => {
  if(inputCurrentPass.value === "" || inputNewPass.value === "") {
    allInputsAccount.forEach( input => input.style.borderColor = 'red')
  }
  else {
    if(inputCurrentPass.value != JSON.parse(localStorage.pass_account)) {
      messageErrorContainer.innerHTML = "The Current password you've entered is incorrect."
    }
    else {
      localStorage.pass_account = JSON.stringify(inputNewPass.value);
      inputCurrentPass.value = '';
      inputNewPass.value = '';
      messageErrorContainer.innerHTML = ""
    }
  }
})
logOut.addEventListener("click" , () => {
  localStorage.removeItem("logedin");
  window.location.replace("./assets/pages/login.html");
})
const intervalSlider = () => {
  let counter = 0;
  setInterval(() => {
    counter += 11.1;
    slider.style.translate = `-${counter}%`;
    counter > 88 ? (counter = -11.1) : false;
  }, 6000);
};
intervalSlider();
const fetchDataCard = async () => {
  let card = '';
  await fetch("../assets/db/db.json").then( res => res.json())
  .then( data => {
    data.forEach( cards => {
      card += `
        <div class="card ${cards.category}">
            <div class="img">
                <img src="${cards.images[0]}" alt="">
            </div>
            <div class="text">
                <h3>${cards.title}</h3>
                <p>${cards.description.length > 30 ? cards.description.substring(0,30)+"..." : cards.description}</p>
                <h4>${cards.category}</h4>
                <div class="box">
                    <h5><span>${cards.price}</span>$</h5>
                    <button data-id="${cards.id}">Add To Cart</button>
                </div>
            </div>
        </div>
      `
    })
    document.querySelector(".products .container .products-box .product-card").innerHTML = card;
    ShowDetails(document.querySelectorAll(".products .container .products-box .product-card .img"));
    addToCart(document.querySelectorAll(".products .container .products-box .product-card .text button"), data)
  })
}
fetchDataCard()
// Show Details Product in Poup
const ShowDetails = (allCards) => {
  allCards.forEach( (card , index) => {
    card.addEventListener("click" , () => {
      fetch("../assets/db/db.json").then( res => res.json())
      .then(data => {
        setTimeout(() => {
          productsDetailsContainer.style.display = 'grid';
          productsDetailsContainer.style.opacity = '0';
          productsDetailsContainer.style.scale = '.1';
          setTimeout(() => {
            productsDetailsContainer.style.opacity = '.5';
            productsDetailsContainer.style.scale = '.5';
            setTimeout(() => {
              productsDetailsContainer.style.opacity = '1';
              productsDetailsContainer.style.scale = '1';
            },50)
          },50)
        },10)
        cardDetails = `
                        <div class="img">
                    <div class="all-img">
                        <img src="${data[index].images[0]}" class="active" alt="">
                        <img src="${data[index].images[1]}" alt="">
                        <img src="${data[index].images[2]}" alt="">
                    </div>
                    <div class="img-watch">
                        <img src="${data[index].images[0]}" alt="">
                    </div>
                </div>
                <div class="info-text">
                    <div class="title">
                        <h3>${data[index].title}</h3>
                    </div>
                    <div class="description">
                        <p>${data[index].description}</p>
                    </div>
                    <div class="category">
                        <h4>${data[index].category}</h4>
                    </div>
                    <div class="box">
                        <div class="price">
                            <span>Price</span>
                            <h3>${data[index].price}<small>$</small></h3>
                        </div>
                    </div>
                    <div class="close" onclick="hide()">
                        <i class="fa-solid fa-close"></i>
                    </div>
                </div>
        `
        productsDetailsContainer.innerHTML = cardDetails;
        document.querySelectorAll(".products .container .products-details .all-img img").forEach( img => {
          img.addEventListener("click" , function () {
            document.querySelectorAll(".products .container .products-details .all-img img").forEach( e => {
              e.classList.remove("active");
            })
            this.classList.add("active")
            document.querySelector(".products .container .products-details .img .img-watch img").src = this.src;
          })
        })
      })
    })
  })
}
const hide = () => {
  productsDetailsContainer.style.display = 'none';
}
// Add To Cart
localStorage.productCartShopping != null ? dataProductCart = JSON.parse(localStorage.productCartShopping) : dataProductCart = [];
const addToCart = ( cardId , data ) => {
  cardId.forEach( cartId => {
    cartId.addEventListener("click" , (e) => {
      if(dataProductCart.length <= 0) {
        dataProductCart.push({
          id: data[e.target.dataset.id - 1].id,
          title: data[e.target.dataset.id - 1].title,
          price: data[e.target.dataset.id - 1].price,
          images: data[e.target.dataset.id - 1].images,
          quantity: 1
        })
        localStorage.setItem("productCartShopping" , JSON.stringify(dataProductCart));
        productCartLength.innerHTML = dataProductCart.map( e => e.quantity).reduce((acc, el) => acc + el)
      }
      else {
        let checking = dataProductCart.find( (value) => value.id == e.target.dataset.id);
        if(checking) {
          return dataProductCart.map( el => {
            el.id == e.target.dataset.id ? { ...el , quantity: el.quantity += 1} : el;
            localStorage.setItem("productCartShopping" , JSON.stringify(dataProductCart));
            productCartLength.innerHTML = dataProductCart.map( e => e.quantity).reduce((acc, el) => acc + el)
          })
        }
        else {
          dataProductCart.push({
            id: data[e.target.dataset.id - 1].id,
            title: data[e.target.dataset.id - 1].title,
            price: data[e.target.dataset.id - 1].price,
            images: data[e.target.dataset.id - 1].images,
            quantity: 1
          })
          localStorage.setItem("productCartShopping" , JSON.stringify(dataProductCart));
          productCartLength.innerHTML = dataProductCart.map( e => e.quantity).reduce((acc, el) => acc + el)
        }
      }
    })
  })
}
dataProductCart.length != 0 ? productCartLength.innerHTML = dataProductCart.map( e => e.quantity).reduce((acc, el) => acc + el) : false;
// Filter Products
document.querySelectorAll(".products .container .products-box .menue ul li").forEach( li => {
  li.addEventListener("click" , (e) => {
    document.querySelectorAll(".products .container .products-box .menue ul li").forEach( el => {
      el.classList.remove("active");
    })
    e.target.classList.add("active");
    document.querySelectorAll(".products .container .products-box .product-card .card").forEach( card => {
      card.style.display = 'none';
      document.querySelectorAll(e.target.dataset.cat).forEach( ele => {
        setTimeout(() => {
          ele.style.display = 'block'
          ele.style.opacity = '0'
          setTimeout(() => {
            ele.style.opacity = '.5'
            ele.style.rotate = '-10deg'
            setTimeout(() => {
              ele.style.opacity = '1'
              ele.style.rotate = '10deg'
              setTimeout(() => {
                ele.style.rotate = '0deg'
              }, 100)
            }, 100)
          }, 100)
        }, 100)
      })
    })
  })
})
// Search Products
inputSearchProduct.addEventListener("keyup" , (event) => {
  fetch("../assets/db/db.json").then(res => res.json())
  .then( data => {
    let cardSearch = ""
    data.forEach( el => {
      if(el.title.toLowerCase().includes(event.target.value.toLowerCase()) || el.category.toLowerCase().includes(event.target.value.toLowerCase())){
        cardSearch += `
            <div class="card ${el.category}">
            <div class="img">
                <img src="${el.images[0]}" alt="">
            </div>
            <div class="text">
                <h3>${el.title}</h3>
                <p>${el.description.length > 30 ? el.description.substring(0,30)+"..." : el.description}</p>
                <h4>${el.category}</h4>
                <div class="box">
                    <h5><span>${el.price}</span>$</h5>
                    <button data-id="${el.id}">Add To Cart</button>
                </div>
            </div>
        </div>
        `
      }
    })
    document.querySelector(".products .container .products-box .product-card").innerHTML = cardSearch;
  })
})
shoppingCartIcon.addEventListener("click" , () => window.location.assign("./assets/pages/shopping-cart.html"));
window.addEventListener("scroll" , () => {
  scrollY >= 650 ? btnScroller.style.display = 'block' : btnScroller.style.display = 'none';
})
btnScroller.addEventListener("click" , () => {
  scroll({top: 0,
    behavior: "smooth"
  })
})