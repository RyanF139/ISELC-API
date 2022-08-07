
const db = require("../models");
const Users = db.user;
const Op = db.Sequelize.Op;

// Create User
const ResgistrasiUser = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // TambahUser    
    const user = {
        nama:req.body.username,                        
        username: req.body.username,
        password: req.body.password,            
        status_user : req.body.status_user,      
      };        
    // Save User in the database
    Users.create(user)
      .then(data => {
        res.status(200).json
        ({
            status:"Success",
            message:"User successfully added",
            data:data
        });
      })
      .catch(err => {
        res.status(500).send({
          message: "YAYAY"
            //err.message || "Some error occurred while creating the User." 
        });
      });
  };


// Login
const Login = async (req, res) => {
    const {username, password} = req.body;
    var cek = await Users.findOne({ where : {username} })
    
    if(!cek)
    {
      res.status(400).json
      ({
        status  : "Error 400",
        message: "Username or Password does not match"
      })
    }

    const id = cek.id == null ? "null" : cek.id
    const nama = cek.nama == null ? "null" : cek.nama;
    const status_user = cek.status_user == null ? "null" : cek.status_user;
    const status_password = cek.status_password == null ? "null" : cek.status_password;

    if (cek.username == username && cek.password == password)
    return res.status(200).json
    ({
        status : "Success",
        message: "Welcome " + cek.nama,
        data:
        {
            id : id,
            nama : nama,            
            status_user : status_user,
            status_password : status_password            
        }
    })
    else    
    return res.status(400).json
    ({
        status : "Error 400",
        message: "Username or Password does not match"
    })            
};


//Change Password
const ChangePassword = async (req, res) => {
  const {user_id, old_password, new_password} = req.body;
  const id = user_id;

  var cek = await Users.findOne({where : {password : old_password , id : user_id}})

  if(!cek)
  {
    res.status(400).json
    ({
      status : "Error", 
      message : "password lama salah" 
    })
  }

  var user = await Users.update({password : new_password, status_password:true} , {where :{ id : id}});

  if(user == 1)
  {
    res.status(200).json
    ({
      status : "Success",
      message : "Password berhasil diubah",      
    })
  }else{
    res.status(400).json
    ({
      status : "Error",
      message : "Password gagal diubah" 
    })
  }  
}; 

module.exports = {  
  ResgistrasiUser,      
  Login,
  ChangePassword,
};

