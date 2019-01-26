let wsConnection;

export function messengerWebsocketInitialize(displayResponse) {
  // let wsUri = 'ws://WEBSOCKET_URI';
  let wsUri = 'ws://localhost:8800/messenger';

  try {
    wsConnection = new WebSocket(wsUri);
  } catch (e) {
    console.log(e);
  }

  wsConnection.onopen = function(evt) { onOpen(evt) };
  wsConnection.onclose = function(evt) { onClose(evt) };
  wsConnection.onmessage = function(evt) { onMessage(evt) };
  wsConnection.onerror = function(evt) { onError(evt) };

  function onOpen(evt)
  {
    console.log("onOpenMessengerWS");
  }

  function onClose(evt)
  {
    console.log("onCloseMessengerWS");
  }

  function onMessage(evt)
  {
    console.log("MessengerWS received data:");
    console.log(evt.data);

    // displayResponse('messenger', JSON.stringify(evt.data, null, ' '));
    displayResponse('messenger', JSON.stringify(JSON.parse(evt.data)));
  }

  function onError(evt)
  {
    console.log("onErrorMessengerWS");
    console.log(evt);
    displayResponse('messenger', JSON.stringify(evt));
  }

  return new MessengerWS(wsConnection);
}

class MessengerWS {

  constructor(connection) {
    this.connection = connection;
  }

  login = (params, email) => {
    this.send('login', params, email);
    this.sender = email;
  }

  createChat = (params) => {
    params = {
      ...params,
      type: 'group',
      users: [this.sender] + ',' + 'group_user1@mail.ru' + ',' + 'group_user2@mail.ru'
    }

    this.send('create_group_chat', params);
  }

  inviteUserToChat = (params) => {
    this.send('add_users_to_chat', params);
  }

  getUserChats = (params) => {
    this.send('get_user_chats', params);
  }

  deleteChat = (params) => {
    this.send('deleteChat', params);
  }

  sendMessage = (params) => {
    params = {
      ...params,
      type: 'text'
    }
    this.send('send_message', params);
  }

  getChatUsers = (params) => {
    this.send('get_chat_users', params);
  }

  send = (type, params, sender) => {
    // console.log('WS send:', type, params, sender);
    const message = JSON.stringify({
      action: type,
      sender: sender || this.sender || '',
      body: params || {}
    });
    console.log('Sending message:')
    console.log(message);
    this.connection.send(message);
  }

}
