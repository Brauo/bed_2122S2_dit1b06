// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../server");

describe("PUT / ", () => {
    test("It should respond with json msg for PUT", async () => {
      const response = await request(app).put("/user/1")
        .send({"email": "admin@abc.com", "password": "1234567", "username":"admin", "role":"user"});
      //console.log(response)
      //expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
      expect(response.body.message).toMatch(/1(.*)update with new email(.*)admin@abc.com/is);
      //expect(response.header['content-type']).toMatch(/html/is);
      expect(response.statusCode).toBe(200);
    });
  });
