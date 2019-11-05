$(document).ready(function () {
  // Default Config Data
  var positions = [{
    pos: '1',
    matchCode: 'CSCS',
    color: 'red'
  }, {
    pos: '2',
    matchCode: 'JJ',
    color: 'red'
  }, {
    pos: '3',
    matchCode: 'SAL',
    color: 'blue'
  }, {
    pos: '4',
    matchCode: 'DON*',
    color: 'white'
  }, {
    pos: '5',
    matchCode: 'NHP',
    color: 'yellow'
  }, {
    pos: '6',
    matchCode: 'DRS',
    color: 'red'
  }, {
    pos: '7',
    matchCode: 'PET',
    color: 'red'
  }, {
    pos: '8',
    matchCode: 'L-SAL',
    color: 'green'
  }, {
    pos: '9',
    matchCode: 'H-SAL',
    color: 'white'
  }, {
    pos: '10',
    matchCode: 'BELCO',
    color: 'red'
  }];

  var catchAll = [{
    matchCode: 'Destroy',
    color: 'red'
  }];

  var portsList = ['COM1', 'COM2', 'COM3', 'COM4'];

  var arduino = 'COM4';

  var positionActions = '<a class="add-position"><i class="material-icons">&#xE03B;</i></a>\
                        <a class="edit-position"><i class="material-icons">&#xE254;</i></a>\
                        <a class="delete-position"><i class="material-icons">&#xE872;</i></a>';

  var catchAllActions = '<a class="add-catch-all"><i class="material-icons">&#xE03B;</i></a>\
                        <a class="edit-catch-all"><i class="material-icons">&#xE254;</i></a>\
                        <a class="delete-catch-all"><i class="material-icons">&#xE872;</i></a>';

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
          <a class="add-position"><i class="material-icons">&#xE03B;</i></a>\
          <a class="edit-position"><i class="material-icons">&#xE254;</i></a>\
          <a class="delete-position"><i class="material-icons">&#xE872;</i></a>\
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
          <a class="add-catch-all"><i class="material-icons">&#xE03B;</i></a>\
          <a class="edit-catch-all"><i class="material-icons">&#xE254;</i></a>\
          <a class="delete-catch-all"><i class="material-icons">&#xE872;</i></a>\
        </td>\
      </tr>';
    }
    $("#catch-all-table table tbody").append(catchAllTable);
  }

  // Function that Makes COM Dropdown
  function makeDropdown(portsList, arduino) {
    var comDropdown = '';
    for (var i in portsList) {
      comDropdown +=
        '<option value=' + portsList[i] + '>' + portsList[i] + '</option>';
    }
    $('#com-dropdown').append(comDropdown);
    $('#com-dropdown').val(arduino);
  }

  // Function that Updates COM Dropdown
  function updateDropdown(portsList) {
    $('#com-dropdown').empty();
    var comDropdown = '<option value=""></option>';
    var arduinoPorts = portsList.portsList;
    for (var i = 0; i < arduinoPorts.length; i++) {
      comDropdown +=
        '<option value=' + arduinoPorts[i] + '>' + arduinoPorts[i] + '</option>';
    }
    $('#com-dropdown').append(comDropdown);
    $('#com-dropdown').val('');
    chrome.storage.sync.set({
      arduinoPorts: arduinoPorts
    });
  }

  // Function that get array from position table
  function getPositionTable() {
    var array = [];
    $('#position-table table tbody tr').each(function () {
      x = $(this).children();
      var keys = ['pos', 'matchCode', 'color'];
      var pos, matchCode, color;
      x.each(function (i) {
        if (keys[i] == 'pos') {
          pos = $(this).text();
        } else if (keys[i] == 'matchCode') {
          matchCode = $(this).text();
        } else if (keys[i] == 'color') {
          color = $(this).find(':selected').val();
        } else {
          return;
        }
      });
      array.push({
        pos: pos,
        matchCode: matchCode,
        color: color
      })
    })
    return array;
  }

  // Function that get array from catch all table
  function getCatchAllTable() {
    var array = [];
    $('#catch-all-table table tbody tr').each(function () {
      x = $(this).children();
      var keys = ['matchCode', 'color'];
      var matchCode, color;
      x.each(function (i) {
        if (keys[i] == 'matchCode') {
          matchCode = $(this).text();
        } else if (keys[i] == 'color') {
          color = $(this).find(':selected').val();
        } else {
          return;
        }
      });
      array.push({
        matchCode: matchCode,
        color: color
      });
    });
    return array;
  }

  // Function that check validation so it can't be inputed duplicate code
  function validation(newCode) {
    var error = true;
    var positionTable = getPositionTable();
    var catchAllTable = getCatchAllTable();
    var tableData = positionTable.concat(catchAllTable);
    for (var code of tableData) {
      if (newCode == code['matchCode']) error = false;
    };
    return error;
  }

  function setListeners() {
    // When refresh button is clicked
    $(document).on('click', '#refresh', function () {
      var port = chrome.runtime.connect({
        name: 'arduino'
      });
      port.postMessage({
        type: 'refresh'
      });
      port.onMessage.addListener(function (msg) {
        if (msg) {
          console.log(msg);
          updateDropdown(msg);
        }
      });
    });

    // When port dropdown is clicked
    $(document).on('change', '#com-dropdown', function () {
      if (this.value) {
        $('#com-dropdown').val(this.value);
        chrome.storage.sync.set({
          arduino: this.value
        })
      }
    });

    // Add & Edit & Delete Function In Position Table
    $(document).on("click", ".add-position", function () {
      var empty = false;
      var input = $(this).parents("tr").find('input[type="text"]');
      input.each(function () {
        var valid = validation($(this).val());
        if (!$(this).val() || !valid) {
          $(this).addClass("error");
          empty = true;
        } else {
          $(this).removeClass("error");
        }
      });
      $(this).parents("tr").find(".error").first().focus();
      if (!empty) {
        input.each(function () {
          $(this).parent("td").html($(this).val());
        });
        $(this).parents("tr").find("select").attr("disabled", "disabled");
        $(this).parents("tr").find(".add-position, .edit-position").toggle();
        $("#add-position-btn").removeAttr("disabled");
        chrome.storage.sync.set({
          'positions': getPositionTable()
        });
      }
    });
    $(document).on("click", ".edit-position", function () {
      var textVal = $(this).parents("tr").find("td:nth-child(2)").text();
      $(this).parents("tr").find("td:nth-child(2)").html('<input type="text" class="form-control" value="' + textVal + '">');
      $(this).parents("tr").find("select").removeAttr("disabled");
      $(this).parents("tr").find(".add-position, .edit-position").toggle();
      $("#add-position-btn").attr("disabled", "disabled");
    });
    $(document).on('click', '.delete-position', function () {
      $(this).parents("tr").remove();
      var index = $("#position-table table tbody tr:last-child").index();
      $("#position-table table tbody tr").eq(index).find(".delete-position").css("display", "inline-block");
      $("#add-position-btn").removeAttr("disabled");
      chrome.storage.sync.set({
        'positions': getPositionTable()
      });
    });

    // Add New Row In Position Table
    $(document).on("click", "#add-position-btn", function () {
      $(this).attr("disabled", "disabled");
      var index = $("#position-table table tbody tr:last-child").index();
      var row = '<tr>' +
        '<td>' + (index + 2) + '</td>' +
        '<td><input type="text" class="form-control" name="code"></td>' +
        '<td><select><option value="red">Red</option><option value="blue">Blue</option><option value="white">White</option><option value="yellow">Yellow</option><option value="green">Green</option><select></td>' +
        '<td>' + positionActions + '</td>' +
        '</tr>';
      $("#position-table table").append(row);
      $("#position-table").scrollTop(index * 30);
      $("#position-table table tbody tr").eq(index).find(".delete-position").css("display", "none");
      $("#position-table table tbody tr").eq(index + 1).find(".add-position, .edit-position").toggle();
      $("#position-table table tbody tr").eq(index + 1).find(".delete-position").css("display", "inline-block");
    });

    // Add & Edit & Delete Function In Catch All Table
    $(document).on("click", ".add-catch-all", function () {
      var empty = false;
      var input = $(this).parents("tr").find('input[type="text"]');
      input.each(function () {
        var valid = validation($(this).val());
        if (!$(this).val() || !valid) {
          $(this).addClass("error");
          empty = true;
        } else {
          $(this).removeClass("error");
        }
      });
      $(this).parents("tr").find(".error").first().focus();
      if (!empty) {
        input.each(function () {
          $(this).parent("td").html($(this).val());
        });
        $(this).parents("tr").find("select").attr("disabled", "disabled");
        $(this).parents("tr").find(".add-catch-all, .edit-catch-all").toggle();
        $("#add-catch-all-btn").removeAttr("disabled");
        chrome.storage.sync.set({
          'catchAll': getCatchAllTable()
        });
      }
    });
    $(document).on("click", ".edit-catch-all", function () {
      var textVal = $(this).parents("tr").find("td:nth-child(1)").text();
      $(this).parents("tr").find("td:nth-child(1)").html('<input type="text" class="form-control" value="' + textVal + '">');
      $(this).parents("tr").find("select").removeAttr("disabled");
      $(this).parents("tr").find(".add-catch-all, .edit-catch-all").toggle();
      $("#add-catch-all-btn").attr("disabled", "disabled");
    });

    $(document).on("click", ".delete-catch-all", function () {
      $(this).parents("tr").remove();
      var index = $("#catch-all-table table tbody tr:last-child").index();
      $("#catch-all-table table tbody tr").eq(index).find(".delete-catch-all").css("display", "inline-block");
      $("#add-catch-all-btn").removeAttr("disabled");
      chrome.storage.sync.set({
        'catchAll': getCatchAllTable()
      });
    });

    // Add New Row In Catch-All Table
    $(document).on("click", "#add-catch-all-btn", function () {
      $(this).attr("disabled", "disabled");
      var index = $("#catch-all-table table tbody tr:last-child").index();
      var row = '<tr>' +
        '<td><input type="text" class="form-control" name="code"></td>' +
        '<td><select><option value="red">Red</option><option value="blue">Blue</option><option value="white">White</option><option value="yellow">Yellow</option><option value="green">Green</option><select></td>' +
        '<td>' + catchAllActions + '</td>' +
        '</tr>';
      $("#catch-all-table table").append(row);
      $("#catch-all-table").scrollTop(index * 30);
      $("#catch-all-table table tbody tr").eq(index).find(".delete-catch-all").css("display", "none");
      $("#catch-all-table table tbody tr").eq(index + 1).find(".add-catch-all, .edit-catch-all").toggle();
      $("#catch-all-table table tbody tr").eq(index + 1).find(".delete-catch-all").css("display", "inline-block");
    });
  }
  chrome.storage.sync.get(['positions', 'catchAll', 'portsList', 'arduino'], function (result) {
    if (result.positions) {
      positions = result.positions;
    }
    if (result.catchAll) {
      catchAll = result.catchAll;
    }
    if (result.portsList) {
      portsList = result.portsList;
    }
    if (result.arduino) {
      arduino = result.arduino
    }
    makePositionTable(positions);
    makeCatchAllTable(catchAll);
    makeDropdown(portsList, arduino);
  });

  setListeners();
});