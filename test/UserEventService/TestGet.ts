import { expect } from 'chai';
import * as sinon from 'sinon';
import * as _ from 'lodash';

import UserEvent from 'app/models/UserEvent';
import UserEventService from 'app/services/UserEventService';

describe('Get function', () => {
  let sandbox = null;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(async () => {
    sandbox.restore();
    const scanResult = await UserEvent.scan().loadAll().execAsync();
    for (const item of scanResult.Items) {
      await UserEvent.destroyAsync(item.toJSON().id);
    }
  });

  it('should return all events', async () => {
    const createdItems = await UserEvent.createAsync([
      { type: 'view' },
      { type: 'click' }
    ]);

    let expected = _.map(createdItems, (item) => item.toJSON());
    expected = _.orderBy(expected, 'createdAt', 'desc');
    let result = await UserEventService.get();
    result = _.orderBy(result, 'createdAt', 'desc');

    for (const index in result) {
      const expectItem = expected[index];
      const actualItem = result[index];

      expect(expectItem.type).to.equal(actualItem.type);
      expect(expectItem.createdAt).to.equal(actualItem.createdAt);
      expect(expectItem.id).to.equal(actualItem.id);
    }
  });

});
