import cookie from 'js-cookie';
import { SITE_NAME } from '../configs/constants';

export default {
  namespace: 'layout',

  state: {
    siteName: SITE_NAME,
    name: cookie.get('username'),
    loading: { login: false, infoInit: false },
  },
  subscriptions: {
    setup({ dispatch, listen }) {
      listen('/', () => {
        const token = cookie.get('token');
        const uid = cookie.get('uid');
        if (!(uid && token)) {
          dispatch({ type: 'login/logout' });
        }
      });
    }
  },
  effects: {},
  reducers: {}
};
