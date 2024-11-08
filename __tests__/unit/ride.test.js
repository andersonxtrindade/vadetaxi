const RideController = require("../../src/app/controllers/RideController");
const { Ride, Passenger, Driver } = require("../../src/app/models");

// Mock Sequelize models
jest.mock("../../src/app/models");

describe("RideController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllRides", () => {
    it("should return all rides", async () => {
      const mockRides = [{ id: 1, status: "Aguardando Motorista" }];
      Ride.findAll.mockResolvedValue(mockRides);

      await RideController.getAllRides(req, res);

      expect(Ride.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockRides);
    });

    it("should return an error if there is a failure", async () => {
      Ride.findAll.mockRejectedValue(new Error("Database error"));

      await RideController.getAllRides(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("createRide", () => {
    it("should create a ride if passenger and driver exist", async () => {
      req.body = {
        status: "Aguardando Motorista",
        passenger_id: 1,
        driver_id: 2,
        origin: "Location A",
        destination: "Location B",
        date_time_request: "2024-11-07T00:00:00Z",
        value: 50
      };

      Passenger.findByPk.mockResolvedValue({ id: 1 });
      Driver.findByPk.mockResolvedValue({ id: 2 });
      Ride.create.mockResolvedValue(req.body);

      await RideController.createRide(req, res);

      expect(Passenger.findByPk).toHaveBeenCalledWith(1);
      expect(Driver.findByPk).toHaveBeenCalledWith(2);
      expect(Ride.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it("should return an error if passenger does not exist", async () => {
      req.body = { passenger_id: 1, driver_id: 2 };
      Passenger.findByPk.mockResolvedValue(null); // Passenger not found

      await RideController.createRide(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Passageiro não encontrado" });
    });
  });

  describe("getRideById", () => {
    it("should return a ride if found", async () => {
      req.params.id = 1;
      const mockRide = { id: 1, status: "Aguardando Motorista" };
      Ride.findByPk.mockResolvedValue(mockRide);

      await RideController.getRideById(req, res);

      expect(Ride.findByPk).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockRide);
    });

    it("should return an error if ride is not found", async () => {
      req.params.id = 1;
      Ride.findByPk.mockResolvedValue(null); // Ride not found

      await RideController.getRideById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Ride not found" });
    });
  });

  describe("updateRide", () => {

    it("should return an error if ride is not found", async () => {
      req.params.id = 1;
      Ride.findByPk.mockResolvedValue(null);

      await RideController.updateRide(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Corrida não encontrada" });
    });

    
  });

  describe("deleteRide", () => {
    it("should delete a ride if it exists", async () => {
      req.params.id = 1;
      const mockRide = { id: 1, destroy: jest.fn() };
      Ride.findByPk.mockResolvedValue(mockRide);

      await RideController.deleteRide(req, res);

      expect(Ride.findByPk).toHaveBeenCalledWith(1);
      expect(mockRide.destroy).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockRide);
    });

    it("should return an error if ride is not found", async () => {
      req.params.id = 1;
      Ride.findByPk.mockResolvedValue(null); // Ride not found

      await RideController.deleteRide(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Ride not found" });
    });
  });
});
