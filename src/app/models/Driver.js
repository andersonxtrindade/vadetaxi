module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define(
    "Driver",
    {
      car: DataTypes.STRING,
      name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      tableName: "drivers",
    }
  );

  Driver.associate = function (models) {
    Driver.hasMany(models.Ride, {
      foreignKey: "driver_id",
      as: "rides",
    });
  };

  return Driver;
};
