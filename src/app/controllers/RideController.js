const { Ride, Passenger, Driver } = require("../models");

class RideController {
  async getAllRides(req, res) {
    try {
      const rides = await Ride.findAll();
      res.json(rides);
    } catch (error) {
      console.error("Erro ao buscar corridas:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createRide(req, res) {
    const {
      status,
      passenger_id,
      driver_id,
      origin,
      destination,
      date_time_request,
      date_time_start,
      date_time_end,
      value,
    } = req.body;
    try {
      const passenger = await Passenger.findByPk(passenger_id);
      const driver = await Driver.findByPk(driver_id);

      if (!passenger) {
        return res.status(400).json({ error: "Passageiro não encontrado" });
      }

      if (!driver) {
        return res.status(400).json({ error: "Motorista não encontrado" });
      }

      const newRide = await Ride.create({
        status,
        passenger_id,
        driver_id,
        origin,
        destination,
        date_time_request,
        date_time_start,
        date_time_end,
        value,
      });
      res.status(201).json(newRide);
    } catch (error) {
      console.error("Erro ao criar corridas:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getRideById(req, res) {
    const id = req.params.id;
    try {
      const ride = await Ride.findByPk(id);
      if (ride) {
        res.json(ride);
      } else {
        res.status(404).json({ error: "Ride not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateRide(req, res) {
    const id = req.params.id;
    const { status, driver_id } = req.body;

    try {
      const ride = await Ride.findByPk(id);

      if (!ride) {
        return res.status(404).json({ error: "Corrida não encontrada" });
      }
      
      if (status === "Em Andamento" && ride.status === "Aguardando Motorista") {
        if (!driver_id) {
          return res
            .status(400)
            .json({
              error:
                "É obrigatório informar o id do motorista para iniciar a corrida.",
            });
        }
        
        const driver = await Driver.findByPk(driver_id);
        if (!driver) {
          return res.status(404).json({ error: "Motorista não encontrado" });
        }
        
        ride.status = "Em Andamento";
        ride.driver_id = driver_id;
        await ride.save();

        return res.status(200).json(ride);
      }
      
      if (status === "Finalizada" && ride.status === "Em Andamento") {
        ride.status = "Finalizada";
        ride.date_time_end = new Date(); 
        await ride.save();

        return res.status(200).json(ride);
      }

      return res.status(400).json({
        error:
          "Não é possível alterar para o status solicitado. Verifique o status atual da corrida.",
      });
    } catch (error) {
      console.error("Erro ao atualizar o status da corrida:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async deleteRide(req, res) {
    const id = req.params.id;
    try {
      const ride = await Ride.findByPk(id);
      if (ride) {
        await ride.destroy();
        res.json(ride);
      } else {
        res.status(404).json({ error: "Ride not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new RideController();
