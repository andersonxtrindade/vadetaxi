const { Driver } = require("../models");

class DriverController {
  async getAllDrivers(req, res) {
    try {
      const drivers = await Driver.findAll();
      res.json(drivers);
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createDriver(req, res) {
    const { name, phone_number, car } = req.body;
    try {
      const newDriver = await Driver.create({
        name,
        phone_number,
        car,
      });
      res.status(201).json(newDriver);
    } catch (error) {
      console.error("Erro ao criar um motorista:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new DriverController();
