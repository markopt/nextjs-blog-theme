// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  let response
  try {
    console.log(event.body);
    const payload = JSON.parse(event.body);
    console.log(payload);
    // statusCode: 200,
    const endpoint = 'https://events.split.io/api/events';
    const url = new URL(endpoint);
    url.searchParams.set('ts', payload.timestamp);
    const splitEvent = {
      // eventTypeId: payload.accountId,
      eventTypeId: 'test click',
      environmentName: 'Prod-Default',
      trafficTypeName: 'user',
      key: payload.visitorId,
      timestamp: new Date(payload.timestamp).getTime(),
      // value: event.properties.total,
      properties: payload.properties
    };
    console.log(splitEvent);
    console.log(JSON.stringify(splitEvent));
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;',
          'Authorization': 'Bearer robnevfsd5lrn9maicfmp4ipkb5s2lt459i6'
      },
      body: JSON.stringify(splitEvent)
    }
    fetch(endpoint, options)
      .then(res => res.json())
      .then(data => console.log(data))
      .error(e => console.error(e))
    // let response = await fetch(url.toString(), {
    //   body: JSON.stringify(splitEvent),
    //   headers: {
    //     'Authorization': 'Bearer robnevfsd5lrn9maicfmp4ipkb5s2lt459i6',
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST'
    // });
    // console.log(res.json);
    // let response = await res.json();
    // console.log(response.json);
    // console.log(res.text());
    // body: JSON.stringify({ message: `Hello ${subject}` }),
    // // more keys you can return:
    // headers: { "headerName": "headerValue", ... },
    // isBase64Encoded: true,
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
