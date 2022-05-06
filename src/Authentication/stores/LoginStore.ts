import {types} from 'mobx-state-tree';

const LoginStore = types
  .model('LoginStore', {
    logined: false,
  })
  .actions(self => ({
    loginSuccess() {
      self.logined = true;
    },
    logout() {
      self.logined = false;
    },
  }));
export default LoginStore;
