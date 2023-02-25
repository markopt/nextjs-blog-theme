// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    console.log(event.body)
    // statusCode: 200,
    const endpoint = 'https://events.split.io/api/events';
    const url = new URL(endpoint);
    url.searchParams.set('ts', event.body.timestamp);
    const splitEvent = {
      eventTypeId: event.body.accountId,
      environmentName: 'Prod-Default',
      trafficTypeName: 'user',
      key: event.body.visitorId,
      timestamp: new Date(event.timestamp).getTime(),
      // value: event.properties.total,
      properties: event.body.properties
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
