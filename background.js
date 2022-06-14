chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');

  // create alarm after extension is installed / upgraded
  chrome.alarms.create('startRequest', { periodInMinutes: 0.1 });
  startRequest();
  screenshotRequest();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  startRequest();
  screenshotRequest();
});

async function startRequest() {
  console.log('startRequest');
}

function screenshotRequest() {
  console.log('screenshotRequest works');
  const displayMediaOptions = {
    video: {
      cursor: 'always',
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
    },
  };
  startCapture(displayMediaOptions)
    .then((stream) => {
      console.log('stream: ', stream);
    })
    .catch((err) => {
      console.error('Error:' + err);
    });
}

function startCapture(displayMediaOptions) {
  return navigator.mediaDevices.getDisplayMedia(displayMediaOptions).catch((err) => {
    console.error('Error:' + err);
    return null;
  });
}
