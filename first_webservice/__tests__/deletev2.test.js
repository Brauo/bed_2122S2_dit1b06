// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../server");

describe("DELETE / ", () => {
    test("It should respond with json msg for DELETE", async () => {
      const response = await request(app).delete("/user/1")
        .send({"email": "admin@abc.com", "password": "1234567", "username":"admin", "role":"user"});
      //console.log(response)
      //expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
      expect(response.body.message).toMatch(/1(.*)has been successfully deleted/is);
      //expect(response.header['content-type']).toMatch(/html/is);
      expect(response.statusCode).toBe(200);
    });
  });
describe("GET /", () => {
    test("It should respond with html message", () => {
      return request(app)
            .get("/api/user")
            .then( response=>{
                expect(response.text).toMatch(/Data of all users sent/is)
                expect(response.text).not.toMatch(/\[(.*)"userid":1,"username":"John","email":"john@gmail.com","role":"user","password":"abc123"(.*)\]/is)
                expect(response.text).toMatch(/\[(.*)"userid":2,"username":"mary","email":"mary@gmail.com","role":"user","password":"abc123"(.*)\]/is)
                expect(response.header['content-type']).toMatch(/html/is)
                expect(response.statusCode).toBe(200);
        });
    });
});
