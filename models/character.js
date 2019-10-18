module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Character", {
    name: DataTypes.STRING,
    name: DataTypes.INTEGER,
    attack_points: DataTypes.INTEGER
  });
  return Character;
};
