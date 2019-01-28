let wsConnection;

export function messengerWebsocketInitialize(actions) {
  // let wsUri = 'ws://WEBSOCKET_URI';
  let wsUri = 'ws://darqube.io:8880/messenger';

  try {
    wsConnection = new WebSocket(wsUri);
  } catch (e) {
    console.log(e);
  }

  wsConnection.onopen = function(evt) { onOpen(evt) };
  wsConnection.onclose = function(evt) { onClose(evt) };
  wsConnection.onmessage = function(evt) { onMessage(evt) };
  wsConnection.onerror = function(evt) { onError(evt) };

  let messengerWS = new MessengerWS(wsConnection);

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
    let data = JSON.parse(evt.data);
    console.log(data);
    performAction(data);

    // actions.displayResponse('messenger', JSON.stringify(evt.data, null, ' '));
    // actions.displayResponse('messenger', JSON.stringify(JSON.parse(evt.data)));
  }

  function onError(evt)
  {
    console.log("onErrorMessengerWS");
    console.log(evt);
    // actions.displayResponse('messenger', JSON.stringify(evt));
  }

  function performAction(data) {
    switch(data.type) {
      case "get_user_chats":
        let userChatIds = Object.keys(data.data);
        let userChats = [];
        let chatMessages = {};

        for (var index in userChatIds) {
          let currentUserChat = data.data[userChatIds[index]];
          chatMessages[currentUserChat._id] = [];
          for (var messageIndex in currentUserChat.messages) {
            let currentMessage = currentUserChat.messages[messageIndex];
            chatMessages[currentUserChat._id].push({
              id: Math.random(),
              user: currentMessage.sender,
              time: currentMessage.time,
              body: currentMessage.content.data
            });
          }

          userChats.push({
            id: currentUserChat._id,
            title: currentUserChat.name
          })
        }
        actions.setUserChats(userChats, chatMessages, messengerWS.sender);
        break;
      case "new_message":
        let chatId = data.id;
        let message = data["$push"].messages;
        let parsedMessage = {
          id: Math.random(),
          user: message.sender,
          time: message.time,
          body: message.content.data
        }
        actions.addChatMessage(chatId, parsedMessage);
        break;
      case "create_group_chat":
        let chat = data.data;
        let parsedChat = {
          id: chat._id,
          title: chat.name
        };
        actions.addUserChat(parsedChat);
        break;
      default:
        console.log("Response action is not found");
    }
  }

  return messengerWS;
}

class MessengerWS {

  constructor(connection) {
    this.connection = connection;
    this.sender = '';
  }

  getUserEmail = () => { return this.sender; }

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
