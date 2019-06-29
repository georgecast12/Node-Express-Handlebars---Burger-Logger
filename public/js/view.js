$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var $newItemInput = $("input.new-item");
  // Our new burgers will go inside the burgerContainer
  var $burgersContainer = $(".burger-container");

  // All burgers devoured will go inside the munchiesContainer
  var $munchiesContainer = $(".munchies-container");

  // Adding event listeners for deleting, editing, and adding burgers
  $(document).on("click", "button.delete", deleteBurgers);
  $(document).on("click", "button.complete", toggleComplete);
  // $(document).on("click", ".todo-item", editBurgers);
  // $(document).on("keyup", ".todo-item", finishEdit);
  // $(document).on("blur", ".todo-item", cancelEdit);
  // $(document).on("submit", "#todo-form", insertTodo);
  $(document).on("submit", ".burger-form", insertBurger);

  // Our initial burgers array
  var burgers = [];

  // Getting burgers from database when page loads
  getBugers();

  // This function resets the burgers displayed with new burgers from the database
  function initializeRows() {
    $burgersContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      rowsToAdd.push(createNewRow(burgers[i]));
    }
    $burgersContainer.prepend(rowsToAdd);
  }

  // This function grabs burgers from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function(data) {
      burgers = data;
      initializeRows();
    });
  }

  // This function deletes a burger when the user clicks the "devour" button
  function deleteBurgers(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/burgers/" + id
    }).then(getBurgers);

    //and creates and input field with the burger data as placeholder.
    // var rowsToAdd = [];
    // for (var i = 0; i < burgers.length; i++) {
    //   rowsToAdd.push(createNewRow(burgers[i]));
    // }
    // $burgersContainer.prepend(rowsToAdd);
    // }
  }

  //((may need to delete))
  // // This function handles showing the input box for a user to edit a todo
  // function editBurgers() {
  //   var currentBurgers = $(this).data("burgers");
  //   $(this)
  //     .children()
  //     .hide();
  //   $(this)
  //     .children("input.edit")
  //     .val(currentBurgers.text);
  //   $(this)
  //     .children("input.edit")
  //     .show();
  //   $(this)
  //     .children("input.edit")
  //     .focus();
  // }

  // ((may use this as devour functions))
  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var burger = $(this)
      .parent()
      .data("burger");
    burger.complete = !burger.complete;
    updateBurgers(burger);
  }

  // // This function starts updating a burger in the database if a user hits the "Enter Key"
  // // While in edit mode
  // function finishEdit(event) {
  //   var updatedBurger = $(this).data("burger");
  //   if (event.which === 13) {
  //     updatedBurger.text = $(this)
  //       .children("input")
  //       .val()
  //       .trim();
  //     $(this).blur();
  //     updateBurgers(updatedBurger);
  //   }
  // }

  // This function updates a burger in our database
  function updateBurgers(burger) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burger
    }).then(getBurgers);
  }

  // ((may need to delete))
  // // This function is called whenever a todo item is in edit mode and loses focus
  // // This cancels any edits being made
  // function cancelEdit() {
  //   var currentBurgers = $(this).data("todo");
  //   if (currentBurgers) {
  //     $(this)
  //       .children()
  //       .hide();
  //     $(this)
  //       .children("input.edit")
  //       .val(currentBurgers.text);
  //     $(this)
  //       .children("span")
  //       .show();
  //     $(this)
  //       .children("button")
  //       .show();
  //   }
  // }

  // This function constructs a burger-item row
  function createNewRow(burger) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burger-item'>",
        "<span>",
        burger.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        // "<button class='delete btn btn-danger'>x</button>",
        "<button class='devour btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", burger.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("burger", burger);
    if (burger.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new burger into our database and then updates the view
  function insertBurger(event) {
    // if ($newItemInput == "") {
    //   alert("Name must be filled out");
    //   return false;
    // } else {
    event.preventDefault();
    var burger = {
      burger_name: $newItemInput.val().trim(),
      devoured: false
      // notEmpty: true
    };
    $.post("/api/burgers", burger, getBurgers);
    $newItemInput.val("");
  }
  // }
});
