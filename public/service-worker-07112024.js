self.addEventListener('push', (event) => {
  const data = event.data.json();
  const title = data.title;
  const options = {
    body: data.description,
    data,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://soportes.gana-loterias.online' + event.notification.data.url)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // CLosing the notification when clicked
  const urlToOpen = 'https://soportes.gana-loterias.online' + event?.notification?.data?.url || 'https://soportes.gana-loterias.online';
  // Open the URL in the default browser.
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then((windowClients) => {
        // Check if there is already a window/tab open with the target URL
        for (const client of windowClients) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // If not, open a new window/tab with the target URL
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

self.addEventListener('message', (event) => {
});
