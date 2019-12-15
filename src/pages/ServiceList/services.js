import http, { createApi } from '../../configs/http';

const { post } = http.create('admin');

export default createApi({
  getList: '/rule/query',
  getDetail: '/rule/detail',
  save: '/rule/save',
  update: '/rule/update'
}, post);
