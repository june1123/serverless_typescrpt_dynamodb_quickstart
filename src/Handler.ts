import UserEventService from 'app/services/UserEventService';
import * as dynogels from 'dynogels';

async function handleEvent(event, context) {
  if (event.path === '/view') {
    return UserEventService.view();
  } else if (event.path === '/click') {
    return UserEventService.click();
  } else if (event.path === '/get') {
    return UserEventService.get();
  }
}

export async function mainHandler(event, context, callback) {
  try {
    const result = await handleEvent(event, context);
    const response = {
      statusCode: 200,
      body: JSON.stringify(result)
    };
    callback(null, response);
  } catch (error) {
    console.log('error', error);
    callback(error);
  }
};
