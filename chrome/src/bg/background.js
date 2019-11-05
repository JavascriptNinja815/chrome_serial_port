var config = {};
var hostName = "com.serial.port";

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name == 'arduino');
  port.onMessage.addListener(function (msg) {
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
      chrome.storage.sync.get(['positions', 'catchAll', 'arduino'], function (result) {
        var code, arduino = '';
        if (result.catchAll) {
          for (var catchAll of result.catchAll) {
            if (msg.data == catchAll.matchCode) {
              code = catchAll['color'].substring(0, 3).toUpperCase();
              break;
            }
          }
        }
        if (result.arduino) {
          arduino = result.arduino;
        }

        if (result.positions) {
          for (var position of result.positions) {
            if (msg.data == position['matchCode']) {
              code = 'P' + position['pos'] + position['color'].charAt(0).toUpperCase();
              break;
            }
          }
          console.log(code);
          console.log(arduino);
          if (code && arduino) {
            console.log(code, arduino);
          }
        }
        
        // if (code && arduino) {
        //   console.log(code, arduino);
        //   // externalPort.postMessage({
        //   //   type: 'SEND',
        //   //   port: arduino,
        //   //   data: code
        //   // });
        // }
      });
    }
    if (msg.type == 'refresh') {
      externalPort.postMessage({
        type: 'REQUEST'
      });
    }
  })
});