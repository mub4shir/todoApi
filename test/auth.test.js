const { describe, it, before } = require("mocha");
const chaiHttp = require("chai-http");

(async () => {
  const chai = await import("chai");
  const server = await import("../server.js");

  chai.use(chaiHttp);
  chai.should();

  describe("Auth API", () => {
    let magicToken;
    let authToken;

    it("should register a user and send a magic link", (done) => {
      chai
        .request(server.default)
        .post("/auth/register")
        .send({ email: "testuser@example.com" })
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.equal("Login link sent to email");
          magicToken = res.body.token; // Simulate extracting from email
          done();
        });
    });

    it("should login the user using the magic token", (done) => {
      chai
        .request(server.default)
        .get("/auth/login")
        .query({ token: magicToken })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          authToken = res.body.token; // Save JWT for further tests
          done();
        });
    });
  });
})();
