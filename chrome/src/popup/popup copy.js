// $(document).ready(function () {
//   $('[data-toggle="tooltip"]').tooltip();
//   var positionActions = $("#position-table table td:last-child").html();
//   // Display Delete Button In Last Row
//   var lastIndex = $("#position-table table tbody tr:last-child").index();
//   $("#position-table table tbody tr").eq(lastIndex).find(".delete-position").css("display", "inline-block");

//   var catchAllActions = $("#catch-all-table table td:last-child").html();
//   // Append table with add row form on add new button click
//   $("#add-position-btn").click(function () {
//     $(this).attr("disabled", "disabled");
//     var index = $("#position-table table tbody tr:last-child").index();
//     var row = '<tr>' +
//       '<td>' + (index + 2) + '</td>' +
//       '<td><input type="text" class="form-control" name="code"></td>' +
//       '<td><select><option value="red">Red</option><option value="blue">Blue</option><option value="white">White</option><option value="yellow">Yellow</option><option value="green">Green</option><select></td>' +
//       '<td>' + positionActions + '</td>' +
//       '</tr>';
//     $("#position-table table").append(row);
//     $("#position-table").scrollTop(index * 30);
//     $("#position-table table tbody tr").eq(index).find(".delete-position").css("display", "none");
//     $("#position-table table tbody tr").eq(index + 1).find(".add-position, .edit-position").toggle();
//     $("#position-table table tbody tr").eq(index + 1).find(".delete-position").css("display", "inline-block");
//     $('[data-toggle="tooltip"]').tooltip();
//   });

//   $("#add-catch-all-btn").click(function () {
//     $(this).attr("disabled", "disabled");
//     var index = $("#catch-all-table table tbody tr:last-child").index();
//     var row = '<tr>' +
//       '<td><input type="text" class="form-control" name="code"></td>' +
//       '<td><select><option value="red">Red</option><option value="blue">Blue</option><option value="white">White</option><option value="yellow">Yellow</option><option value="green">Green</option><select></td>' +
//       '<td>' + catchAllActions + '</td>' +
//       '</tr>';
//     $("#catch-all-table table").append(row);
//     $("#catch-all-table").scrollTop(index * 30);
//     $("#catch-all-table table tbody tr").eq(index + 1).find(".add-catch-all, .edit-catch-all").toggle();
//     $('[data-toggle="tooltip"]').tooltip();
//   });

//   $("#com-refresh").click(function () {

//   })

//   // Add row on add button click
//   $(document).on("click", ".add-position", function () {
//     var empty = false;
//     var input = $(this).parents("tr").find('input[type="text"]');
//     input.each(function () {
//       if (!$(this).val()) {
//         $(this).addClass("error");
//         empty = true;
//       } else {
//         $(this).removeClass("error");
//       }
//     });
//     $(this).parents("tr").find(".error").first().focus();
//     if (!empty) {
//       input.each(function () {
//         $(this).parent("td").html($(this).val());
//       });
//       $(this).parents("tr").find("select").attr("disabled", "disabled");
//       $(this).parents("tr").find(".add-position, .edit-position").toggle();
//       $("#add-position-btn").removeAttr("disabled");
//     }
//   });

//   $(document).on("click", ".add-catch-all", function () {
//     var empty = false;
//     var input = $(this).parents("tr").find('input[type="text"]');
//     input.each(function () {
//       if (!$(this).val()) {
//         $(this).addClass("error");
//         empty = true;
//       } else {
//         $(this).removeClass("error");
//       }
//     });
//     $(this).parents("tr").find(".error").first().focus();
//     if (!empty) {
//       input.each(function () {
//         $(this).parent("td").html($(this).val());
//       });
//       $(this).parents("tr").find("select").attr("disabled", "disabled");
//       $(this).parents("tr").find(".add-catch-all, .edit-catch-all").toggle();
//       $("#add-catch-all-btn").removeAttr("disabled");
//     }
//   });

