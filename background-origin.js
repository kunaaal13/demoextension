chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');

  // create alarm after extension is installed / upgraded
  // chrome.alarms.create('startRequest', { periodInMinutes: 0.5 });
  // startRequest();
  // screenshotRequest();

  chrome.notifications.create('test', {
    type: 'basic',
    iconUrl: 'assets/icon-16.png',
    title: 'Test Message',
    message: 'You are awesome!',
    priority: 2,
  });

  chrome.notifications.create(
    'hello',
    {
      type: 'basic',
      title: 'Hello',
      message: 'Hello World!',
    },
    (id) => {}
  );
});

// chrome.alarms.onAlarm.addListener((alarm) => {
//   startRequest();
//   screenshotRequest();
// });

// async function startRequest() {
//   console.log('startRequest');
// }

// async function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }

// async function screenshotRequest() {
//   console.log('screenshotRequest works');
//   try {
//     const tab = await getCurrentTab();
//     chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], tab, (streamId) => {
//       //check whether the user canceled the request or not
//       if (streamId && streamId.length) {
//         setTimeout(() => {
//           chrome.tabs.sendMessage(tab.id, { name: 'stream', streamId }, (response) =>
//             console.log(response)
//           );
//         }, 200);
//       }
//     });

//     chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
//       if (message.name === 'download' && message.url) {
//         console.log(message.url);
//         chrome.downloads.download(
//           {
//             filename: 'screenshot.png',
//             url: message.url,
//           },
//           (downloadId) => {
//             senderResponse({ success: true });
//           }
//         );

//         return true;
//       }
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// }
