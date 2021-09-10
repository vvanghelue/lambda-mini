const assert = require("assert")
const mini = require("../index")

describe("Router", function () {
  it("Should match", async function () {
    const app = mini()
    app.GET("/test", () => {
      return "hello"
    })
    const event = {
      path: "/test",
      httpMethod: "GET",
    }
    const output = await app.handler(event)
    assert.equal(output, "hello")
  })

  it("Should fail if route not found", async function () {
    const app = mini()
    app.GET("/test", () => {
      return "hello"
    })
    const event = {
      path: "/test_ffffffail",
      httpMethod: "GET",
    }
    const output = await app.handler(event)
    assert.notEqual(output, "hello")
  })

  it("Match params", async function () {
    const app = mini()
    app.GET("/pets/:type/age/:age", ({ params }) => {
      return params
    })
    const event = {
      path: "/pets/dogs/age/3",
      httpMethod: "GET",
    }
    const output = await app.handler(event)
    assert.deepEqual(output, { type: "dogs", age: "3" })
  })
})

describe("Middlewares", function () {
  it("Should works with middlewares", async function () {
    const app = mini()
    app.GET(
      "/test",
      function ({ event, context }) {
        context.foo = "bar"
      },
      function ({ event, context }) {
        return context.foo
      }
    )
    const event = {
      path: "/test",
      httpMethod: "GET",
    }
    const output = await app.handler(event)
    assert.equal(output, "bar")
  })

  it("Middleware returns first", async function () {
    const app = mini()
    app.GET(
      "/test",
      function ({ event, context }) {
        return "you are not authenticated"
      },
      function ({ event, context }) {
        return "hello"
      }
    )
    const event = {
      path: "/test",
      httpMethod: "GET",
    }
    const output = await app.handler(event)
    assert.equal(output, "you are not authenticated")
  })
})

describe("Global Middlewares", function () {
  it("Should works with global middlewares", async function () {
    const app = mini()
    app.addMiddleware(() => {})
    app.addMiddleware(() => {})
    app.addMiddleware(() => "foo")
    app.addMiddleware(() => {})
    app.addMiddleware(() => {})
    app.GET("/test", function ({ event, context }) {
      return "hello"
    })
    const event = {
      path: "/test",
      httpMethod: "GET",
    }
    const output = await app.handler(event)
    assert.equal(output, "foo")
  })
})
