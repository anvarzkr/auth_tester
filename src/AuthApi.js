import axios from 'axios';

const url = 'http://localhost:3000';

export default class AuthApi {

  static signUp(params) {
    console.log('API request: signUp', params);
    return axios({
      url: url + '/auth',
      method: 'post',
      data: params
    }).then((response) => {
      let headers = response.headers;

      if (headers['access-token']) {
        AuthApi.setUser(headers);
      } else {
        console.log('No access-token in sign_up response');
      }
    });
  }

  static signIn(params) {
    console.log('API request: signIn', params);
    return axios({
      url: url + '/auth/sign_in',
      method: 'post',
      data: params
    }).then((response) => {
      let headers = response.headers;

      if (headers['access-token']) {
        AuthApi.setUser(headers);
      } else {
        console.log('No access-token in sign_in response');
      }
    });
  }

  static signOut(params) {
    console.log('API request: signOut', params);
    return axios({
      url: url + '/auth/sign_out',
      method: 'delete',
      headers: {
        ...AuthApi.getUser()
      }
    }).then((response) => {
      console.log(response.data);

      window.deleteCookie('access-token');
      window.deleteCookie('client');
      window.deleteCookie('uid');
    });
  }

  static checkAuth(params, callback) {
    console.log('API request: checkAuth', params);
    return axios({
      url: url + '/check_auth',
      method: 'get',
      params: {
        ...AuthApi.getUser()
      },
      headers: {
        ...AuthApi.getUser()
      }
    }).then((response) => {
      let { data, success } = response.data;
      console.log(response.data);

      if (success && callback)
        callback();
    });
  }

  static setUser(headers) {
    window.setCookie(
      'access-token',
      headers['access-token'],
      {
        expires: 60 * 60 // 1 hour
      }
    );
    window.setCookie(
      'client',
      headers['client'],
      {
        expires: 60 * 60 // 1 hour
      }
    );
    window.setCookie(
      'uid',
      headers['uid'],
      {
        expires: 60 * 60 // 1 hour
      }
    );

    console.log('New user: ', AuthApi.getUser());
  }

  static getUser() {
    return {
      ['access-token']: window.getCookie('access-token'),
      ['client']: window.getCookie('client'),
      ['uid']: window.getCookie('uid'),
    }
  }

}
