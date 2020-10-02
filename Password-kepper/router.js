const express = require("express");
const router = express.Router();
const Cryptr = require("cryptr");
const dbConn = require("./config/dbconfig");

const cors = require('cors')

router.get("/hello", (req, res) => {
    res.send("Hello User");
})

//create user
//parameters are username and password
router.post("/user", (req, res) => {
    //reads param from req.body
    username = req.body.username;
    password = req.body.password;

    if(username == null || username == ""){
        res.json({status : "failed", message : "username cannot be empty"});
    }

    if(password == null || password == ""){
        res.json({status : "failed", message : "password cannot be empty"});
    }

    userId = Math.floor(Math.random() * 100000) + 1;

    cryptr = new Cryptr("XYZ");

    encrypted = cryptr.encrypt(password);
    
    dbConn.query(`Insert into users values(${userId}, ?, ?)`, [username, encrypted] , function (err, result)
            {
                if(err) { 
                    console.log("error: ", err); 
                }
                else{
                    res.json({status : 'account created'});
                }
        });

})

//authorizing users
//parameters are username, password
router.post("/user/auth", (req, res) => {
    username = req.body.username;
    password =  req.body.password;
    
    cryptr = new Cryptr("XYZ");

    fetchedUsers = [];

    if(username == "" || password == ""){
        res.json({status :  "failed", message :  "Username or password cannot be empty"});
    }

    dbConn.query(`select * from users where username = ?`, 
                    [username], function (err, result)
                     {
                        if(err) { 
                            console.log("error: ", err); 
                            res.json("Error ", err);
                            //(err, null);
                        } else{
                            //console.log(result);
                            if(result.length == 0){
                                fetchedUsers = result;
                                res.json({status : "failed", message : "no data found"});
                            }else{
                                fetchedUsers = result;
                                fetched_username = fetchedUsers[0].username;
                                fetched_encr_pass = fetchedUsers[0].password;
                                decrypted = cryptr.decrypt(fetched_encr_pass);
                                console.log(decrypted);
                                if(username == fetched_username && password == decrypted){
                                    res.json({status : "success", userId : fetchedUsers[0].userId});
                                } else{
                                    res.json({status : "failed", message : "no data found"});
                                }
                            }
                        } 
                     });

})

router.post("/sites/:userId", (req, res) => {
    userId = req.params.userId;
    website = req.body.website;
    username = req.body.username;
    password = req.body.password;
    
    //encrypt
    cryptr = new Cryptr("XYZ");
    encrypted = cryptr.encrypt(password);

    dbConn.query(`Insert into user_website values(?, ?, ?, ?)`, [userId, website, username, encrypted] , function (err, result)
                     {
                        if(err) { 
                            console.log("error: ", err); 
                            res.json({status : 'failed'});
                            //(err, null);
                        }   
                        else{
                            console.log('Success');
                            res.json({status : 'success', message : result});
                        }
                    });
})

router.get("/sites/list/:userId", (req, res) => {

    userId = req.params.userId;
    cryptr = new Cryptr("XYZ");
    console.log(req);
    dbConn.query("select * from user_website where userId = ?", userId, (err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            if(result.length ==0){
                res.json({status : "failed", message : "no data found"})
            }
            else{
                //console.log(result);
                for(let i = 0; i < result.length; i++){
                    decrypted = cryptr.decrypt(result[i].password);
                    result[i].password = decrypted;
                }
                console.log(result);
                res.json({status: "success" , message : result});
            }
        }
    })
})

module.exports = router