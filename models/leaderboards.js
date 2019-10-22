module.exports = function (sequelize, DataTypes) {
    var LeaderBoards = sequelize.define("LeaderBoard",
        {
            name: {
                type: DataTypes.STRING,

            }
        })
    return LeaderBoards;
}
