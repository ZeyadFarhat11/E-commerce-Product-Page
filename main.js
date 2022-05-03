const select = ele => document.querySelector(ele);
const selectAll = ele => document.querySelectorAll(ele);

let cart = select(".cart");
let buyBtn = select(".to-cart");
let plusBtn = select(".product-counter .plus");
let counter = select(".product-counter span");
let minusBtn = select(".product-counter .minus");


// cart btn
select(".cart-btn").onclick = function () {
    select(".cart").classList.toggle("visible");
    select(".cart-btn").classList.remove("unseen");
    select(".cart-btn").setAttribute("data-products", "0");
}

// menu btn
select(".menu-btn").onclick = function () {
    select("nav").classList.add("active");
    document.body.classList.add("blur");
    cart.classList.remove("visible");
}

// close menu 
select("nav .close").onclick = function () {
    this.parentNode.classList.remove("active");
    document.body.classList.remove("blur");
}
// close menu by clickout it
window.onclick = function (e) {
    if (e.path[0] === document.body && document.body.classList.contains("blur")) {
        select("nav .close").click();
        document.body.classList.remove("blur");
    }
}


// increase products
plusBtn.onclick = function () {
    counter.textContent = `${Number(counter.textContent) + 1}`;
}

// decrease products
minusBtn.onclick = function () {
    if (counter.textContent > 0) {
        counter.textContent -= 1;
    }
}

// plus img switcher
select(".gallery .fa-angle-right").onclick = function () {
    let imgSrc = this.parentNode.firstElementChild.getAttribute("src");
    switch (imgSrc) {
        case "images/image-product-1.jpg":
            this.parentNode.firstElementChild.setAttribute("src", "images/image-product-2.jpg")
            break;
        case "images/image-product-2.jpg":
            this.parentNode.firstElementChild.setAttribute("src", "images/image-product-3.jpg")
            break;
        case "images/image-product-3.jpg":
            this.parentNode.firstElementChild.setAttribute("src", "images/image-product-4.jpg")
            break;
        case "images/image-product-4.jpg":
            this.parentNode.firstElementChild.setAttribute("src", "images/image-product-1.jpg")
            break;
        default:
            this.parentNode.firstElementChild.setAttribute("src", "images/image-product-1.jpg")
    }
}

// minus img switcher
select(".gallery .fa-angle-left").onclick = function () {
    let imgSrc = this.parentNode.firstElementChild.getAttribute("src");
    switch (imgSrc) {
        case "images/image-product-1.jpg":
            this.parentNode.firstElementChild.setAttribute("src", "images/image-product-4.jpg")
            break;
        case "images/image-product-2.jpg":
            this.parentNode.firstElementChild.setAttribute("src", "images/image-product-1.jpg")
            break;
        case "images/image-product-3.jpg":
            this.parentNode.firstElementChild.setAttribute("src", "images/image-product-2.jpg")
            break;
        case "images/image-product-4.jpg":
            this.parentNode.firstElementChild.setAttribute("src", "images/image-product-3.jpg")
            break;
        default:
            this.parentNode.firstElementChild.setAttribute("src", "images/image-product-1.jpg")
    }
}

// desktop img switcher
selectAll(".gallery .thumb").forEach(function (img) {
    img.onclick = function () {
        selectAll(".gallery .thumb").forEach(function (ele) {
            ele.classList.remove("active");
        })
        this.classList.add("active");
        select(".gallery img:first-child").setAttribute("src", this.getAttribute("src").split("-thumbnail").join(""));
    }
});


// add products to cart

buyBtn.onclick = function () {
    if (counter.textContent >= 1) {
        cart.classList.remove("visible");
        select(".cart-btn").setAttribute("data-products", `${Number(select(".cart-btn").getAttribute("data-products")) + Number(counter.textContent)}`);
        select(".cart-btn").classList.add("unseen");
        // product
        let newProduct = document.createElement("div");
        newProduct.classList.add("product");
        newProduct.innerHTML =
            `
        <img src="images/image-product-1.jpg" alt="product" class="pro-img">
        <p>
            ${select(".info > h1").textContent}
            <br>
            <span data-total="${select("h2.price").textContent.slice(1) * counter.textContent}">
            ${select("h2.price").textContent} x ${counter.textContent}
            </span>
        </p>
        <img src="images/icon-delete.svg" alt="delete" class="trash">
        `;
        cart.classList.remove("empty");
        select(".cart .cart-content").prepend(newProduct);
        select(".cart-content button").classList.add("visible")
    }
    counter.textContent = "0";
    // remove product
    selectAll(".trash").forEach(function (e) {
        e.onclick = function () {
            this.parentNode.remove();
            if (selectAll(".cart .product").length < 1) {
                select(".cart-content button").classList.remove("visible");
                cart.classList.add("empty");
            }
        }
    });
    // checkout and remove products
    select(".cart-content button").onclick = function () {
        this.classList.remove("visible");
        cart.classList.add("empty");
        selectAll(".cart .product").forEach(function (pro) {
            pro.remove()
        })
    }
}