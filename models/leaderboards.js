module.exports = function(sequelize, DataTypes) {
  var LeaderBoard = sequelize.define("LeaderBoard", {
    ranking: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    score: {
      type: DataTypes.INTEGER
    }

  });
  return LeaderBoard;
};
