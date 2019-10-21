// Default Config Data
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
  com: 'com1'
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
        <td>' + (parseInt(i) + 1) + '</td>\
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
  // Display Delete Button In Last Row
  var lastIndex = $("#position-table table tbody tr:last-child").index();
  $("#position-table table tbody tr").eq(lastIndex).find(".delete-position").css("display", "inline-block");

  // Make CatchAll Table
  var catchAllTable = '';
  for (var i in configData.catchAll) {
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
    catchAllTable +=
      '<tr>\
        <td>' + configData.catchAll[i].matchCode + '</td>\
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
          <a class="add-catch-all" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>\
          <a class="edit-catch-all" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>\
          <a class="delete-catch-all" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>\
        </td>\
      </tr>';
  }
  $("#catch-all-table table tbody").append(catchAllTable);

  // Make COM Table
  $('#com-dropdown').val(configData.com);
  
  // Adding Functionalities To Table
  $('[data-toggle="tooltip"]').tooltip();

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