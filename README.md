# just-graphql

A small extenstion created to handle graphql requests.

# Usage

```js

  justGraphql(
    address,
    query/mutations payload,
    variables/mutations data,
    token,
    onSuccess callback,
    onFailure callback,
    HTTP request returning new token in case of error/expiration
  )

```

# Queries

```js
import justGraphql from 'just-graphql';
var JWT = require('jwt-client');
var jQuery = require("jquery");

justGraphql(`server_address/graphql`,
  `query Notifications {
    me {
      notifications(first: 10, order: "created_at DESC") {
        pageInfo {
          startCursor,
          endCursor,
          hasNextPage,
          hasPreviousPage
        },
        totalCount,
        edges {
          cursor,
          node {
            id,
            type,
            data,
            read_at,
            created_at
          }
        }
      }
    }
  }`, {
    variables: {
      //no variables
    }
  },
  `Bearer ${JWT.get()}`,
  function(response) {
    console.log(response);
  },
  function(err) {
    alert(err);
  },
  function() {
    return (
      jQuery.ajax({
        url: `server_address/refresh/token`,
        type: 'GET',
        headers: {
          Authorization: 'Bearer ' + JWT.get()
        }
      })
      .then(function (response) {
        JWT.forget();
        JWT.keep(response.token);

        return response.token;
      });
    )
  }
)
.then((data) => {
  // pass data back to components state or Redux's store
});
```

# Mutations

```js
import justGraphql from 'just-graphql';
var JWT = require('jwt-client');
var jQuery = require("jquery");

justGraphql(`server_address/graphql`,
  `mutation DeleteRecords($input: DeleteRecordInput!) {
    deleteRecord(input: $input) {
      user {
        records
      }
    }
  }`, {
    variables: {
      data
    }
  },
  'Bearer ' + JWT.get(),
  function(response) {
    console.log(response);
  },
  function(err) {
    alert(err)
  }
  function() {
    return (
      jQuery.ajax({
        url: `server_address/refresh/token`,
        type: 'GET',
        headers: {
          Authorization: 'Bearer ' + JWT.get()
        }
      })
      .then(function (response) {
        JWT.forget();
        JWT.keep(response.token);

        return response.token;
      });
    )
  }
).then((data) => {
  // pass data back to components state or Redux's store
});
```
