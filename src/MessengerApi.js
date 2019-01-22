import axios from 'axios';

const url = 'http://localhost:3000';

export default class MessengerApi {

  static getUserChats(params) {
    console.log('API request: getUserChats', params);

    return axios({
      url: url + '/ROUTE_USER_CHATS',
      method: 'get',
      data: params
    }).then((response) => {
      console.log(response.data);
    });
  }

  static createChat(params) {
    console.log('API request: createChat', params);

    return axios({
      url: url + '/ROUTE_CREATE_CHAT',
      method: 'post',
      data: params
    }).then((response) => {
      console.log(response.data);
    });
  }

  static deleteChat(params) {
    console.log('API request: deleteChat', params);

    return axios({
      url: url + '/ROUTE_DELETE_CHAT',
      method: 'post',
      data: params
    }).then((response) => {
      console.log(response.data);
    });
  }

  static inviteUser(params) {
    console.log('API request: inviteUser', params);

    return axios({
      url: url + '/ROUTE_INVITE_USER',
      method: 'post',
      data: params
    }).then((response) => {
      console.log(response.data);
    });
  }

  static sendMessage(params) {
    console.log('API request: sendMessage', params);

    return axios({
      url: url + '/ROUTE_SEND_MESSAGE',
      method: 'post',
      data: params
    }).then((response) => {
      console.log(response.data);
    });
  }

  static getChatUsers(params) {
    console.log('API request: getChatUsers', params);

    return axios({
      url: url + '/ROUTE_CHAT_USERS',
      method: 'post',
      data: params
    }).then((response) => {
      console.log(response.data);
    });
  }

}
