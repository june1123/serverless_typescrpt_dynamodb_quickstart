import { expect } from 'chai';
import * as sinon from 'sinon';
import * as _ from 'lodash';

import UserEvent from 'app/models/UserEvent';
import UserEventService from 'app/services/UserEventService';

describe('View function', () => {
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

  it('should return view event', async () => {
    const time = new Date(2017, 5, 5).getTime();
    sandbox.useFakeTimers(time);

    const view = await UserEventService.view();

    expect(view.id).to.exist;
    expect(view.type).equal('view');
    expect(new Date(view.createdAt).getTime()).equal(new Date(time).getTime());

  });

  it('should event stored in db', async () => {
    const time = new Date(2017, 5, 5).getTime();
    const clock = sinon.useFakeTimers(time);

    await UserEventService.view();
    // Faketimer make stop the event loop.
    clock.restore();

    const scanResult = await UserEvent.scan().execAsync();

    expect(scanResult.Count).to.equal(1);
    expect(scanResult.Items).to.exist;

    const items = _.map(scanResult.Items, (item) => item.toJSON());
    const item = items[0];
    expect(item.type).equal('view');
    expect(new Date(item.createdAt).getTime()).equal(new Date(time).getTime());
  });
});
