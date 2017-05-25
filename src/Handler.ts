import UserEventService from './services/UserEventService';

async function handleEvent(event, context) {
  const service = new UserEventService();
  if (event.path === '/tutorial/hello') {
    return service.hello();
  } else if (event.path === '/tutorial/create') {
    return service.create();
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




