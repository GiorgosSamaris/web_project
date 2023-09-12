var selectMonth;
var selectYear;
const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
var chart;


async function generateAdminDashboardContent() {
    profileContainer = document.getElementById('profile-container');
    let profileContent = '';
    let offer_count = await fetchOfferCount();
    let user_leaderboard = await fetchUserLeaderboard();
    //extracts the first 4 characters of the date string
    const distinctYears = [...new Set(offer_count.map(row => row.offer_date.substring(0, 4)))]; 
    const distinctMonths = [...new Set(offer_count.map(row => { 
        const monthValue  = parseInt(row.offer_date.substring(5, 7));
        return monthNames[monthValue - 1];
    }))];
    console.log(distinctYears);
    console.log(distinctMonths);
    // console.log(offer_count);
    // console.log(user_leaderboard);

    //product data container
    profileContent = '<div id = "product-data-edit-container">' + 
                '<input type="file" id="product-file" name="product-file" accept=".json" />' +
                '</div>';
    //store data container
    profileContent += '<div id = "store-data-edit-container">' + 
                '<input type="file" id="store-file" name="store-file" accept=".geojson" />' +
                '</div>';

    
    //statistics container
    profileContent += '<div id = "statistics-container">' + 
                        '<div id ="offers-diagram-container">' +
                            '<span id = "select-container">' +
                                '<label for = "select-year">Select Year: </label>' +
                                '<select id = "select-year" name = "select-year">' + 
                                '</select>' +
                                '<label for = "select-month">Select Month: </label>' +
                                '<select id = "select-month" name = "select-month">' + 
                                    '<option value = "All Months">All months</option>' +
                                '</select>' +
                            '</span>' +
                            '<canvas id="offers-chart"></canvas>' + '</div>' +
                        '<div id ="sales-diagram-container">' + 
                            '<canvas id="sales-chart"></canvas>' + '</div>' +
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
    const chartCanvas = document.getElementById('offers-chart');
    selectYear = document.getElementById('select-year');
    selectMonth = document.getElementById('select-month');

    distinctYears.forEach((year) => {
        selectYear.innerHTML += '<option value = "' + year + '">' + year + '</option>';
    });

    distinctMonths.forEach((month) => {
        selectMonth.innerHTML += '<option value = "' + month + '">' + month + '</option>';
    });

    generateChart(chartCanvas, offer_count, selectYear, selectMonth);
    selectYear.addEventListener('change', function(){
        console.log("from dom: " + selectYear.value);
        chart.data.datasets.label = 'Displayed: ' + selectYear + ' ' + selectMonth;

        // generateChart(chartCanvas, offer_count, selectYear, selectMonth);
    });
    selectMonth.addEventListener('change', function(){
        console.log("from dom month: " + selectMonth.value);

        const selectedYear = selectYear.value;
        const selectedMonth = monthNames.indexOf(selectMonth.value) + 1;
        console.log(selectedYear);
        console.log(selectedMonth + selectMonth.value);

        // generateChart(chartCanvas, offer_count, selectYear, selectMonth);

        const dateLabels = generateDates(selectedYear, selectedMonth);
        console.log(dateLabels);

        chart.data.labels = dateLabels;
        console.log(chart.data.labels);

        chart.data.datasets.label = 'Displayed: ' + selectYear + ' ' + selectMonth;
        console.log(chart.data.datasets.label);

        chart.update();
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
    console.log(daysInMonth);
    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');
        console.log(dateString);
        labels.push(dateString);
        //padStart adds a 0 in front of the number if it is less than 10 (e.g. 1 -> 01)
    }
    console.log(labels);
    return labels;
}

function generateChart(chartCanvas, offer_count, selectYear, selectMonth) {      
    
    // const existingChart = Chart.getChart(chartCanvas);

    // if(existingChart) {
    //     existingChart.destroy();
    // }
    
    if(chartCanvas)
    {
      chart = new Chart(chartCanvas,
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
            plugins: {
                title: {
                    display: true,
                    text: 'Offers per month',
                    color: 'black',
                    font: {
                        size: 22,
                        color: 'black',
                        weight: 'bold',
                    },
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            color: 'black',
                            size : 16,
                            weight: 'bold',
                        },
                    },
                },
            },
            scales: {
                x: {
                    display: true,
                    ticks: {
                        stepSize: 1,
                        maxTicksLimit: 31,
                        font: {
                            color: 'black',
                            size : 14,
                            weight: 'bold',
                        },
                    },
                    title: {
                        display: true,
                        text: 'Date',
                        font: {
                            color: 'black',
                            size : 16,
                            weight: 'bold',
                        },
                    },
                },
                y: {
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        maxTicksLimit: 100,
                        font: {
                            color: 'black',
                            size : 14,
                            weight: 'bold',
                        },
                    },
                    title: {
                        display: true,
                        text: 'Number of offers',
                        font: {
                            color: 'black',
                            size : 16,
                            weight: 'bold',
                        },
                    },
                }
            },
          },
      });
  } else {
      console.log("chartCanvas is null");
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