export default class Main {
  constructor() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then(function () {
          console.log('Service Worker Registered');
        });
    }
  }
}

new Main();
