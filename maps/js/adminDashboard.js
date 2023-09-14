let selectYear;
let selectMonth;
let selectDate;
let selectedValue;
let selectedCategory;
let selectedSubcategory;
const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
let offerChart;


async function generateAdminDashboardContent() {
    profileContainer = document.getElementById('profile-container');
    var profileContent = '';
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
    profileContent = '<div id = "product-data-edit-container">' + 
                        '<input type="file" id="product-file" name="product-file" accept=".json" />' + 
                    '</div>';
    //store data container
    profileContent += '<div id = "store-data-edit-container">' + 
                        '<input type="file" id="store-file" name="store-file" accept=".geojson" />' +
                    '</div>';

    
    //statistics container
    profileContent +=  '<div id ="offers-diagram-container">' +
                            '<span id = "offers-select-container">' +
                                '<label for = "select-year">Select Year: </label>' +
                                '<select id = "select-year" name = "select-year">' + 
                                '</select>' +
                                '<label for = "select-month">Select Month: </label>' +
                                '<select id = "select-month" name = "select-month">' + 
                                    '<option value = "All Months">All Months</option>' +
                                '</select>' +
                            '</span>' +
                            '<canvas id="offers-chart"></canvas>' + 
                        '</div>' +
                        '<div id ="average-discount-diagram-container">' + 
                            "<div id = 'average-discount-select-container'>" +
                                '<label for = "select-date">Select Date: </label>' +
                                '<input type = "date" id = "select-date" name = "select-date" value = "2023-09-06">' + '<br>' + 
                                // '<input type = "text" id = "select-date" name = "select-date">' + '<br>' +
                                '<label for = "select-category">Select Category or Subcategory: </label>' +
                                '<select id = "select-category" name = "select-category">' +
                                '</select>' +
                            '</div>' +
                            '<canvas id="average-discount-chart"></canvas>' + 
                        '</div>';


    //leaderboard container
    // leaderboard += '<div id = "leaderboard-container">' + 
    //                     '<div id = "list-container">' + '<label>Leaderboard</label>' +
    //                         '<ul id = "leaderboard-list" aria-live = "polite">';
    // user_leaderboard.forEach((user) => {
    //                 leaderboard += '<li>' + "username: " + user.username + '<br>' + 
    //                                 "Last month's tokens: " + user.last_months_tokens +  '<br>' +
    //                                 "Overall tokens: " + user.overall_tokens + '</li>' ;
    // });

    // leaderboard += '</ul>' +
    //                 '<nav id = "page-selection-container">' + 
    //                     '<button class = "navigation-button" id = "previous-button" title = "Previous Page" aria-label="Previous page"> &lt; </button>' + 
    //                     '<div id = "page-numbers">' + '</div>' +
    //                     '<button class = "navigation-button" id = "next-button" title = "Previous Page" aria-label="Next page"> &gt; </button>' + 
    //                 '</nav>' + 
    //             '</div>' +
    //         '</div>';
    
    //profile content
    profileContainer.innerHTML = profileContent;
    // console.log(offer_count.map(row => row.offer_date));
    // flatpickr("#select-date", {
    //     dateFormat: "Y-m-d",
    //     defaultDate: "2023-09-06",
    // });
    const offersChart = document.getElementById('offers-chart');
    const discountsChart = document.getElementById('average-discount-chart');
    selectDate = document.getElementById('select-date');
    selectYear = document.getElementById('select-year');
    selectMonth = document.getElementById('select-month');
    selectCategorySubcategory = document.getElementById('select-category');

    
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
        {const selectedYear = selectYear.value;
            const selectedMonth = monthNames.indexOf(selectMonth.value) + 1;
            const dateLabels = generateDates(selectedYear, selectedMonth);

            const countLabels = dateLabels.map((date) => {  //maps the dateLabels array to an array of offer counts
                const offer = offer_count.find((row) => row.offer_date === '2023-' + date);   //finds the row with the same date as the current date in the loop
                if(offer) {
                    
                    return parseInt(offer.offer_count);
                } else {
                    return 0;
                }
            });
            offerChart.data.labels = dateLabels;
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
            discountChart.update();
        }else if(selectedCategory) {
            console.log(selectDate.value);
            console.log(await getPriceDrop(selectDate.value, selectedCategory.id, 'category'));
            const priceDropData = await getPriceDrop(selectDate.value, selectedCategory.id, 'category');
            discountChart.data.labels = priceDropData.map(row => row.drop_date);
            discountChart.data.datasets[0].data = priceDropData.map(row => parseFloat(row.drop_percentage));
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
            console.log(selectDate.value);
            console.log(await getPriceDrop(selectDate.value, selectedSubcategory.subcategory_id, 'subcategory'));
            const priceDropData = await getPriceDrop(selectDate.value, selectedSubcategory.subcategory_id, 'subcategory');
            discountChart.data.labels = priceDropData.map(row => row.drop_date);
            discountChart.data.datasets[0].data = priceDropData.map(row => parseFloat(row.drop_percentage));
            discountChart.update();
        }else if(selectedCategory) {
            console.log(selectDate.value);
            console.log(await getPriceDrop(selectDate.value, selectedCategory.id, 'category'));
            const priceDropData = await getPriceDrop(selectDate.value, selectedCategory.id, 'category');
            discountChart.data.labels = priceDropData.map(row => row.drop_date);
            discountChart.data.datasets[0].data = priceDropData.map(row => parseFloat(row.drop_percentage));
            discountChart.update();
        }
        else {
            console.log("error");
        }
    });

