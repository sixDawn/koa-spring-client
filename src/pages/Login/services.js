import http from '../../configs/http';

const { post } = http.create('admin');

export function login(param) {
  return post('/user/login', {
    ...param,
  }, { ignoreQuery: true });
}
