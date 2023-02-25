// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    console.log(event.body);
    const payload = JSON.parse(event.body);
    console.log(payload);
    // statusCode: 200,
    const endpoint = 'https://events.split.io/api/events';
    const url = new URL(endpoint);
    url.searchParams.set('ts', payload.body.timestamp);
    const splitEvent = {
      eventTypeId: payload.body.accountId,
      environmentName: 'Prod-Default',
      trafficTypeName: 'user',
      key: payload.body.visitorId,
      timestamp: new Date(payload.body.timestamp).getTime(),
      // value: event.properties.total,
      properties: payload.body.properties
    };
    console.log(splitEvent);
    const res = await fetch(url.toString(), {
      body: JSON.stringify(splitEvent),
      headers: new Headers({
        Authorization: 'Bearer robnevfsd5lrn9maicfmp4ipkb5s2lt459i6',
        'Content-Type': 'application/json'
      }),
      method: 'post'
    });
    return await res.text();
    // body: JSON.stringify({ message: `Hello ${subject}` }),
    // // more keys you can return:
    // headers: { "headerName": "headerValue", ... },
    // isBase64Encoded: true,
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
