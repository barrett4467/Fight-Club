module.exports = function(sequelize, DataTypes) {
  var Opponents = sequelize.define("Opponents", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    attack_points_1: DataTypes.INTEGER,
    attack_points_2: DataTypes.INTEGER
  });
  return Opponents;
};
