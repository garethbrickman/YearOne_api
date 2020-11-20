const db = require("../models");
const Film = db.films;
const Op = db.Sequelize.Op;

// Create and Save a new Film
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
        message: "Content cannot be empty"
        });
        return;
    }

    // Create a Film
    // TODO should the thumbs be included when adding a new film to the db?
    const film = {
        title: req.body.title,
        thumbs_up: req.body.thumbs_up,
        thumbs_down: req.body.thumbs_down
    };

    // Save Film in the database
    Film.create(film)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Film."
        });
    });
};

// Retrieve all Films / find by title from the database:
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Film.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving film(s)."
        });
    });
};

// Find a single Film with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Film.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Film with id=" + id
        });
    });
};

// Update a Film by the id in the request
// TODO include functionality to increment or decrement thumbs
exports.update = (req, res) => {
    const id = req.params.id;

    Film.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Film was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Film with id=${id}. Maybe Film was not found or req.body is empty.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Film with id=" + id
        });
    });
};

// Delete a Film with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Film.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Film was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Film with id=${id}. Maybe Film was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Film with id=" + id
        });
    });
};

// Delete all Films from the database.
exports.deleteAll = (req, res) => {
    Film.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Films were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Films."
          });
    });
};