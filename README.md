## simple

```javascript
const mini = require("lambda-mini")

const app = mini()

app.GET("/api/pets", function ({ event, context }) {
  return {
    statusCode: "200",
    body: {
      pets: [{ name: "foo" }, { name: "bar" }],
    },
  }
})

exports.handler = app.handler(event)
```

## use middlware callbacks

```javascript
function authentificationMiddleware({ event, context }) {
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
  authentificationMiddleware,
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

## use global middlwares
```javascript
app.addMiddleware(authentificationMiddleware)
app.addMiddleware(myBusinessLogic1)
app.addMiddleware(myBusinessLogic2)
app.addMiddleware(myBusinessLogic3)
```
