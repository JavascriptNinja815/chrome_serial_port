var config = {};
var hostName = "com.serial.port";

// Function that convert thesort to output string
function convert(arduino, thesort) {
  var code = {
    type: 'SEND',
    port: arduino,
    data: thesort
  }
  return code;
}

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name == 'arduino');
  port.onMessage.addListener(function (msg) {
    // connect chrome extension to native host
    var externalPort = chrome.runtime.connectNative(hostName);
    externalPort.onMessage.addListener(function (msg) {
      if (msg.portsList) {
        console.log('portsList:', msg);
        port.postMessage(msg);
      }
      if (msg.arduino) {
        console.log('arduino response', msg);
      }
    });

    externalPort.onDisconnect.addListener(function () {
      console.log('Disconnected');
    });

    if (msg.type == 'scrapedData') {
      var arduino = '';
      chrome.storage.sync.get(['arduino'], function (result) {
        if (result.arduino) {
          arduino = result.arduino;
        }
        var code = convert(arduino, msg.data);
        externalPort.postMessage(code);
        console.log('send:', code);
      });
    }
    if (msg.type == 'refresh') {
      externalPort.postMessage({
        type: 'REQUEST'
      });
    }
  })
})