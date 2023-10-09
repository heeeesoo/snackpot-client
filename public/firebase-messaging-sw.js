// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyCj8cmzn94XS6HfqVXvMnmRvSH66LcrblQ",
    authDomain: "snackpot-2aff6.firebaseapp.com",
    projectId: "snackpot-2aff6",
    storageBucket: "snackpot-2aff6.appspot.com",
    messagingSenderId: "772201837506",
    appId: "1:772201837506:web:b594806bf50b8f72e89c5b",
    measurementId: "G-RBMVKFLVBN"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/vercel.svg'
//     };
  
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
// });

//백그라운드 서비스워커 설정
// messaging.onBackgroundMessage(messaging, (payload) => {
//     console.log(
//       "[firebase-messaging-sw.js] Received background message ",
//       payload
//     );
    
//     // Customize notification here
//     const notificationTitle = "Background Message Title";
//     const notificationOptions = {
//       body: payload,
//       icon: "/firebase-logo.png",
//     };
    
//     self.registration.showNotification(notificationTitle, notificationOptions);
// });


// 푸시 이벤트 처리
// 푸시 내용을 처리해서 알림으로 띄운다.
// self.addEventListener("push", function (event) {
//     if (event.data) {
//       // 알림 메세지일 경우엔 event.data.json().notification;
//       const data = event.data.json().data;
//       const options = {
//         body: data.body,
//         icon: data.image,
//         image: data.image,
//         data: {
//           click_action: data.click_action, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
//         },
//       };
      
//       event.waitUntil(
//         self.registration.showNotification(data.title, options)
//       );
//     } else {
//       console.log("This push event has no data.");
//     }
//   });
  
//   // 클릭 이벤트 처리
//   // 알림을 클릭하면 사이트로 이동한다.
//   self.addEventListener("notificationclick", function (event) {
//     event.preventDefault();
//     // 알림창 닫기
//     event.notification.close();
  
//     // 이동할 url
//     // 아래의 event.notification.data는 위의 푸시 이벤트를 한 번 거쳐서 전달 받은 options.data에 해당한다. 
//     // api에 직접 전달한 데이터와 혼동 주의
//     const urlToOpen = event.notification.data.click_action;
  
//     // 클라이언트에 해당 사이트가 열려있는지 체크
//     const promiseChain = clients
//       .matchAll({
//         type: "window",
//         includeUncontrolled: true,
//       })
//       .then(function (windowClients) {
//         let matchingClient = null;
  
//         for (let i = 0; i < windowClients.length; i++) {
//           const windowClient = windowClients[i];
//           if (windowClient.url.includes(urlToOpen)) {
//             matchingClient = windowClient;
//             break;
//           }
//         }
        
//         // 열려있다면 focus, 아니면 새로 open
//         if (matchingClient) {
//           return matchingClient.focus();
//         } else {
//           return clients.openWindow(urlToOpen);
//         }
//       });
  
//     event.waitUntil(promiseChain);
// });