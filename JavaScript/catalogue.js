var shoes = [
    {
        brand: 'VANS Red/Stripe',
        color: 'Red',
        size: 7,
        price: 350,
        in_stock: 5
	},

    {
        brand: 'VANS Blue/Stripe',
        color: 'Blue',
        size: 5,
        price: 100,
        in_stock: 10
	},

    {
        brand: 'VANS Purple/Stripe',
        color: 'Purple',
        size: 4,
        price: 100,
        in_stock: 2
	},
];

//generate handlebars templates
var source = document.getElementById('colorList').innerHTML;
var source2 = document.getElementById('sizeList').innerHTML;
var source3 = document.getElementById('brandList').innerHTML;
var template = Handlebars.compile(source);
var template2 = Handlebars.compile(source2);
var template3 = Handlebars.compile(source3);

//get comboboxes
var selectedColor = document.getElementById('selectColor');
var selectedSize = document.getElementById('selectSize');
var selectedBrand = document.getElementById('selectBrand');

//select html elements
var searchButton = document.getElementById('searchBTN');
var addButton = document.getElementById('addBTN');
var ul = document.querySelector('.ul');

var sourceResults = document.getElementById('outputItems').innerHTML;
var templateResults = Handlebars.compile(sourceResults);

//select image div element
var image = document.querySelector('.shoeIMG');
var display = document.querySelector('.searchResults');

//colorComboBox.innerHTML = template(shoes[0]);
window.onload = function () {
    populateElements();
}

function populateElements() {
    for (var i = 0; i < shoes.length; i++) {
        //create elements
        var optionColor = document.createElement('option');
        var optionSize = document.createElement('option');
        var optionBrand = document.createElement('option');

        optionColor.innerHTML = template(shoes[i]);
        optionSize.innerHTML = template2(shoes[i]);
        optionBrand.innerHTML = template3(shoes[i]);

        selectedColor.appendChild(optionColor);
        selectedSize.appendChild(optionSize);
        selectedBrand.appendChild(optionBrand);
    }
}



//Search Button
searchButton.addEventListener('click', function () {
    //clear unordered list
    ul.innerHTML = "";
    //get values from respective functions
    var inStock = checkForStock();
    var getPrice = checkForPrice();

    var storeOutput = [inStock, getPrice];

    if (storeOutput[1] === "N/A") {
        display.classList.remove('active');
        display.className += ' imageOutOfStock';
        ul.style.display = "none";
    } else {
            display.classList.remove('imageOutOfStock');
        ul.style.display = "block";
            display.className += ' active';
        };



        var searchResults = [{
            img: image,
            brand: selectedBrand.value,
            in_stock: inStock,
            price: getPrice,
            size: selectedSize.value,
            color: selectedColor.value
	}];


        ul.innerHTML = templateResults(searchResults[0]);
    }, false);



function checkForPrice() {
    //empty object to store stock
    var priceMap = {};

    //get the size, color user selected
    var getColor = selectedColor.value;
    var getSize = parseInt(selectedSize.value);
    var getBrand = selectedBrand.value;

    //loop through data object
    for (var i = 0; i < shoes.length; i++) {
        //save object values in variables
        var shoeList = shoes[i];
        var size = shoeList.size;
        var color = shoeList.color;
        var stock = shoeList.in_stock;
        var brand = shoeList.brand;
        var price = shoeList.price;


        //check the color that has been selected
        if (color === getColor && size === getSize && brand === getBrand) {

            //check if the value is undefined	
            if (priceMap[price] === undefined) {
                priceMap[price] = 0;
            }
            //add value to object
            priceMap[price] = +1;
        }
    }


    //loop through object
    for (var y in priceMap) {
        var itemPrice = y;
    }

    if (itemPrice === undefined) {
        return 'N/A'
    } else {
        return itemPrice;
    }
}

function checkForStock() {
    //empty object to store stock
    var stockMap = {};

    //get the size, color user selected
    var getColor = selectedColor.value.toLowerCase();
    var getSize = parseInt(selectedSize.value);
    var getBrand = selectedBrand.value;

    //loop through data object
    for (var i = 0; i < shoes.length; i++) {
        //save object values in variables
        var shoeList = shoes[i];
        var size = shoeList.size;
        var color = shoeList.color;
        var stock = shoeList.in_stock;
        var brand = shoeList.brand;
        var price = shoeList.price;

        console.log(stock);

        //check the color that has been selected
        if (brand === getBrand) {
            //check if the value is undefined	
            if (stockMap[stock] === undefined) {
                stockMap[stock] = 0;
            }
            //add value to object
            stockMap[stock] = +1;
        }
    }


    //loop through object
    for (var x in stockMap) {
        //save the stock in variable
        var inStock = x;
    }

    if (inStock === undefined) {
        return 'Out Of Stock'
    } else {
        return inStock;
    }
}


