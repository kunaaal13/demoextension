chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');
  chrome.alarms.create('startRequest', { periodInMinutes: 2 });
  console.log('calling captureVisible for first time');
  initialize();
});

function initialize() {
  var screenshot = {
    tab: 0,
    // canvas: document.createElement('canvas'),
    startX: 0,
    startY: 0,
    scrollX: 0,
    scrollY: 0,
    docHeight: 0,
    docWidth: 0,
    visibleWidth: 0,
    visibleHeight: 0,
    scrollXCount: 0,
    scrollYCount: 0,
    scrollBarX: 17,
    scrollBarY: 17,
    captureStatus: true,
    screenshotName: null,

    captureVisible: function (docWidth, docHeight) {
      var formatParam = 'png';
      chrome.tabs.captureVisibleTab(null, { format: formatParam, quality: 50 }, function (data) {
        var image = new Image();
        image.onload = function () {
          var width = image.height < docHeight ? image.width - 17 : image.width;
          var height = image.width < docWidth ? image.height - 17 : image.height;
          screenshot.canvas.width = width;
          screenshot.canvas.height = height;
          var context = screenshot.canvas.getContext('2d');
          context.drawImage(image, 0, 0, width, height, 0, 0, width, height);
          screenshot.postImage();
        };
        image.src = data;

        chrome.storage.local.set({ key: value }, function () {
          console.log('Value is set to ' + value);
        });

        console.log(image.src);
      });
    },
  };

  screenshot.captureVisible();
}

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log('alarm invoked');
  initialize();
});
