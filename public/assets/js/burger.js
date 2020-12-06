// Make sure we wait to attach our handlers until the DOM is fully loaded.


var burgerList = $("#burger-list");
var eatenList = $("#eaten-list");
var delicious =

$(function () {
  $.ajax("/burger", {
    type: "GET",
  }).then(function (data) {
    console.log(data);

    var burgers = data.burgers;
    var len = burgers.length;

    for (var i = 0; i < len; i++) {
      var delicious = 
      "<li>" +
        burgers[i].id +
        "." + burgers[i].burger_name +
        "<button class='change-devour' data-id = ' " +
        burgers[i].id +
        "'data-newBurger='" +
        !burgers[i].devour +
        "'>";
      console.log(delicious);
  
    
      if (burger[i].devoured) {
        newBurger += ("devoured");
      } else {
        newBurger += ("deleted");
      }
         
     newBurger += "</button>";

       newBurger +=
        "<button class='delete-burger' data-id='" +
        burgers[i].id +
        "'>DELETE!</button></li>";    
        // console.log (delicious); 

      // append to a section of the html
      if (burgers[i].devoured === true) {
        burgerList.append(delicious);
      } else {
        eatenList.append(delicious);
      }
    }
  });


  $(document).on("click", ".change-devour", function (event) {
    var id = $(this).data("id")
    var newburger = {
      devour: newburger,
    }; 

    // here the computer changes to devour which is always true or defaults to false

    // Send the PUT request.
    $.ajax("/burger/" + id, {
      type: "PUT",
      data: JSON.stringify(newburger),
      dataType: "json",
      contentType: "application/json",
    }).then(function () {
      console.log("changed burger to", newburger);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  // with the burgers we want it be devour===true or default to false. I am thinking, line 82 is wrong for my purposes.
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var newBurger = {
      name: $("#food").val().trim(),
      devour: false 
    };

    // Send the POST request.
    $.ajax("/burger", {
      type: "POST",
      data: JSON.stringify(newBurger),
      dataType: "json",
      contentType: "application/json",
    }).then(function (response) {
      console.log("created new burger");
      console.log (response)

      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(document).on("click", ".delete-burger", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/burger/" + id, {
      type: "DELETE",
    }).then(function () {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
