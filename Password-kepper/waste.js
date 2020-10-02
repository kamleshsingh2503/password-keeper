const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const base64 = require("base-64");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const dbConn = require("./config/dbconfig");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	modulusLength: 2048,
})


const encryptedData = (toEncrypt) => {
    debugger;   
   return crypto.publicEncrypt(
   {
       key: publicKey,
       padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
       oaepHash: "sha256",
   },
   // We convert the data string to a buffer using `Buffer.from`
   Buffer.from(toEncrypt)
)
}

const decryptedData = (toDecrypt) => {
   return crypto.privateDecrypt(
       {
           key: privateKey,
           padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
           oaepHash: "sha256",
       },
       toDecrypt
   )
}

router.get("/getUser", (req, res) => {
    console.log(publicKey);
    console.log(privateKey);
    res.send("Hello User");
    
})

//create user
//parameters are username and password
router.post("/user", (req, res) => {
    //reads param from req.body
    username = req.body.username;
    password = req.body.password;
    userId = Math.floor(Math.random() * 100000) + 1;

    encryptedPassword = encryptedData(base64.encode(password));
    decryptedPassword = base64.decode(decryptedData(encryptedPassword));
    console.log(decryptedPassword);
    console.log(encryptedPassword); 
                dbConn.query(`Insert into users values(${userId}, ?, ?)`, [username, encryptedPassword] , function (err, result)
                     {
                        if(err) { 
                            console.log("error: ", err); 
                            //(err, null);
                        }else
                        {
                            res.json({status : 'account created'});
                        }
                    });
 
})

//authorizing users
//parameters are username, password and keys
router.post("/user/auth", (req, res) => {
    username = req.body.username;
    password =  req.body.password;
    user_key = req.body.user_key;
    //encryptedPassword = encryptedData(base64.encode(password));

    //console.log(encryptedPassword);
    //console.log(username);
    
    fetchedUsers = [];

    dbConn.query(`select * from users where username = ?`, [username], function (err, result)
                     {
                        if(err) { 
                            console.log("error: ", err); 
                            //(err, null);
                        }
                        else{
                        //console.log(result);
                        if(result.length == 0){
                            res.json({status : "failed", message : "no data found"})
                        }
                        else{
                        fetchedUsers = result;
                        fetched_username = fetchedUsers[0].username;
                        fetched_encr_pass = fetchedUsers[0].password;
                        
                        //console.log(result.length);
                        //console.log(fetched_encr_pass);
                        dpassword = Buffer.from(decryptedData(fetched_encr_pass));
                        console.log(dpassword);
                        res.json({status : "Success"})
                        /* if(username == fetched_username && password == dpassword && result.length > 0){
                            res.json({status : "success", userId : fetchedUsers[0].userId});
                        }
                        else{
                            res.json({status : "failed", message : "not authorized"});
                        } */
                        //console.log(encryptedPassword);
                        //var bufferBase64 = new Buffer( fetched_encr_pass, 'binary' );
                        //console.log(fetched_encr_pass == encryptedPassword);
                        //console.log(bufferBase64);

                        /* pass1 = decryptedData(encryptedPassword);
                        pass2 = decryptedData(fetched_encr_pass); */

                        //console.log(pass1 + " "+ pass2);
                        //fetched_decry_password = base64.decode(decryptedData(fetchedUsers[0].password));
                        
                        }
                      } 
                    });

    //isVerified(password, signing_account)
})

router.post("/sites/:userId", (req, res) => {
    userId = req.params.userId;
    website = req.body.website;
    username = req.body.username;
    password = req.body.password;
    
    //encrypt
    encryptedPassword = encryptedData(base64.encode(password));
    console.log(encryptedPassword); 

    dbConn.query(`Insert into user_website values(?, ?, ?, ?)`, [userId, website, username, encryptedPassword] , function (err, result)
                     {
                        if(err) { 
                            console.log("error: ", err); 
                            //(err, null);
                        }
                    });

    res.json({status : 'success'});

})

router.get("/sites/list/:userId", (req, res) => {
    userId = req.params.userId;

    dbConn.query("select * from user_website where userId = ?", userId, (err, result)=>{
        if(err){
            console.log(err);
        }
        else{

        }
    })
})










/* //decrypt
    base64.decode(decryptedData(encryptedPassword));
    //console.log(privateKey);
    //console.log(publicKey);
    console.log(password);
    signing_account = signature(password);
    console.log(signing_account.toString("base64"))
    console.log(isVerified(password, signing_account)); */

module.exports = router