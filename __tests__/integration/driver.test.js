const request = require("supertest");
const app = require("../../src/app");
const { sequelize } = require("../../src/app/models");
const { Driver } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("Drivers", () => {
  beforeEach(async () => {
    await truncate();
  });
  
  it("Should create a driver", async () => {
    const driver = {
      name: "Anderson",
      car: "Palio",
      phone_number: "11960251258",
    };

    const response = await request(app).post("/drivers").send({
      name: driver.name,
      car: driver.car,
      phone_number: driver.phone_number,
    });

    expect(response.status).toBe(201);
  });

  it("Should return 500 if not have name in body", async () => {
    const driver = {
      phone_number: "11960251258",
      car: "Palio",
    };

    const response = await request(app).post("/drivers").send({
      phone_number: driver.phone_number,
      car: driver.car,
    });
    expect(response.status).toBe(500);
  });

  it("Should return 500 if not have phone_number in body", async () => {
    const driver = {
      name: "Anderson",
      car: "Palio",
    };

    const response = await request(app).post("/drivers").send({
      name: driver.name,
      car: driver.car,
    });
    expect(response.status).toBe(500);
  });

  it("Should return the list of drivers", async () => {
    await Driver.create({
      name: "Anderson",
      phone_number: "123456789",
      car: "Palio",
    });

    const response = await request(app).get("/drivers");
    
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("Should return 500 if have a error in the database", async () => {
    await sequelize.close();

    const response = await request(app).get("/drivers");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error", "Internal Server Error");
  });
});
