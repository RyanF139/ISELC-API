module.exports = (sequelize, Sequelize) => {
    
    const User = sequelize.define("users", {         
      nama: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      status_password: {
        type: Sequelize.BOOLEAN
      },      
      status_user: {
        type: Sequelize.STRING
      },                  
      
    },{
      tableName : "users",
      timestamps: false
    });
  
    return User;
  };
  