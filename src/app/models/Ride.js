module.exports = (sequelize, DataTypes) => {
  const Ride = sequelize.define(
    "Ride",
    {
      status: {
        type: DataTypes.ENUM(
          "Aguardando Motorista",
          "Em Andamento",
          "Finalizada"
        ),
        allowNull: false,
      },
      origin: DataTypes.STRING,
      destination: DataTypes.STRING,
      date_time_request: DataTypes.DATE,
      date_time_start: DataTypes.DATE,
      date_time_end: DataTypes.DATE,
      value: DataTypes.DECIMAL(10, 2),
      passenger_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "passengers",
          key: "id",
        },
      },
      driver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "drivers",
          key: "id",
        },
      },
    },
    {
      tableName: "rides",
    }
  );

  Ride.associate = function (models) {
    Ride.belongsTo(models.Passenger, {
      foreignKey: "passenger_id",
      as: "passenger",
      onDelete: "CASCADE",
    });
    Ride.belongsTo(models.Driver, {
      foreignKey: "driver_id",
      as: "driver",
      onDelete: "CASCADE",
    });
  };

  return Ride;
};
