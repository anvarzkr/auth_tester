import axios from 'axios';

const url = 'http://IP_ADDRESS';

export default class AuthApi {

  static signUp(params) {
    console.log('API request: signUp', params);
    return axios({
      url: url + '/signUp',
      method: 'post',
      data: params
    }).then(({ data }) => {
      console.log(data);
    });
  }

  static signIn(params) {
    console.log('API request: signIn', params);
    return axios({
      url: url + '/signIn',
      method: 'post',
      data: params
    }).then(({ data }) => {
      console.log(data);

      if (data.auth_key) {
        window.setCookie(
          'auth_key',
          data.auth_key,
          {
            expires: 60 * 60 // 1 hour
          }
        );
      } else {
        console.log('No auth_key in signIn response');
      }
    });
  }

  static signOut(params) {
    console.log('API request: signOut', params);
    return axios({
      url: url + '/signOut',
      method: 'delete',
      data: params
    }).then(({ data }) => {
      console.log(data);

      window.deleteCookie('auth_key'); // delete auth_key from cookies
    });
  }

  static checkAuth(params) {
    console.log('API request: checkAuth', params);
    return axios({
      url: url + '/checkAuth',
      method: 'get',
      data: params
    }).then(({ data }) => {
      console.log(data);
    });
  }

}
