import UserEvent from '../models/UserEvent';
import * as _ from 'lodash';

class UserEventService {

  static async view() {
    const result = await UserEvent.createAsync({ type: 'view' });
    return result;
  }

  static async click() {
    const result = await UserEvent.createAsync({ type: 'click' });
    return result;
  }

  static async get() {
    const result = await UserEvent.scan().execAsync();
    console.log(_.map(result.Items, 'attrs'));
    return result;
  }

  static hello() {
    const hello = 'hello';
    return _.reduce(hello, (rs, s, index) => {
      rs += s + index;
      return rs;
    });
  }
}

export default UserEventService;
