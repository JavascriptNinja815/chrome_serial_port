// Default Config Data
positions = [{
  pos: 1,
  matchCode: 'CSCS',
  color: 'red'
}, {
  pos: 2,
  matchCode: 'JJ',
  color: 'red'
}, {
  pos: 3,
  matchCode: 'SAL',
  color: 'blue'
}, {
  pos: 4,
  matchCode: 'DON*',
  color: 'white'
}, {
  pos: 5,
  matchCode: 'NHP',
  color: 'yellow'
}, {
  pos: 6,
  matchCode: 'DRS',
  color: 'red'
}, {
  pos: 7,
  matchCode: 'PET',
  color: 'red'
}, {
  pos: 8,
  matchCode: 'L-SAL',
  color: 'green'
}, {
  pos: 9,
  matchCode: 'H-SAL',
  color: 'white'
}, {
  pos: 10,
  matchCode: 'BELCO',
  color: 'red'
}];

catchAll = [{
  matchCode: 'Destroy',
  color: 'red'
}];

portsList = ['COM1', 'COM2', 'COM3', 'COM4'];

// Function That Makes Positions Table
function makePositionTable(positions) {
  var positionTable = '';
  for (var i in positions) {
    var red, blue, white, yellow, green;
    red = blue = white = yellow = green = '';
    switch (positions[i].color) {
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
        <td>' + positions[i].pos + '</td>\
        <td>' + positions[i].matchCode + '</td>\
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
}

// Function That Makes CatchAll Table
function makeCatchAllTable(catchAll) {
  var catchAllTable = '';
  for (var i in catchAll) {
    var red, blue, white, yellow, green;
    red = blue = white = yellow = green = '';
    switch (catchAll[i].color) {
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
        <td>' + catchAll[i].matchCode + '</td>\
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
}

// Function that Makes COM Dropdown
function makeDropdown(portsList) {
  var comDropdown = '';
  for (var i in portsList) {
    comDropdown +=
      '<option value=' + portsList[i] + '>' + portsList[i] + '</option>';
  }
  $('#com-table tbody tr td select').append(comDropdown);
}

// Function that Updates COM Dropdown
function updateDropdown(portsList) {
  $('#com-table tbody tr td select').empty();
  var comDropdown = '';
  for (var i in portsList) {
    comDropdown +=
      '<option value=' + portsList[i] + '>' + portsList[i] + '</option>';
  }
  $('#com-table tbody tr td select').append(comDropdown);
  chrome.storage.sync.set({
    portsList: portsList
  })
}


function setListeners() {
  // When refresh button is clicked
  $('#refresh').click(function () {
    var port = chrome.runtime.connect({
      name: 'arduino'
    });
    port.postMessage({
      type: 'refresh'
    })
    port.onMessage.addListener(function (msg) {
      if (msg) {
        updateDropdown(msg);
      }
    })
  })
}
chrome.storage.sync.get(['positions', 'catchAll', 'portsList'], function (result) {
  if (result.positions) {
    positions = result.positions;
  }
  if (result.catchAll) {
    catchAll = result.catchAll
  }
  if (result.portsList) {
    portsList = result.portsList;
  }
  makePositionTable(positions);
  makeCatchAllTable(catchAll);
  makeDropdown(portsList);

  // Adding Functionalities To Table
  $('[data-toggle="tooltip"]').tooltip();
});
setListeners();