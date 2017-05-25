import { documentClient, getTableName } from './Dynamodb';

/**
 * Some user event.
 */
class UserEvent {
  id: number;
  type: string;

  put() {
    this.id = Date.now();
    const params = {
      TableName: getTableName('UserEvent'),
      Item: {
        id: this.id,
        type: this.type
      }
    };
    return documentClient.put(params).promise();
  }
}

export default UserEvent;
