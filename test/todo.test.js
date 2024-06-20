const { describe, it, before } = require("mocha");
const chaiHttp = require("chai-http");

(async () => {
  const chai = await import("chai");
  const server = await import("../server.js");

  chai.use(chaiHttp);
  chai.should();

  describe("Todo API", () => {
    let authToken;
    let todoId;

    before((done) => {
      // Register and login to get auth token
      chai
        .request(server.default)
        .post("/auth/register")
        .send({ email: "testuser@example.com" })
        .end((err, res) => {
          chai
            .request(server.default)
            .get("/auth/login")
            .query({ token: res.body.token })
            .end((err, res) => {
              authToken = res.body.token;
              done();
            });
        });
    });

    it("should create a new todo", (done) => {
      chai
        .request(server.default)
        .post("/todos")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ title: "Test Todo", description: "Test description" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("id");
          todoId = res.body.id;
          done();
        });
    });

    it("should get all todos", (done) => {
      chai
        .request(server.default)
        .get("/todos")
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(1);
          done();
        });
    });

    it("should get a todo by id", (done) => {
      chai
        .request(server.default)
        .get(`/todos/${todoId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("id").eql(todoId);
          done();
        });
    });

    it("should update a todo", (done) => {
      chai
        .request(server.default)
        .put(`/todos/${todoId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ title: "Updated Todo", description: "Updated description" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("title").eql("Updated Todo");
          done();
        });
    });

    it("should delete a todo", (done) => {
      chai
        .request(server.default)
        .delete(`/todos/${todoId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });

    it("should get paginated todos", (done) => {
      chai
        .request(server.default)
        .get("/todos?page=1&limit=1")
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });

    it("should search todos", (done) => {
      chai
        .request(server.default)
        .get("/todos?search=Test")
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });

    it("should sort todos", (done) => {
      chai
        .request(server.default)
        .get("/todos?sortBy=title&order=asc")
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
})();
