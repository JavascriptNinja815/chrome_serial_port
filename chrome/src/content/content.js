$(document).ready(function () {
  // Conect Background using Port
  var port = chrome.runtime.connect({
    name: 'arduino'
  });

  $('#p_upc').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      var count = 0;
      var thesort = '';
      var scrapData = setInterval(function () {
        if (window.frames["main"]) {
          thesort = window.frames["main"].frames["middle"].document.getElementById("iFrame").contentWindow.document.getElementById("thesort").innerText;
        } else if (window.frames["middle"]) {
          thesort = window.frames["middle"].document.getElementById("iFrame").contentWindow.document.getElementById("thesort").innerText;
        } else if (document.getElementById("iFrame")) {
          thesort = document.getElementById("iFrame").contentWindow.document.getElementById("thesort").innerText;
        } else {
          thesort = document.getElementById("thesort").innerText;
        }
        if (thesort || count == 20) {
          port.postMessage({
            type: 'scrapedData',
            data: thesort
          })
          clearInterval(scrapData);
        } else {
          count++;
        }
      }, 300)
    }
  });
});