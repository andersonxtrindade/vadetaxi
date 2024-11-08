const request = require("supertest");
const app = require("../../src/app");
const { sequelize } = require("../../src/app/models");
const { Passenger } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("Passengers", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("Should create a passenger", async () => {
    const passenger = {
      name: "Anderson",
      phone_number: "11960251258",
    };

    const response = await request(app).post("/passengers").send({
      name: passenger.name,
      phone_number: passenger.phone_number,
    });

    expect(response.status).toBe(201);
  });

  it("Should return 500 if not have name in body", async () => {
    const passenger = {
      phone_number: "11960251258",
    };

    const response = await request(app).post("/passengers").send({
      phone_number: passenger.phone_number,
    });
    expect(response.status).toBe(500);
  });

  it("Should return 500 if not have phone_number in body", async () => {
    const passenger = {
      name: "Anderson",
    };

    const response = await request(app).post("/passengers").send({
      name: passenger.name,
    });
    expect(response.status).toBe(500);
  });

  it("Should return the list of passengers", async () => {
    await Passenger.create({
      name: "Anderson",
      phone_number: "123456789",
    });

    const response = await request(app).get("/passengers");
    
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("Should return 500 if have a error in the database", async () => {
    await sequelize.close();

    const response = await request(app).get("/passengers");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error", "Internal Server Error");
  });
});
