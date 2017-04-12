export default function justGraphql(path, query, queryParams = {}, token, onSuccess = false, onFailure = false, tokenReplacer = false) {
 return transport(path, query, queryParams, token, onSuccess, onFailure, tokenReplacer).then((res) => {
   return res;
 });
}

function transport(path, query, queryParams, token, onSuccess, onFailure, tokenReplacer) {
  function handleStatus(response) {

    if (onSuccess) {
      onSuccess(response)
    }

    return response.json();
  }

  function returnResponseBody(responseBody) {
    if (responseBody && responseBody.errors) {
      throw new Error(responseBody.errors);
    }
    return responseBody.data;
  }

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
  .then((response) => handleStatus(response))
  .then((responseBody) => returnResponseBody(responseBody))
  .catch((err) => {
    if (tokenReplacer) {
      return tokenReplacer()
        .then(function (token) {

          return transport(path, query, queryParams, 'Bearer ' + token, onSuccess, onFailure).then((res) => {
            return res;
          });;
        })
        .catch((err) => {
  				if (onFailure) {
  					onFailure(err);
          }

          throw new Error(err);
  			});
    } else {
      if (onFailure) {
        onFailure(err);
      }

      throw new Error(err);
    }
  });
}
