module.exports = function(sequelize, DataTypes) {
  var LeaderBoard = sequelize.define("LeaderBoard", {
    // ranking: {
    //   type: DataTypes.INTEGER
    // },
    name: {
      type: DataTypes.STRING
    },
    score: {
      type: DataTypes.INTEGER
    }

  });
  LeaderBoard.associate = function(models){
    LeaderBoard.belongsTo(models.User);
  }
  return LeaderBoard;
};
