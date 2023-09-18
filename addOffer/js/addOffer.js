let inventoryItems = {
    categories: []
};
// used to fill the selection lists
let categorySelectionObj = null;
let subcategorySelectionObj = null;
let productSelectionObj = null;

// create inventoryItems object from session storage
JSON.parse(sessionStorage.getItem("inventory")).forEach(function (item) {
    const category = item.category;
    const subcategory = item.subcategory;
    const product = item.product;
    const product_id = item.product_id; // Assuming you have a 'product_id' property in your data
    let categoryObj = inventoryItems.categories.find((cat) => cat.name === category);
    // if category doesn't exist, create it
    if (!categoryObj) {
      categoryObj = { name: category, subcategories: [] };
      inventoryItems.categories.push(categoryObj);
    }
    let subcategoryObj = categoryObj.subcategories.find((subcat) => subcat.name === subcategory);
    // if subcategory doesn't exist, create it
    if (!subcategoryObj) {
      subcategoryObj = { name: subcategory, products: [] };
      categoryObj.subcategories.push(subcategoryObj);
    }
    subcategoryObj.products.push({ name: product, product_id: product_id });
  });
  

document.addEventListener('DOMContentLoaded', function() {
    // show all categories, subcategories and products
    fillCategories();
    fillSubcategories(null);
    fillProducts(null, null);

    // event listener for category selection
    selectCategory = document.querySelector('#select-category');
    selectCategory.addEventListener('change', function(event) {
        categorySelectionObj = inventoryItems.categories.find((category) => category.name === event.target.value) ?? null;
        if(event.target.value !== "") {
            // show subcategories and products in selected category
            fillSubcategories(categorySelectionObj);
            fillProducts(null, categorySelectionObj);
        }
        else{
            // show all subcategories and products
            fillSubcategories(null);
            fillProducts(null, null);
        }
    });
    
    // event listener for subcategory selection
    selectSubcategory = document.querySelector('#select-subcategory');
    selectSubcategory.addEventListener('change', function(event) {
        // get selected subcategory object
        subcategorySelectionObj = inventoryItems.categories.flatMap((category) => category.subcategories).filter((subcategory) => subcategory.name === event.target.value) ?? null;
        if(event.target.value !== "") {
            // show all products in subcategory
            fillProducts(subcategorySelectionObj, null);
            document.querySelector('#select-category').value = inventoryItems.categories.find((category) => {
                return category.subcategories.some((subcategory) => subcategory.name === event.target.value);
            }).name;
        }
        else{
            // show all products of category
            fillProducts(null, categorySelectionObj); 
        }
    });
    
    // event listener for product selection
    selectProduct = document.querySelector('#select-product');
    selectProduct.addEventListener('change', function(event) {
        if(event.target.value !== "") {
            // find selected product object
            productSelectionObj = (inventoryItems.categories.flatMap(category => category.subcategories).flatMap(subcategory => subcategory.products).find(product => product.name === event.target.value)) || null;
            // set rest of the selection to match product category and subcategory
            document.querySelector('#select-category').value = inventoryItems.categories.find(category => category.subcategories.some(subcategory => subcategory.products.some(product => product.name === event.target.value))).name;
            document.querySelector('#select-subcategory').value = inventoryItems.categories.flatMap(category => category.subcategories).find(subcategory => subcategory.products.some(product => product.name === event.target.value)).name;

        }
        else{
            // reset all selections
            productSelectionObj = null;
            fillSubcategories(null);
            fillProducts(null, null);
            fillCategories();
        }

    });

    $('#container').on('click', () => {
        $('#results-list').empty();
    });

    $('#search-input-field').on('focus', function() {
        var userInput = $(this).val();
        if(userInput === "") {
            productSelectionObj = null;
            fillSubcategories(null);
            fillProducts(null, null);
            fillCategories();
        }
    });

    $('#search-input-field').on('input', function() {
        var userInput = $(this).val();  // get's the user input
        displayResults(userInput);
        // set rest of the selection to match product category and subcategory
        $('.list-item').on('click', function(event) {
            document.querySelector('#search-input-field').value = event.target.innerText;
            document.querySelector('#select-category').value = inventoryItems.categories.find(category => category.subcategories.some(subcategory => subcategory.products.some(product => product.name === event.target.innerText))).name;
            document.querySelector('#select-subcategory').value = inventoryItems.categories.flatMap(category => category.subcategories).find(subcategory => subcategory.products.some(product => product.name === event.target.innerText)).name;
            document.querySelector('#select-product').value = inventoryItems.categories.flatMap(category => category.subcategories).flatMap(subcategory => subcategory.products).find(product => product.name === event.target.innerText).name;
            productSelectionObj = (inventoryItems.categories.flatMap(category => category.subcategories).flatMap(subcategory => subcategory.products).find(product => product.name === event.target.innerText)) || null;
        });
        if(userInput === ""){
            // reset all selections
            productSelectionObj = null;
            fillSubcategories(null);
            fillProducts(null, null);
            fillCategories();
        }
    });
});

