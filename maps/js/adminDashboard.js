let selectYear;
let selectMonth;
let selectDate;
let selectedValue;
let selectedCategory;
let selectedSubcategory;
let totalPages;
const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
let offerChart;


async function generateAdminDashboardContent() {
    profileContainer = document.getElementById('profile-container');
    let profileContent = '';
    let offer_count = await fetchOfferCount();
    let user_leaderboard = await fetchUserLeaderboard();
    let categories = await getCategories();
    let subcategories = await getSubcategories();
    let categoriesMerged = [];
    let discounts = await getPriceDrop('2023-09-06', 'e4b4de2e31fc43b7b68a0fe4fbfad2e6', 'category');
    categories.forEach(function (category) {
        categoryObj = { name: category.name, id: category.category_id, subcategories: [] };
        categoriesMerged.push(categoryObj);
        subcategories.forEach(function (subcategory) {
            if (subcategory.category_id === category.category_id) {
                categoryObj.subcategories.push(subcategory);
            }
        });
    });
    //extracts the first 4 characters of the date string
    const distinctYears = [...new Set(offer_count.map(row => row.offer_date.substring(0, 4)))]; 
    const distinctMonths = [...new Set(offer_count.map(row => { 
        const monthValue  = parseInt(row.offer_date.substring(5, 7));
        return monthNames[monthValue - 1];
    }))];
    //product data container
    profileContent = '<div id = "data-input-container">' +
                        '<div id = "product-data-edit-container">' + 
                            '<div id = "input-container">' +
                                '<div id = "product-input-container">' +
                                    '<label id = "product-file-label" for = "product-file">Select a products  with categories file (Mandatory)</label>' +
                                    '<input type="file" id="product-file" name="product-file" accept=".json" />' + 
                                '</div>' +
                                '<div id = "price-input-container">' +
                                    '<label id = "price-file-label" for = "price-file">Select a prices file (Optional)</label>' +
                                    '<input type="file" id="price-file" name="price-file" accept=".json" />' +
                                '</div>' +    
                            '</div>' + 
                            '<button type="button" class="submit-products" id="submit-products-button" onclick="submitProducts()"> Submit Products </button>'+
                        '</div>'+
                        '<div id = "store-data-edit-container">' + 
                            '<div id = "store-input-container">' +
                                '<label id = "store-file-label" for = "store-file">Select a stores file (Optional)</label>' +
                                '<input type="file" id="store-file" name="store-file" accept=".geojson" />' +
                            '</div>' +
                            '<button type="button" class="submit-stores" id="submit-stores-button" onclick="submitStores()"> Submit Stores </button>'+
                        '</div>' +
                    '</div>';

    //statistics container
    profileContent +=  '<div id ="offers-diagram-container">' +
                            '<span id = "offers-select-container">' +
                                '<div id = "select-year-container">' +
                                    '<label for = "select-year" >Select Year: </label>' +
                                    '<select id = "select-year" name = "select-year">' + 
                                    '</select>' + 
                                '</div>' + '&nbsp' +
                                '<div id = "select-month-container">' +
                                    '<label for = "select-month" id = "select-month-label">Select Month: </label>' +
                                    '<select id = "select-month" name = "select-month">' + 
                                        '<option value = "All Months">All Months</option>' +
                                    '</select>' +
                                '</div>' +
                            '</span>' +
                            '<canvas id="offers-chart"></canvas>' + 
                        '</div>' +
                        '<div id ="average-discount-diagram-container">' + 
                            "<div id = 'average-discount-select-container'>" +
                                '<label for = "select-date">Select Date: </label>' +
                                '<input type = "date" id = "select-date" name = "select-date" value = "2023-09-06">' + '<br>' + 
                                '<label for = "select-category" id = "select-cat-label">Select Category or Subcategory: </label>' +
                                '<select id = "select-category" name = "select-category">' +
                                '</select>' +
                            '</div>' +
                            '<canvas id="average-discount-chart"></canvas>' + 
                        '</div>';


    // leaderboard container
    profileContent += '<div id = "leaderboard-container">' + 
                        '<div id = "list-container">' + '<label>Leaderboard</label>' +
                            '<ul id = "leaderboard-list" aria-live = "polite">';
    profileContent += '</ul>' +
                        '<nav id = "page-selection-container">' + 
                            '<button class = "navigation-button" id = "previous-button" title = "Previous Page" aria-label="Previous page"> \&lt\; Previous Page</button>' + 
                            '<select id="page-dropdown" title="Select Page" aria-label="Select Page"></select>' +
                            '</select>'+
                            '<button class = "navigation-button" id = "next-button" title = "Previous Page" aria-label="Next page"> Next Page \&gt\;</button>' + 
                        '</nav>' + 
                    '</div>' +
                '</div>';
    
    //profile content
    profileContainer.innerHTML = profileContent;

    const offersChart = document.getElementById('offers-chart');
    const discountsChart = document.getElementById('average-discount-chart');

    const itemsPerPage = 10; // Number of items to display per page
    let currentPage = 1; // Current page number
    const leaderboardList = document.getElementById('leaderboard-list');
    const previousButton = document.getElementById('previous-button');
    const nextButton = document.getElementById('next-button');
    // const pageNumbers = document.getElementById('page-numbers');

    selectDate = document.getElementById('select-date');
    selectYear = document.getElementById('select-year');
    selectMonth = document.getElementById('select-month');
    selectCategorySubcategory = document.getElementById('select-category');

    function displayPage(page) {
        leaderboardList.innerHTML = ''; // Clear the list
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
    
        for (let i = startIndex; i < endIndex && i < user_leaderboard.length; i++) {
            const user = user_leaderboard[i];
            leaderboardList.innerHTML += '<li id = "leaderboard-list-item">' + 
                                            'Username: ' + user.username + 
                                            '<div id = "leaderboard-list-item-tokens-container">' +
                                                '\nOverall Score: ' + user.overall_score +  '<br>' +
                                                '\nLast month\'s tokens: ' + user.last_months_tokens + '<br>' + 
                                                '\nOverall tokens: ' + user.overall_tokens +
                                            '</div>' +
                                        '</li>';

            
            // listItem.textContent =
            //         'Username: ' + user.username +
            //         leaderboardListItemTokensDiv.innerHTML +
            //             '\nLast month\'s tokens: ' + user.last_months_tokens +
            //             '\nOverall tokens: ' + user.overall_tokens;
            //         leaderboardListItemTokensDiv.innerHTML += '</div>';
            // listItem.innerHTML += '</div>';

            // leaderboardList.appendChild(listItem);
        }
    }
    
    // Initial page display
    displayPage(currentPage);
    
    // Event listeners for navigation buttons
    previousButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
            updatePageDropdown()
        }
    });
    
    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(user_leaderboard.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayPage(currentPage);
            updatePageDropdown()
        }
    });
    
    function updatePageDropdown() {
        totalPages = Math.ceil(user_leaderboard.length / itemsPerPage); // Calculate total number of pages
        const pageDropdown = document.getElementById('page-dropdown');  // Get the page dropdown element
        pageDropdown.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) { // Add an option for each page
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Page ${i}`;   // Set the option text to the page number
            pageDropdown.appendChild(option);
        }
    
        // Set the selected option to the current page
        pageDropdown.value = currentPage;
        previousButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }
    
    // Event listener for page dropdown select change
    const pageDropdown = document.getElementById('page-dropdown');
    pageDropdown.addEventListener('change', () => {
        const selectedPage = parseInt(pageDropdown.value); // Get the selected page number
        if (!isNaN(selectedPage) && selectedPage >= 1) { // If the selected page is valid
            currentPage = selectedPage;
            displayPage(currentPage);
            previousButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
        }
    });
    
    // Initial page dropdown setup
    updatePageDropdown();

    distinctYears.forEach((year) => {   //adds the years to the select element
        selectYear.innerHTML += '<option value = "' + year + '">' + year + '</option>';
    });

    distinctMonths.forEach((month) => {  //adds the months to the select element
        selectMonth.innerHTML += '<option value = "' + month + '">' + month + '</option>';
    });

    categoriesMerged.forEach((category) => {    //adds the categories and subcategories to the select element
        selectCategorySubcategory.innerHTML += '<option value="' + category.id + '">' + category.name + '</option>';
        category.subcategories.forEach((subcategory) => {
            selectCategorySubcategory.innerHTML += '<option value = "' + subcategory.subcategory_id + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + subcategory.name + '</option>';
        });
    });

    generateOffersCountChart(offersChart, offer_count, selectYear, selectMonth);
    generateAverageDiscountChart(discountsChart, discounts);
    
    selectYear.addEventListener('change', function(){
        offerChart.data.datasets.label = 'Displayed: ' + selectYear.value + ' ' + selectMonth.value;

    });

    selectMonth.addEventListener('change', function(event){
        if(event.target.value != 'All Months')
        {
            const selectedYear = selectYear.value;  //gets the selected year
            const selectedMonth = monthNames.indexOf(selectMonth.value) + 1; //gets the selected month
            const dateLabels = generateDates(selectedYear, selectedMonth); //generates an array of dates for the selected month

            const countLabels = dateLabels.map((date) => {  //maps the dateLabels array to an array of offer counts
                const offer = offer_count.find((row) => row.offer_date === '2023-' + date);   //finds the row with the same date as the current date in the loop
                if(offer) {
                    return parseInt(offer.offer_count);
                } else {
                    return 0;
                }
            });
            offerChart.data.labels = dateLabels;    //sets the labels and data of the chart to the new values
            offerChart.data.datasets[0].data = countLabels; 
            offerChart.data.datasets[0].label = 'Displayed: ' + selectedYear + ' ' + selectMonth.value;
            offerChart.update();
        } else if(event.target.value === 'All Months'){

            offerChart.data.labels = offer_count.map(row => row.offer_date);
            offerChart.data.datasets[0].data = offer_count.map(row => parseInt(row.offer_count));
            offerChart.data.datasets[0].label = 'Displayed: ' + selectYear.value + ' ' + selectMonth.value;
            offerChart.update();
        }
    }); 

    selectDate.addEventListener('change', async function(event){
        selectDate.value = event.target.value;
        console.log(selectDate.value);
        
        if(selectedSubcategory) {
            console.log(selectDate.value);
            console.log(await getPriceDrop(selectDate.value, selectedSubcategory.subcategory_id, 'subcategory'));
            const priceDropData = await getPriceDrop(selectDate.value, selectedSubcategory.subcategory_id, 'subcategory');
            discountChart.data.labels = priceDropData.map(row => row.drop_date);
            discountChart.data.datasets[0].data = priceDropData.map(row => parseFloat(row.drop_percentage));
            discountChart.data.datasets[0].label = 'Displayed: ' +  selectedSubcategory.name + ' ' + 'Week: ' + updateLegend(selectDate.value);
            discountChart.update();
        }else if(selectedCategory) {
            console.log(selectDate.value);
            console.log(await getPriceDrop(selectDate.value, selectedCategory.id, 'category'));

            const priceDropData = await getPriceDrop(selectDate.value, selectedCategory.id, 'category');
            discountChart.data.labels = priceDropData.map(row => row.drop_date);
            discountChart.data.datasets[0].data = priceDropData.map(row => parseFloat(row.drop_percentage));
            discountChart.data.datasets[0].label = 'Displayed: ' + selectedCategory.name + ' ' + 'Week: ' + updateLegend(selectDate.value);
            discountChart.update();
        }
        else {
            console.log("error");
        }
    });

    selectCategorySubcategory.addEventListener('change', async function(event){
        // find whether the selected value is a category or a subcategory
        selectedValue = event.target.value;
        selectedCategory = categoriesMerged.find((category) => category.id === selectedValue);
        selectedSubcategory = categoriesMerged.flatMap((category) => category.subcategories).find((subcategory) => subcategory.subcategory_id === selectedValue);
        
        if(selectedSubcategory) {
            const priceDropData = await getPriceDrop(selectDate.value, selectedSubcategory.subcategory_id, 'subcategory');
            discountChart.data.labels = priceDropData.map(row => row.drop_date);    //sets new y values
            discountChart.data.datasets[0].data = priceDropData.map(row => parseFloat(row.drop_percentage));    //sets new x values    
            discountChart.data.datasets[0].label = 'Displayed: ' + selectedSubcategory.name + ' ' + 'Week: ' + updateLegend(selectDate.value);    //sets new legend
            discountChart.update();
        }else if(selectedCategory) {
            const priceDropData = await getPriceDrop(selectDate.value, selectedCategory.id, 'category');
            discountChart.data.labels = priceDropData.map(row => row.drop_date);
            discountChart.data.datasets[0].data = priceDropData.map(row => parseFloat(row.drop_percentage));
            discountChart.data.datasets[0].label = 'Displayed: ' + selectedCategory.name + ' ' + 'Week: ' + updateLegend(selectDate.value);
            discountChart.update();
        }
        else {
            console.log("error");
        }
    });
}
                    
function generateDates(year, month) {
    const labels = [];
    const daysInMonth = new Date(year, month, 0).getDate(); //gets the number of days in the month by getting the date of the last day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateString =  month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');  //creates a date string in the format MM-DD
        labels.push(dateString);
        //padStart adds a 0 in front of the number if it is less than 10 (e.g. 1 -> 01)
    }
    return labels;
}

function updateLegend(start_date) {
    end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + 7);
    return start_date + ' - ' + end_date.toISOString().substring(5, 10);    
}

function generateOffersCountChart(offersChart, offer_count, selectYear, selectMonth) {        
    if(offersChart)
    {
      offerChart = new Chart(offersChart,
        {
          type: 'line',
          data: {
            labels: offer_count.map(row => row.offer_date),
            datasets: [
              {
                  borderColor: 'blue',
                  backgroundColor: 'white',
                  label: 'Displayed: ' + selectYear.value + ' ' + selectMonth.value,
                  data: offer_count.map(row => parseInt(row.offer_count)),
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Offers per month',
                    color: 'black',
                    font: {
                        size: 18,
                        color: 'black',
                        weight: 'bold',
                    },
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            color: 'black',
                            size : 14,
                            weight: 'bold',
                        },
                    },
                },
            },
            scales: {
                x: {
                    display: true,
                    ticks: {
                        // stepSize: 1,
                        maxTicksLimit: 15,
                        font: {
                            color: 'black',
                            size : 12,
                            weight: 'bold',
                        },
                    },
                    title: {
                        display: true,
                        text: 'Date',
                        font: {
                            color: 'black',
                            size : 12,
                            weight: 'bold',
                        },
                    },
                },
                y: {
                    display: true,
                    ticks: {
                        // beginAtZero: true,
                        stepSize: 20,
                        maxTicksLimit: 100,
                        font: {
                            color: 'black',
                            size : 12,
                            weight: 'bold',
                        },
                    },
                    title: {
                        display: true,
                        text: 'Number of offers',
                        font: {
                            color: 'black',
                            size : 12,
                            weight: 'bold',
                        },
                    },
                }
            },
          },
      });
  } else {
      console.log("offersChart is null");
  }
}

function generateAverageDiscountChart(discountsChart, average_discount) {
    // console.log(selectedCategory);
    // console.log(selectedSubcategory);
    if(discountsChart)
    {
      discountChart = new Chart(discountsChart,
        {
          type: 'line',
          data: {
            labels: average_discount.map(row => row.drop_date), //x axis
            datasets: [ //y axis
              {
                  borderColor: 'blue',
                  backgroundColor: 'white',
                  label: 'Displayed: ' + 'Αντισηπτικά' + ' ' + 'Week: ' + updateLegend(selectDate.value),
                  data: average_discount.map(row => parseFloat(row.drop_percentage)),
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Discount value per month',
                    color: 'black',
                    font: {
                        size: 18,
                        color: 'black',
                        weight: 'bold',
                    },
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            color: 'black',
                            size : 14,
                            weight: 'bold',
                        },
                    },
                },
            },
            scales: {
                x: {
                    display: true,
                    ticks: {
                        // stepSize: 1,
                        maxTicksLimit: 15,
                        font: {
                            color: 'black',
                            size : 12,
                            weight: 'bold',
                        },
                    },
                    title: {
                        display: true,
                        text: 'Date',
                        font: {
                            color: 'black',
                            size : 12,
                            weight: 'bold',
                        },
                    },
                },
                y: {
                    display: true,
                    ticks: {
                        // beginAtZero: true,
                        stepSize: 20,
                        maxTicksLimit: 100,
                        font: {
                            color: 'black',
                            size : 12,
                            weight: 'bold',
                        },
                    },
                    title: {
                        display: true,
                        text: 'Number of offers',
                        stepSize: 1,
                        font: {
                            color: 'black',
                            size : 12,
                            weight: 'bold',
                        },
                    },
                }
            },
          },
      });
  } else {
      console.log("discountsChart is null");
  }
}

// admin dashboard navigation button
if(isAdmin){
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
            await generateAdminDashboardContent();
        } 
    });
    // selectYear = document.getElementById('select-year');
    // selectMonth = document.getElementById('select-month');
}


// get uploaded files and save them locally
async function submitProducts() {
    const productFile = document.getElementById('product-file').files[0];
    const priceFile = document.getElementById('price-file').files[0];
    if(productFile && confirm("Are you sure you want to upload the products?")){
        const productData = new FormData();
        productData.append('productFile', productFile);
        await $.ajax({
            type: "POST",
            url: 'php/upload_products.php',
            data: productData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
            }
        });
        if(priceFile){
            const priceData = new FormData();
            priceData.append('priceFile', priceFile);
            await $.ajax({
                type: "POST",
                url: 'php/upload_prices.php',
                data: priceData,
                processData: false,
                contentType: false,
                success: function (response) {
                    console.log(response);
                },
                error: function (error) {
                    console.log(error);
                }
        });
        }
        await $.ajax({
            type: "POST",
            url: 'php/merge_products.php',
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    else{
        alert("Please select a product file");
    }
}

// get stores file and save locally
async function submitStores() {
    const storeFile = document.getElementById('store-file').files[0];
    if(storeFile){
        const storeData = new FormData();
        storeData.append('storeFile', storeFile);
        await $.ajax({
            type: "POST",
            url: 'php/upload_stores.php',
            data: storeData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
            }
    });
        await $.ajax({
            type: "POST",
            url: 'php/merge_stores.php',
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
            }

        });
        fetchStores();
    }
    else{
        alert("Please select a store file");
    }
}

// gets all required info for the leaderboard
async function fetchUserLeaderboard() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/fetch_user_leaderboard.php',
            success: function (leaderboard) {
                resolve(leaderboard);
            },
            error: function (error) {
                reject(error);
            }
        });
});
}

// start_date: 4Y-2m-2d
async function getPriceDrop(start_date, content_id, content_type){
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/get_price_drop.php',
            data: {
                start_date: start_date,
                content_id: content_id,
                content_type: content_type
            },
            success: function (offers) {
                resolve(offers);
            },
            error: function (error) {
                reject(error);
            }
        });
});
}

// returns offer_count, date tuple
async function fetchOfferCount() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'php/fetch_offer_count.php',
            success: function (offers) {
                resolve(offers);
            },
            error: function (error) {
                reject(error);
            }
        });
});
}