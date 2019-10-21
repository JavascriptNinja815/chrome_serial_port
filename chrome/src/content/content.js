$(document).ready(function () {
  // Conect Background using Port
  var port = chrome.runtime.connect({
    name: 'scrape_data'
  });
  
  $('#p_upc').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      setTimeout(function () {
        if (window.frames["main"]) {
          var code = window.frames["main"].frames["middle"].document.getElementById("iFrame").contentWindow.document.getElementById("thesort").innerText;
        } else if (window.frames["middle"]) {
          var code = window.frames["middle"].document.getElementById("iFrame").contentWindow.document.getElementById("thesort").innerText;
        } else if (document.getElementById("iFrame")) {
          var code = document.getElementById("iFrame").contentWindow.document.getElementById("thesort").innerText;
        } else {
          var code = document.getElementById("thesort").innerText;
        }
        port.postMessage({
          type: 'scrapedData',
          data: code
        })
      }, 3000);
      
    }
  });
});