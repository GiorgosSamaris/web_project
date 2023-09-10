if(userId < 0){
    const profileButton = document.getElementById("profile-button-label");
    profileButton.innerText = "Admin Dashboard";
    const profileContainer = document.getElementById("profile-container");
    profileButton.addEventListener("click", async function(){
        if(mapButtonLabel.classList.contains("active")){
            mapButtonLabel.classList.remove("active");
        }
        if(profileContainer.classList.contains("profile-container-inv") && mapContainer.classList.contains("map-vis")){
            profileContainer.classList.remove("profile-container-inv");
            profileContainer.classList.add("profile-container-vis");
            mapContainer.classList.remove("map-vis");
            mapContainer.classList.add("map-inv");
            generateAdminDashboardContent();
        } 
    });
}

function generateAdminDashboardContent() {
    profileContainer = document.getElementById('profile-container');
    var storeData = '';
    var productData = '';
    var statistics = '';
    var leaderboard = '';

    //product data container
    productData = '<div id = "product-data-edit-container">' + 
                '<input type="file" id="product-file" name="product-file" accept=".json" />' +
                '</div>';
    //store data container
    storeData += '<div id = "store-data-edit-container">' + 
                '<input type="file" id="store-file" name="store-file" accept=".geojson" />' +
                '</div>';

    
    //statistics container
    statistics += '<div id = "statistics-container">' + 
                    '<div id ="offers-diagram-container">' + '</div>' +
                    '<div id ="sales-diagram-container">' + '</div>' +
                    '</div>';
    
    //leaderboard container
    leaderboard += '<div id = "leaderboard-container">' +
                    '<div id = "list-container">' + '</div>' +
                    '</div>';
    
    //profile content
    profileContent = '<div id = "admin-profile-container">' + 
                        productData + storeData + 
                        statistics + leaderboard + '</div>';
    profileContainer.innerHTML = profileContent;
}



async function deleteOffer(offer_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/delete_offer.php',
            data: {
                offer_id: offer_id
            },
            success: function (deleted) {
                resolve(deleted);
            },
            error: function (error) {
                reject(error);
            }
        });
});
}