function displayResults(userInput) {
    // clear previous results
    $('#results-list').empty();
    // show results
    inventoryItems.categories.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
            subcategory.products.forEach((product) => {
                if(product.name.toLowerCase().includes(userInput.toLowerCase())){
                    $('#results-list').append('<li class="list-item">' + product.name + '</li>');
                }
            });
        });
    });
}

function fillCategories() {
    // always show all categories
    $('#select-category').empty();
    $('#select-category').append('<option value="">All Categories</option>');
    inventoryItems.categories.forEach((category) => {
        $('#select-category').append('<option value="' + category.name + '">' + category.name + '</option>');
    });
}

function fillSubcategories(category) {
    $('#select-subcategory').empty();
    $('#select-subcategory').append('<option value="">All Subcategories</option>');
    // show all subcategories
    if(category === null){
        inventoryItems.categories.forEach((category) => {
            category.subcategories.forEach((subcategory) => {
                $('#select-subcategory').append('<option value="' + subcategory.name + '">' + subcategory.name + '</option>');
            });
        });
    }
    // show subcategories in category
    else{
        category.subcategories.forEach((subcategory) => {
            $('#select-subcategory').append('<option value="' + subcategory.name + '">' + subcategory.name + '</option>');
        });
    }
}

function fillProducts(subcategory, category) {
    $('#select-product').empty();
    $('#select-product').append('<option value="">All Products</option>');
    
    // show all products
    if(subcategory === null && category === null){
        inventoryItems.categories.forEach((category) => {
            category.subcategories.forEach((subcategory) => {
                subcategory.products.forEach((product) => {
                    $('#select-product').append('<option value="' + product.name + '">' + product.name + '</option>');
                });
            });
        });
    }
    else if(category !== null){
        // show all products in selected category
        category.subcategories.forEach((subcategory) => {
            subcategory.products.forEach((product) => {
                $('#select-product').append('<option value="' + product.name + '">' + product.name + '</option>');
            });
        });
    }
    else{
        // show all products in selected subcategory
        subcategory[0].products.forEach((product) => {
            $('#select-product').append('<option value="' + product.name + '">' + product.name + '</option>');
        });
    }
}


function newOffer() {
    // console.log(productSelectionObj.product_id);
    // console.log(parseInt(sessionStorage.getItem("userId")));
    // console.log(parseInt(sessionStorage.getItem("storeId")));
    // console.log(document.getElementById('price-input').value);
    if(productSelectionObj === null){
        alert("Please select a product");
        return;
    }
    else if(isNaN(parseFloat(document.getElementById('price-input').value.trim()))){
        alert("Please enter a price");
        return;
    }
    else { 
    $.ajax({
        type: "POST",
        url: "php/addOffer.php",
        data: {
            "user_id": parseInt(sessionStorage.getItem("userId")),
            "store_id": parseInt(sessionStorage.getItem("storeId")),
            "price": parseFloat(document.getElementById('price-input').value),
            "product_id": productSelectionObj.product_id
        },
        dataType: "json",
        success: function (response) {
            alert(response.message);
      },
        error: function (error,response) {
            alert("An error occurred while processing your request.");
        },
    });
    }
}
