import * as DB from './Dynamodb';
/**
 * Some user event.
 */

const UserEvent = DB.define('UserEvent', {
  hashKey: 'id',
  timestamps: true,
  schema: {
    id: DB.types.uuid(),
    type: DB.types.string()
  }
});

export default UserEvent;
