# lambda-mini

Low-dependency, low-code AWS lambda function framework for mini-services

It is an alternative to https://github.com/dougmoscrop/serverless-http

Features

- ✅ Routing
- ✅ Middlewares

## Example : simple

```javascript
const mini = require("lambda-mini")

const app = mini()

app.GET("/api/pets/:type/age/:age", function ({ event, context, params }) {
  // ...do something with params.type, params.age
  return {
    statusCode: "200",
    body: {
      pets: [{ name: "foo" }, { name: "bar" }],
    },
  }
})

exports.handler = app.handler
```

## Example : middlware callbacks

```javascript
function myAuthenticationMiddleware({ event, context }) {
  // my auth logic ...
  const token = event.headers["auth_token"]
  // ... my auth logic
  if (true) {
    context.user = {} // await retrieveUserFromDb()
  } else {
    return {
      statusCode: "401",
      body: {
        error: { code: "321", message: "You must be authenticated" },
      },
    }
  }
}
app.GET(
  "/api/private/critical_data",
  myAuthenticationMiddleware,
  function ({ event, context }) {
    // do something with context.user ...
    return {
      statusCode: "200",
      body: {
        email: "foo@bar.com",
        name: "Jean Valjean",
      },
    }
  }
)
```

## Example : use global middlwares

```javascript
app.addMiddleware(myAuthenticationMiddleware)
app.addMiddleware(myBusinessLogic1)
app.addMiddleware(myBusinessLogic2)
app.addMiddleware(myBusinessLogic3)
```
