function getConnectionUrl() {
  return "http://localhost:5000/api/";
  // TODO: return process.env.VUE_APP_URL;
}

function listenForNotifications(socket, from, refresh) {
  socket.on(from, (data) => {
    if (data) {
      refresh();
    }
  });
}

function notify(socket, to) {
  socket.emit(to);
}

function notifyWithData(socket, to, data){
  socket.emit(to, data);
}

function listenForNotificationsWithData(socket, from, refresh) {
  socket.on(from, (data) => {
    if (data) {
      refresh(data);
    }
  });
}

export { getConnectionUrl, listenForNotifications, notify, notifyWithData, listenForNotificationsWithData };
