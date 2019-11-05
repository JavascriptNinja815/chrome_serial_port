$(document).ready(function () {
  // Conect Background Using Port
  var port = chrome.runtime.connect({
    name: 'arduino'
  });
  $('#p_upc').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      var targetNode;
      if (window.frames["main"]) {
        targetNode = window.frames["main"].frames["middle"].document.getElementById("iFrame").contentWindow.document.getElementById("thesort");
      } else if (window.frames["middle"]) {
        targetNode = window.frames["middle"].document.getElementById("iFrame").contentWindow.document.getElementById("thesort");
      } else if (document.getElementById("iFrame")) {
        targetNode = document.getElementById("iFrame").contentWindow.document.getElementById("thesort");
      } else {
        targetNode = document.getElementById("thesort");
      }

      var observerOptions = {
        childList: true
      }

      var observer = new MutationObserver(function () {
        port.postMessage({
          type: 'scrapedData',
          data: targetNode.innerText
        })
      });
      observer.observe(targetNode, observerOptions);
      setTimeout(function(){
        observer.disconnect();
      }, 2000);
    }
  });
});