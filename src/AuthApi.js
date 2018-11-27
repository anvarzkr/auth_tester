import axios from 'axios';

const url = 'http://localhost:3000';

export default class AuthApi {

  static signUp(params) {
    console.log('API request: signUp', params);
    return axios({
      url: url + '/auth',
      method: 'post',
      data: params,
      // headers: {
      //   ...params
      // }
    }).then(({ data }) => {
      console.log(data);

      if (data['access-token']) {
        AuthApi.setUser(data);
      } else {
        console.log('No access-token in signUp response');
      }
    });
  }

  static signIn(params) {
    console.log('API request: signIn', params);
    return axios({
      url: url + '/auth/sign_in',
      method: 'post',
      data: params,
      // headers: {
      //   ...params
      // }
    }).then(({ data }) => {
      console.log(data);

      if (data['access-token']) {
        AuthApi.setUser(data);
      } else {
        console.log('No access-token in signIn response');
      }
    });
  }

  static signOut(params) {
    console.log('API request: signOut', params);
    return axios({
      url: url + '/auth/sign_out',
      method: 'delete',
      // data: params,
      headers: {
        // ...params,
        ...AuthApi.getUser()
      }
    }).then(({ data }) => {
      console.log(data);

      window.deleteCookie('access-token');
      window.deleteCookie('client');
      window.deleteCookie('uid');
    });
  }

  static checkAuth(params) {
    console.log('API request: checkAuth', params);
    return axios({
      url: url + '/auth/check',
      method: 'get',
      params: {
        // ...params,
        ...AuthApi.getUser()
      }
      // headers: {
      //   ...params,
      //   ...AuthApi.getUser()
      // }
    }).then(({ data }) => {
      console.log(data);
    });
  }

  static setUser(data) {
    window.setCookie(
      'access-token',
      data['access-token'],
      {
        expires: 60 * 60 // 1 hour
      }
    );
    window.setCookie(
      'client',
      data['client'],
      {
        expires: 60 * 60 // 1 hour
      }
    );
    window.setCookie(
      'uid',
      data['uid'],
      {
        expires: 60 * 60 // 1 hour
      }
    );
  }

  static getUser() {
    return {
      ['access-token']: window.getCookie('access-token'),
      ['client']: window.getCookie('client'),
      ['uid']: window.getCookie('uid'),
    }
  }

}
