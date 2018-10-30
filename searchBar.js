$(document).ready(initializeApp);

let foodInput = null;

/**
 * apply click handlers once document is ready
 * @param {none}
 */
function initializeApp () {
    addClickHandler();
    $('#foodForm').on('submit', sumbitSearch);
    // nutritionCallFromServer();
}

/**
 * AJAX call to nutritonix to get nutrition info
 */
// function nutritionCallFromServer(){
//    let dataForServer = {
//        "Content-Type": "application/x-www-form-urlencoded",
//     // "x-app-id": "0657689d",
//     // "x-app-key": "1c577a065dc2109313e314fdb410b965",
//        "x-app-id": "ff571cbd",
//        "x-app-key": "f4112a83315f79c5cdff346b54f08998",
//        "x-remote-user-id": "0",
//        "Cache-Control": "no-cache",
//        "query": 'apple',
//    };
//    let options = {
//        dataType: 'json',
//        url: 'https://trackapi.nutritionix.com/v2/search/instant?query=apple',
//        headers: dataForServer,
//        method: 'get',
//        success: function(response) {
//             console.log(response);
//        },
//        error: function(error){
//             console.log(error)
//        }
//    }
//    $.ajax(options);
// }

/**
 * autofill complete
 */
$(function() {
    $('input.autocomplete').autocomplete({
        // can ajax nutri api for list, but unable too
      data: {
        "Apple": null,
        "Chicken": null,
        "Taco": null,
        "Wings": null,
        "Burritos": null,
        "Cake": null,
        "Rice": null,
        "Pizza": null,
        "Curry": null,
        "Orange": null,
        "Beer": null,
        "Wine": null,
        "Burger": null,
        "Fish": null,
        "Ice Cream": null,
        "Strawberry": null,
        "Cheese": null,
        "Bread": null,
        "Chips": null,
        "Salsa": null,
        "String cheese": null,
        "Tofu": null,
        "Salad": null,
        "Ramen": null,
        "Avocado": null,
        "Papaya": null,
        "Spanich": null,
        "Cookie": null,
        "Grilled Onions": null
      }
    });
});

/**
 * Applies click handler to the submit button
 */
function addClickHandler () {
    $(".submit").click(submitClicked);
    //when enter is pressed
    $(document).keyup(function(event) {
        if ($("#food").is(":focus") && event.key == "Enter") {
            retrieveInput();
            sumbitSearch();
        }
    });
}

/**
 * Once user presses submit, get input and change page
 */
function submitClicked () {
    retrieveInput();
    // changePage();
}

/**
 *  Changes the page  
 */
function changePage () {
    // nutritionCallFromServer($("#food").val());
    location.assign("food.html")
}

/**
 * Will use session storage to get user
 * input
 */
function retrieveInput () {
    foodInput = $("#food").val();
    let food = sessionStorage;
    food.setFood = foodInput;
}

function sumbitSearch () {
    event.preventDefault();
    let input = $('#food').val();
    let label = $('label');
    if (input !== '') {
        changePage();
        return true;
    } else {
        label.html('This field is required').css('color', 'red');
        return false;
    }
}