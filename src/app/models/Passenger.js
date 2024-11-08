module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define(
    "Passenger",
    {
      name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      tableName: "passengers",
    }
  );

  Passenger.associate = function (models) {
    Passenger.hasMany(models.Ride, {
      foreignKey: "passenger_id",
      as: "rides",
    });
  };

  return Passenger;
};
