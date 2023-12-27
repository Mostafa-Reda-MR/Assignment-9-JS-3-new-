var pname = document.getElementById("pname");
var purl = document.getElementById("purl");
var tableBody = document.getElementById("tbody");
var addBtn = document.getElementById("addBtn");
var productContainer;


if (localStorage.getItem("MyProduct") != null) {
    productContainer = JSON.parse(localStorage.getItem("MyProduct"));
    displayProducts(productContainer);
}
else{
    var productContainer = [];
}

// ---------------------------------------------[ Add Product ]------------------------------------------------

var myErrorModal = document.getElementById("myModal");

function addProduct() {
    if (validateName(pname.value) && validateURL(purl.value)) {
        var product = {
            ProductName : pname.value,
            ProductUrl : purl.value,
        }
    
        productContainer.push(product);
        localStorage.setItem("MyProduct" , JSON.stringify(productContainer))
        clearForm();
        displayProducts(productContainer);
    }
    else{
        myModal.classList.add('d-block');
    }
}

// ---------------------------------------------[ Clear Form ]------------------------------------------------

function clearForm() {
    pname.value = '';
    pname.classList.remove('is-invalid' , 'is-valid');
    purl.value = '';
    purl.classList.remove('is-invalid' , 'is-valid');
}

// ---------------------------------------------[ Display Products ]------------------------------------------------

function displayProducts(arr) {
    var cartoona = ``;
    var index = 0;

    for( var i = 0 ; i < arr.length ; i++){
        index = i + 1;
        cartoona +=`
        <tr>
            <td>${index}</td>
            <td>${arr[i].ProductName}</td>
            <td><button class="btn btn-warning"> <a href="${productContainer[i].ProductUrl}" target="_blank"> <i class="fa-solid fa-eye pe-2"></i> Visit</a> </button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`
    }

    tableBody.innerHTML = cartoona
}

// ---------------------------------------------[ Delete Product ]------------------------------------------------

function deleteProduct(productIndex) {
    productContainer.splice(productIndex , 1);
    localStorage.setItem("MyProduct" , JSON.stringify(productContainer));
    displayProducts(productContainer);
}

// ---------------------------------------------[ Validation ]------------------------------------------------

function validateName(name) {
    var regexName = /^[a-zA-Z]{2,}/;

    if (regexName.test(name)) {
        pname.classList.replace('is-invalid' , 'is-valid');
        return true;
    }
    else{
        pname.classList.add('is-invalid');
        return false;
    }
}


function validateURL(anything) {
    var regexURL = /^https:\/\/[a-zA-Z]+.[a-z]{1,10}/;

    if (regexURL.test(anything)) {
        purl.classList.replace('is-invalid' , 'is-valid');
        return true;
    }
    else{
        purl.classList.add('is-invalid');
        return false;
    }
}

function clearMassageError() {
    myModal.classList.remove('d-block');
}