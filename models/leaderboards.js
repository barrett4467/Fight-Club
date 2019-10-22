module.exports = function(sequelize, DataTypes) {
  var LeaderBoard = sequelize.define("LeaderBoard", {
    name: {
      type: DataTypes.STRING
    }
  });
  return LeaderBoard;
};
