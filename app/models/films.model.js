module.exports = (sequelize, Sequelize) => {
    const Films = sequelize.define("film", {
      title: {
        type: Sequelize.STRING
      },
      thumbsUp: {
        type: Sequelize.INTEGER
      },
      thumbsDown: {
        type: Sequelize.INTEGER
      }
    });
    return Films;
};