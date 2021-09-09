const routeParser = require("route-parser")

module.exports = function () {
  const routes = []
  const middlewares = []

  function handler(event) {
    for (const route of routes) {
      if (route.method === event.httpMethod) {
        const match = routeParser(route.route).match(event.path)
        if (match) {
          for (const middleware of middlewares) {
            const output = middleware({ event, context })
            if (output) {
              return output
            }
          }
          for (const callback of route.callbacks) {
            const output = callback({ event, context })
            if (output) {
              return output
            }
          }
        }
      }
    }
    // throw new Error(`Route ${event.path} not found`)
    return {
      statusCode: 500,
      body: `Route ${event.path} not found`,
    }
  }

  const self = {
    handler,
    addMiddleware(middleware) {
      middlewares.push(middleware)
    },
  }

  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  for (const method of methods) {
    self[method] = function (route) {
      const args = Array.from(arguments)
      const callbacks = args.slice(1, args.length)
      routes.push({
        method: "GET",
        route,
        callbacks: callbacks || [],
      })
    }
  }

  return self
}
