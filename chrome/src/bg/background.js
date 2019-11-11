var config = {};
var hostName = "com.serial.port";
var externalPort = null;

// Default Data
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


function convert(result, matchCode, callback) {
  var code, arduino = '';
  if (result.arduino) {
    arduino = result.arduino;
    if (result.catchAll) {
      for (var catchAll of result.catchAll) {
        if (matchCode == catchAll.matchCode) {
          code = catchAll['color'].substring(0, 3).toUpperCase();
          callback(code, arduino);
          break;
        }
      }
    }
    if (result.positions) {
      for (var position of result.positions) {
        if (matchCode == position['matchCode']) {
          code = 'P' + position['pos'] + position['color'].charAt(0).toUpperCase();
          callback(code, arduino);
          break;
        }
      }
    }
  } else {
    callback(null, null);
  }
}

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == 'install' || details.reason == 'update') {
    chrome.storage.sync.set({
      positions: positions,
      catchAll: catchAll,
      arduino: arduino,
      portsList: portsList
    });
  }
});
chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name == 'arduino');
  port.onMessage.addListener(function (msg) {
    externalPort = chrome.runtime.connectNative(hostName);
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
      externalPort = null;
      if (chrome.runtime.lastError) {}
    });
    if (msg.type == 'scrapedData') {
      chrome.storage.sync.get(['positions', 'catchAll', 'arduino'], function (result) {
        convert(result, msg.data, function (code, arduino) {
          console.log(code, arduino);
          if (code && arduino) {
              externalPort.postMessage({
              type: 'SEND',
              port: arduino,
              data: code
            });
          }
        });
      });
    }
    if (msg.type == 'refresh') {
      externalPort.postMessage({
        type: 'REQUEST'
      });
    }
  });
});