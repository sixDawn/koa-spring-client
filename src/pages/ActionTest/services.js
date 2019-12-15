import http from '../../configs/http';

const { post } = http.create('mock');

export function login(param) {
  return post('/api/user/login', {
    ...param,
  }, { ignoreQuery: true });
}

export function signUp(param) {
  return post('/web/customer/register', param, { ignoreQuery: true });
}
