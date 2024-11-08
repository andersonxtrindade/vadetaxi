const { Passenger } = require("../models");

class PassengerController {
  async getAllPassengers(req, res) {
    try {
      const passengers = await Passenger.findAll();
      res.json(passengers);
    } catch (error) {
      console.error("Erro ao buscar passageiros:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createPassenger(req, res) {
    const { name, phone_number } = req.body;
    try {
      const newPassenger = await Passenger.create({
        name,
        phone_number,
      });
      res.status(201).json(newPassenger);
    } catch (error) {
      console.error("Erro ao criar um passageiro:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new PassengerController();
