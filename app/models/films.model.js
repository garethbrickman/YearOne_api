module.exports = (sequelize, Sequelize) => {
    const Films = sequelize.define("film", {
      title: {
        type: Sequelize.STRING
      },
      thumbs_up: {
        type: Sequelize.INTEGER
      },
      thumbs_down: {
        type: Sequelize.INTEGER
      }
    });
    return Films;
};