export default function justGraphql(path, query, queryParams = {}, token, onSuccess = false, onFailure = false) {
 return transport(path, query, queryParams, token, onSuccess, onFailure).then((res) => {
   return res;
 });
}

function transport(path, query, queryParams, token, onSuccess, onFailure) {
  return fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json',
      'authorization': token
    },
    body: JSON.stringify({
      query,
      ...queryParams
    })
  })
  .then((response) => {
    if (onSuccess && (response.status >= 200 && response.status <= 300)) {
      onSuccess(response);
    } else if (onFailure && response,status >= 500) {
      onFailure(response);
    }

    return response.json();
  })
  .then((responseBody) => {
    if (responseBody && responseBody.errors) {
      throw new Error(responseBody.errors);
    }
    return responseBody.data;
  });
}