var addedColor = document.getElementById('addedColor');
var addedBrand = document.getElementById('addedBrand');
var addedSize = document.getElementsByName('addedSize');
var addedPrice = document.getElementById('addedPrice');
var addedStock = document.getElementById('addedStock');
var showModalBTN = document.getElementById('modalActive');
var modal = document.querySelector('.container2');
var closeModal = document.querySelector('.close');
var form = document.querySelector('.addingData');
var successForm = document.querySelector('.success');
var successBTN = document.getElementById('successBTN');
var errorAlert = document.querySelector('.errorAlert');
var errorMessage = document.getElementById('errorMessage');

//show modal
showModalBTN.addEventListener('click', function () {
    modal.classList.remove("inactiveModal");
    form.classList.remove("inactiveForm");
    form.classList.add('formActive');
    modal.classList.add("activeModal");
});

closeModal.addEventListener('click', function () {
    hideModal();
    form.classList.add('inactiveForm');
    form.classList.remove('formActive');
    clearInput();
});

successBTN.addEventListener('click', function() {
    hideModal();
    success();
    successForm.classList.remove('formActive');
});


//validations
function validations() {
     if (addedBrand.value === "" || isNaN(addedBrand.value) === false) {
        //return error 
        errorMessage.innerHTML = 'Brand Value Not A String or Is Empty. Please Try Again!';
         return true;
    } else {
        return false;
    }
    
       if (addedColor.value === "" || isNaN(addedColor.value) === false) {
        //return error 
        errorMessage.innerHTML = 'Color Value Not A String or Is Empty. Please Try Again!';
         return true;
    } else {
        return false;
    }
    
       if (addedPrice.value === "" || isNaN(addedPrice.value) === true) {
        //return error
        errorMessage.innerHTML = 'Price Value Not A Number or Is Empty. Please Try Again!';
         return true;
    } else {
        return false;
    }
    
       if (addedStock.value === "" || isNaN(addedStock.value) === true) {
        //return error
        errorMessage.innerHTML = 'Stock Value Not A Number or Is Empty. Please Try Again!';
         return true;
    } else {
        return false;
    }
}

//Add new Item Button
addButton.addEventListener('click', function () {
    var addedSizeSelect = 0;

    for (var i = 0; i < addedSize.length; i++) {
        if (addedSize[i].selected === true) {
            addedSizeSelect = addedSize[i].value;
        }
    }


   
    var errorPickedUP = validations();

    if (errorPickedUP === false) {
        //add data to object
        var data = {
            brand: addedBrand.value,
            color: addedColor.value,
            size: parseInt(addedSizeSelect),
            price: parseFloat(addedPrice.value),
            in_stock: addedStock.value
        };

        repopulateElements(data);
        
        success();
        
        clearInput();
    } else {
        failure();
        setInterval(function(){
        stopFailureMessage();
        }, 6000);        
    }
});

function repopulateElements(newItem) {
    //create elements
    var optionColor = document.createElement('option');
    var optionSize = document.createElement('option');
    var optionBrand = document.createElement('option');

    var colorResult = false;
    var brandResult = false;
    var sizeResult = false;

    for (var i = 0; i < shoes.length; i++) {
        if (shoes[i].color === newItem.color) {
            colorResult = true;
        }

        if (shoes[i].brand === newItem.brand) {
            brandResult = true;
        }

        if (shoes[i].size === newItem.size) {
            sizeResult = true;
        }
    }


    if (colorResult !== true) {
        optionColor.innerHTML = newItem.color;
        selectedColor.appendChild(optionColor);
    }


    if (brandResult !== true) {
        optionBrand.innerHTML = newItem.brand;
        selectedBrand.appendChild(optionBrand);
    }

    if (sizeResult !== true) {
        optionSize.innerHTML = newItem.size;
        selectedSize.appendChild(optionSize);
    }

    shoes.push(newItem);
}


function hideModal() {
    modal.classList.add("inactiveModal");
    modal.classList.remove("activeModal");

}

function success() {
    form.classList.add('inactiveForm');
    form.classList.remove('formActive');
    successForm.classList.add('formActive');
}

function failure() {
    errorAlert.classList.add('errorDisplay');
}

function stopFailureMessage() {
        errorAlert.classList.remove('errorDisplay');    
}

function clearInput() {
    addedBrand.value = "";
    addedColor.value = "";
    addedSize[0].selected = true;
    addedPrice.value = "";
    addedStock.value = "";
}