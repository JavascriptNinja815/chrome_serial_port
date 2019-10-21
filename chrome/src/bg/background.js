var config = {};
var hostName = "com.serial.port";

function getCode(string) {
  return string;
}

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name == 'scrape_data');
  port.onMessage.addListener(function (msg) {
    if (msg.type = 'scrapedData' && msg.data) {
      // var code = getCode(msg.data);
      // connect chrome extension to native host
      var externalPort = chrome.runtime.connectNative(hostName);
      externalPort.onMessage.addListener(function (msg) {
        console.log('received:', msg);
      });

      externalPort.onDisconnect.addListener(function () {
        console.log('Disconnected');
      });

      externalPort.postMessage(msg);
      console.log('send:', msg);
    }
  })
})