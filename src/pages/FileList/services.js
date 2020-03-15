import http from '../../configs/http';

const { post } = http.create('admin');

export function getUploadToken(param) {
  return post('/user/getOssKey', param);
}
