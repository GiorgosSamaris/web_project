document.addEventListener('DOMContentLoaded', function() {
    let inventory = JSON.parse(sessionStorage.getItem("inventory"));
    console.log(inventory);
    var pageContent = "";
    var productsSet = new Set();
    var categorySet = new Set();
    var subCategorySet = new Set();
    
    inventory.forEach(function(item){
        productsSet.add(item.product);
        categorySet.add(item.category);
        subCategorySet.add(item.subcategory);
    });
    
    var productsList = Array.from(productsSet);
    var categoryList = Array.from(categorySet);
    var subCategoryList = Array.from(subCategorySet);
    
    pageContent += '<div class="category-container">' + '<select>';
    categoryList.forEach(function(category){
        pageContent += '<option value="' + category + '">' + category + '</option>';
    });
    pageContent += '</select>' + '</div>';
    
    pageContent += '<div class="subcategory-container">' + '<select>';
    subCategoryList.forEach(function(subcategory){
        pageContent += '<option value="' + subcategory + '">' + subcategory + '</option>';
    });
    pageContent += '</select>' + '</div>';
    
    pageContent += '<div class="product-container">' + '<select>';
    productsList.forEach(function(product){
        pageContent += '<option value="' + product + '">' + product + '</option>';
    });
    pageContent += '</select>' + '</div>';
    
    document.getElementById("dropdown-container").innerHTML = pageContent; //change the content of the dropdown container div element
});