//   // Edit row on edit button click
//   $(document).on("click", ".edit-position", function () {
//     var textVal = $(this).parents("tr").find("td:nth-child(2)").text();
//     $(this).parents("tr").find("td:nth-child(2)").html('<input type="text" class="form-control" value="' + textVal + '">');
//     $(this).parents("tr").find("select").removeAttr("disabled");
//     $(this).parents("tr").find(".add-position, .edit-position").toggle();
//     $("#add-position-btn").attr("disabled", "disabled");
//   });

//   $(document).on("click", ".edit-catch-all", function () {
//     var textVal = $(this).parents("tr").find("td:nth-child(1)").text();
//     $(this).parents("tr").find("td:nth-child(1)").html('<input type="text" class="form-control" value="' + textVal + '">');
//     $(this).parents("tr").find("select").removeAttr("disabled");
//     $(this).parents("tr").find(".add-catch-all, .edit-catch-all").toggle();
//     $("#add-catch-all-btn").attr("disabled", "disabled");
//   });

//   // Delete row on delete button click
//   $(document).on("click", ".delete-position", function () {
//     $(this).parents("tr").remove();
//     var index = $("#position-table table tbody tr:last-child").index();
//     $("#position-table table tbody tr").eq(index).find(".delete-position").css("display", "inline-block");
//     $("#add-position-btn").removeAttr("disabled");
//   });

//   $(document).on("click", ".delete-catch-all", function () {
//     $(this).parents("tr").remove();
//     $("#add-catch-all-btn").removeAttr("disabled");
//   });
// });

var configData = {
  positions: [{
    matchCode: 'CSCS',
    color: 'red'
  }, {
    matchCode: 'JJ',
    color: 'red'
  }, {
    matchCode: 'SAL',
    color: 'blue'
  }, {
    matchCode: 'DON*',
    color: 'white'
  }, {
    matchCode: 'NHP',
    color: 'yellow'
  }, {
    matchCode: 'DRS',
    color: 'red'
  }, {
    matchCode: 'PET',
    color: 'red'
  }, {
    matchCode: 'L-SAL',
    color: 'green'
  }, {
    matchCode: 'H-SAL',
    color: 'white'
  }, {
    matchCode: 'BELCO',
    color: 'red'
  }],
  catchAll: [{
    matchCode: 'Destroy',
    color: 'red'
  }],
  com: [{
    portName: 'COM1'
  }]
}

function makePopup(configData) {
  // Make Positions Table
  var positionTable = '';
  for (var i in configData.positions) {
    var red, blue, white, yellow, green;
    red = blue = white = yellow = green = '';
    switch (configData.positions[i].color) {
      case 'red':
        red = 'selected="selected"';
        break;
      case 'blue':
        blue = 'selected="selected"';
        break;
      case 'white':
        white = 'selected="selected"';
        break;
      case 'yellow':
        yellow = 'selected="selected"';
        break;
      case 'green':
        green = 'selected="selected"';
        break;
    }
    positionTable +=
      '<tr>\
        <td>' + (i + 1) + '</td>\
        <td>' + configData.positions[i].matchCode + '</td>\
        <td>\
          <select disabled>\
            <option value="red"' + red + '>Red</option>\
            <option value="blue"' + blue + '>Blue</option>\
            <option value="white"' + white + '>White</option>\
            <option value="yellow"' + yellow + '>Yellow</option>\
            <option value="green"' + green + '>Green</option>\
          </select>\
        </td>\
        <td>\
          <a class="add-position" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>\
          <a class="edit-position" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>\
          <a class="delete-position" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>\
        </td>\
      </tr>';
  }
  $('#position-table table tbody').append(positionTable);
}

// function setListeners() {

// }
chrome.storage.sync.get(['configData'], function (result) {
  if (result.configData) {
    configData = result.configData;
  }
  makePopup(configData);
});
// setListeners();