var config = {};
var hostName = "com.serial.port";
var com = 'COM4';
chrome.storage.sync.get(['config'], function (result) {
  if (result.configData) {
    if (result.configData.com) {
      com = result.configData.com;
    }
  }
});

// Function that convert thesort to output string
function convert(thesort) {
  var code = {
    type: 'SEND',
    port: com,
    data: thesort
  }
  return code;
}

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name == 'scrape_data');
  port.onMessage.addListener(function (msg) {
    // connect chrome extension to native host
    var externalPort = chrome.runtime.connectNative(hostName);
    externalPort.onMessage.addListener(function (msg) {
      console.log('received:', msg);
    });

    externalPort.onDisconnect.addListener(function () {
      console.log('Disconnected');
    });

    if (msg.type = 'scrapedData') {
      var code = convert(msg.data);
      externalPort.postMessage(code);
      console.log('send:', code);
    }
    if (msg.type == 'refresh') {
      externalPort.postMessage({type: 'request'});
    }
  })
})