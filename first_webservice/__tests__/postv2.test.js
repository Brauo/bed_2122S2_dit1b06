// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../server");

describe("POST / ", () => {
    test("It should respond with html message receipt", async () => {
      const response = await request(app).post("/api/user")
        .send({"email": "admin@abc.com", "password": "1234567", "username":"abc", "role":"user"});
      //console.log(response)
      //expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
      expect(response.text).toMatch(/username(.*)abc/is);
      expect(response.text).toMatch(/email(.*)admin@abc.com/is);
      expect(response.text).toMatch(/password(.*)1234567/is);
      expect(response.text).toMatch(/role(.*)user/is);
      expect(response.header['content-type']).toMatch(/html/is);
      expect(response.statusCode).toBe(200);
    });
  });

describe("GET /", () => {
    test("It should respond with html message", () => {
      return request(app)
            .get("/api/user")
            .then( response=>{
                expect(response.text).toMatch(/\[(.*)"username":"abc","email":"admin@abc.com","role":"user","password":"1234567"(.*)\]/is)
                expect(response.header['content-type']).toMatch(/html/is)
                expect(response.statusCode).toBe(200);
        });
    });
});
