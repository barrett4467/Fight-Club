module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Characters", {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    attack_points_1: DataTypes.INTEGER,
    attack_points_2: DataTypes.INTEGER
  });
  return Character;
};
