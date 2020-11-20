module.exports = app => {
    const films = require("../controllers/films.controller.js");
  
    let router = require("express").Router();
  
    // Create a new Film
    router.post("/", films.create);
  
    // Retrieve all Films
    router.get("/", films.findAll);
   
    // Retrieve a single Film with id
    router.get("/:id", films.findOne);
  
    // Update a Film with id
    router.put("/:id", films.update);
  
    // Delete a Film with id
    router.delete("/:id", films.delete);
  
    // Delete all films
    router.delete("/", films.deleteAll);
  
    app.use('/api/films', router);
};