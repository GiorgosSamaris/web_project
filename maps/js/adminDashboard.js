async function generateAdminDashboardContent() {
    profileContainer = document.getElementById('profile-container');
    let profileContent = '';
    let yAxis = [];
    let offer_count = await fetchOfferCount();
    let user_leaderboard = await fetchUserLeaderboard();
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
                                    '<option value = "2023">2023</option>' + 
                                '</select>' +
                                '<label for = "select-month">Select Month: </label>' +
                                '<select id = "select-month" name = "select-month">' + 
                                    '<option value = "January">January</option>' +
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
    (async function() {      
      const chartCanvas = document.getElementById('offers-chart');
      const selectYear = document.getElementById('select-year');
      const selectMonth = document.getElementById('select-month');
      if(chartCanvas)
      {
        const chart = new Chart(chartCanvas,
          {
            type: 'line',
            data: {
              labels: offer_count.map(row => row.offer_date),
              datasets: [
                {
                    borderColor: 'blue',
                    backgroundColor: 'white',
                    label: selectYear.value + ' ' + selectMonth.value,
                    data: offer_count.map(row => parseInt(row.offer_count)),
                }
              ]
            },
            options: {
                scales: {
                    x: {
                        display: true,
                        ticks: {
                            color: 'black',
                        },
                        title: {
                            display: true,
                            text: 'Date',
                            color: 'black',
                        },
                    },
                    y: {
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            maxTicksLimit: 100,
                            color: 'black',
                        },
                        title: {
                            display: true,
                            text: 'Number of offers',
                            color: 'black',
                        },
                    }
                },
                // plugins: {
                //     legend: {
                //         display: true,
                //         labels: {
                //             color: 'black',
                //         },
                //         title: {
                //             display: true,
                //             color: 'black',
                //             text: 'Legend'
                //         },
                //     },
                    
                // },
            },
        });
    } else {
      console.log("no chart canvas");
    }
    })();

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
    //   for (let i = 1; i <= pageCount; i++) {
    //     appendPageNumber(i);
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