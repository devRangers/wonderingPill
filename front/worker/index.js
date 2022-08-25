self.addEventListener("push", (event) => {
  console.log("push!!!!! ", event);
  // self.clients.openWindow("/login");
});

self.addEventListener("notificationclick", (event) => {
  console.log("notificationclick!!!!! ", event);
  // self.clients.openWindow("/login");
});
