self.addEventListener("notificationclick", (event) => {
  console.log(event);
  self.clients.openWindow("/login");
});
