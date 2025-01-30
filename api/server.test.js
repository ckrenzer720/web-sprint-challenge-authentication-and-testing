// - [ ] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.
const server = require("./auth/auth-router");
const request = require("supertest");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");

test("sanity", () => {
  expect(true).toBe(true);
});
describe("[POST] /register", () => {
  it("responds with status 201 on success", async () => {
    const response = await request(server)
      .post("/api/auth/register")
      .send({ username: "conner", password: "password1234" });
    expect(response.status).toBe(201);
  });
  it("creates a new user in the database", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "conner", password: "password1234" });
    const conner = await db("users").where("username", "conner").first();
    expect(conner).toMatchObject({ username: "conner" });
  });
  it("saves the registered user with a bcrypted password instead of plain text", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "conner", password: "password1234" });
    const conner = await db("users").where("username", "conner").first();
    expect(bcrypt.compareSync("password", conner.password)).toBeTruthy();
  });
});

/*
  Why testing?
    efficient bug dicovery
    documentation
    verifies edge cases
    developer can concentrate on current changes (safety net)
    
  Drawbacks of testing/when not to test
    when time is constrained
    legacy codebases
    more code to write and maintain
    UI/UX applications
    rapidily evolving requirements
    more tooling/dependencies

    npm i supertest --save-dev
*/
