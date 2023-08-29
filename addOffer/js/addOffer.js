document.addEventListener('DOMContentLoaded', function() {
    // let inventory = JSON.parse(sessionStorage.getItem("inventory"));
    // console.log(inventory);
    // var pageContent = "";
    // var productsSet = new Set();
    // var categorySet = new Set();
    // var subCategorySet = new Set();

    const categorizedData = {};

    // iterate through the inventory and push distinct (categories, subcategories) to categorizedData
    JSON.parse(sessionStorage.getItem("inventory")).forEach(function(item) {
        const category = item.category;
        const subcategory = item.subcategory;
        const product = item.product;
        // add category to array if it doesn't exist    // var pageContent = "";
    // var productsSet = new Set();
    // var categorySet = new Set();
    // var subCategorySet = new Set();
        if (!categorizedData[category]) {
            categorizedData[category] = {};
        }
        // add subcategory to category in array if it doesn't exist
        if (!categorizedData[category][subcategory]) {
            categorizedData[category][subcategory] = [];
        }
        // push product to the subcategory
        categorizedData[category][subcategory].push(product);
    });
    const categorizedDataJSON = JSON.stringify(categorizedData);


    // var productsList = Array.from(productsSet);
    // var categoryList = Array.from(categorySet);
    // var subCategoryList = Array.from(subCategorySet);
    
    pageContent += '<div class="category-container">' + '<label for = "category">Select a category</label>' +
    '<select class = "select" name = "category">';
    categoryList.forEach(function(category){
        pageContent += '<option value="' + category + '">' + category + '</option>';
    });
    pageContent += '</select>' + '</div>';
    
    pageContent += '<div class="subcategory-container">' + '<label for = "subcategory">Select a subcategory</label>' +
    '<select class = "select" name = "subcategory">';
    subCategoryList.forEach(function(subcategory){
        pageContent += '<option value="' + subcategory + '">' + subcategory + '</option>';
    });
    pageContent += '</select>' + '</div>';
    
    pageContent += '<div class="product-container">' + '<label for = "product">Select a product</label>' + 
    '<select class = "select" name = "product">';
    productsList.forEach(function(product){
        pageContent += '<option value="' + product + '">' + product + '</option>';
    });
    pageContent += '</select>' + '</div>';
    document.getElementById("dropdown-container").innerHTML = pageContent; //change the content of the dropdown container div element
});