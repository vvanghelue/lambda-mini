const mini = require("./index")

const app = mini()

app.GET("/api/pets", function ({ event, context }) {
  return {
    statusCode: "200",
    body: {
      pets: [{ name: "foo" }, { name: "bar" }],
    },
  }
})

// function authentificationMiddleware({ event, context }) {
//   // my auth logic ...
//   const token = event.headers["auth_token"]
//   // ... my auth logic
//   if (true) {
//     context.user = {} // await retrieveUserFromDb()
//   }
// }
// app.GET(
//   "/api/private/critical_data",
//   authentificationMiddleware,
//   function ({ event, context }) {
//     // do something with context.user ...
//     return {
//       statusCode: "200",
//       body: {
//         email: "foo@bar.com",
//         name: "Jean Valjean",
//       },
//     }
//   }
// )
exports.handler = app.handler(event)
