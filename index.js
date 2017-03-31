function transport (path, query, queryParams, token, vars) {

  var object = {
    query: query
  };
  object[vars] = queryParams;

  return fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json',
      'authorization': token
    },
    body: JSON.stringify(object)
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

export default function build(vars) {
  return function (path, query, queryParams = {}, token) {
   return transport(path, query, queryParams, token, vars).then((res) => {
     return res;
   });
  }
}