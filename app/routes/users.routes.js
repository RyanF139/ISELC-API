module.exports = app => {
    const user = require("../controllers/users.controller.js");
    var router = require("express").Router();
  
    router.post("/registrasi", user.ResgistrasiUser); // Registrasi User

    router.post("/login", user.Login); //Login User
  
    router.post("/change-password", user.ChangePassword) //Update Password
      
    app.use('/api/iselc/user', router);
  };
    