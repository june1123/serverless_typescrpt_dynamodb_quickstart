import { expect } from 'chai';
import * as sinon from 'sinon';
import * as _ from 'lodash';

import UserEvent from 'app/models/UserEvent';
import UserEventService from 'app/services/UserEventService';

describe('Click function', () => {
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

  it('should return click event', async () => {
    const time = new Date(2017, 5, 5).getTime();
    sandbox.useFakeTimers(time);

    const click = await UserEventService.click();

    expect(click.id).to.exist;
    expect(click.type).equal('click');
    expect(new Date(click.createdAt).getTime()).equal(new Date(time).getTime());

  });

  it('should event stored in db', async () => {
    const time = new Date(2017, 5, 5).getTime();
    const clock = sinon.useFakeTimers(time);

    await UserEventService.click();
    // Faketimer make stop the event loop.
    clock.restore();

    const scanResult = await UserEvent.scan().execAsync();

    expect(scanResult.Count).to.equal(1);
    expect(scanResult.Items).to.exist;

    const items = _.map(scanResult.Items, (item) => item.toJSON());
    const item = items[0];
    expect(item.type).equal('click');
    expect(new Date(item.createdAt).getTime()).equal(new Date(time).getTime());
  });
});