// const paginationNumbers = document.getElementById("page-numbers");
// const paginatedList = document.getElementById("leaderboard-list");
// const listItems = paginatedList.querySelectorAll("li");

// const paginationLimit = 10;
// const pageCount = Math.ceil(listItems.length / paginationLimit);
// let currentPage = 1;

// const appendPageNumber = (index) => {
    //   const pageNumber = document.createElement("button");
    //   pageNumber.className = "page-number";
    //   pageNumber.innerHTML = index;
    //   pageNumber.setAttribute("page-index", index);
    //   pageNumber.setAttribute("aria-label", "Page " + index);

    //   paginationNumbers.appendChild(pageNumber);
    // };

    // const getPaginationNumbers = () => {
        //   for (let day = 1; day <= pageCount; day++) {
            //     appendPageNumber(day);
    //   }
    // };

    // const handleActivePageNumber = () => {
        //   document.querySelectorAll(".page-number").forEach((button) => {
            //     button.classList.remove("active");
    //     const pageIndex = Number(button.getAttribute("page-index"));
    //     if (pageIndex == currentPage) {
        //       button.classList.add("active");
        //     }
        //   });
        // };
        
        // const setCurrentPage = (pageNum) => {
            //   currentPage = pageNum;
    //   handleActivePageNumber();
    
    //   const prevRange = (pageNum - 1) * paginationLimit;
    //   const currRange = pageNum * paginationLimit;
    
    //   listItems.forEach((item, index) => {
    //     item.classList.add("hidden");
    //     if (index >= prevRange && index < currRange) {
        //       item.classList.remove("hidden");
        //     }
        //   });
        // };
        
        // window.addEventListener("load", () => {
            //   getPaginationNumbers();
            //   setCurrentPage(1);
            
            //   document.querySelectorAll(".page-number").forEach((button) => {
                //     const pageIndex = Number(button.getAttribute("page-index"));
                
                //     if (pageIndex) {
                    //       button.addEventListener("click", () => {
                        //         setCurrentPage(pageIndex);
                        //       });
                        //     }
                        //   });
                        // });
}
                    
function generateDates(year, month) {
    const labels = [];
    const daysInMonth = new Date(year, month, 0).getDate(); //gets the number of days in the month by getting the date of the last day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateString =  month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');
        labels.push(dateString);
        //padStart adds a 0 in front of the number if it is less than 10 (e.g. 1 -> 01)
    }
    return labels;
}

function generateOffersCountChart(offersChart, offer_count, selectYear, selectMonth) {      
    
    // const existingChart = Chart.getChart(offersChart);

    // if(existingChart) {
    //     existingChart.destroy();
    // }
    
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
    console.log(average_discount.map(row => row.drop_date));
    console.log(average_discount.map(row => parseFloat(row.drop_percentage)));
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
                //   label: 'Displayed: ' + selectYear.value + ' ' + selectMonth.value,
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

// admin dashboard button
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
            await generateAdminDashboardContent();
        } 
    });
    // selectYear = document.getElementById('select-year');
    // selectMonth = document.getElementById('select-month');
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
// 4Y-2m-2d 2023-09-30
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