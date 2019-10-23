module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("User", {
    email: { type: Sequelize.STRING, validate: { isEmail: true } },
    password: { type: Sequelize.STRING, allowNull: false }
  });
  User.associate = function(models){
    models.User.hasMany(models.LeaderBoard);
  };
  return User;
};
