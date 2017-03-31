function transport (path, query, queryParams, token) {
  return fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json',
      'authorization': token
    },
    body: JSON.stringify({
      query,
      queryParams
    })
  })
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((responseBody) => {
    if (responseBody && responseBody.errors) {
      throw new Error(responseBody.errors);
    }
    return responseBody.data;
  });
}

export default function reachGraphQL (path, query, queryParams = {}, token) {
 return transport(path, query, queryParams, token).then((res) => {
   return res;
 });
}