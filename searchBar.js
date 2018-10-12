$(document).ready(initializeApp);

let foodInput = null;

/**
 * apply click handlers once document is ready
 * @param {none}
 */
function initializeApp () {
    addClickHandler();
}

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
        "Cookie": null
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
            changePage();
        }
    });
}

/**
 * Once user presses submit, get input and change page
 */
function submitClicked () {
    retrieveInput();
    changePage();
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