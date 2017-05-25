import UserEvent from '../models/UserEvent';
import * as _ from 'lodash';

class UserEventService {

  async create() {
    const ue = new UserEvent();
    ue.type = 'view';
    const result = await ue.put();
    console.log('result', result);
    return result;
  }

  hello() {
    const hello = 'hello';
    return _.reduce(hello, (rs, s, index) => {
      rs += s + index;
      return rs;
    });
  }
}

export default UserEventService;
