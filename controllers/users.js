const { response, request } = require('express');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const cryptojs = require('crypto-js');
const getSecretKey = require('../controllers/getSecretKey');
const { admin, getAuth } = require("../firebase/config");
const sendWelcomeMessage = require('./emailservice/sendWelcome');

const getUsers = async (req = request, res = response) => {
    const query = req.query;
    const users = await User.findAll();
    res.json({
        status: "ok",
        msg: "get all users",
        users
    })
}
const getUser = async (req = request, res = response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
        res.status(200).json({
            status: "ok",
            msg: "Get one user",
            user
        })
    }
    else {
        res.status(404).json({
            msg: `User not found, the user with the id ${id} is not registered!`
        })
    }
}
const postUser = async (req = request, res = response) => {
    const bodyReq = req.body;
    const secretKey = getSecretKey();
    console.log('-----------------');
    console.log('secretKey:'+secretKey);
    const ciphertext = cryptojs.AES.encrypt(bodyReq.pass, secretKey).toString();
    console.log('ciphertext: ' + ciphertext);
    const bytes = cryptojs.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(cryptojs.enc.Utf8);
    console.log('originalText: ' + originalText);
    console.log('-----------------');


    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        bodyReq.pass = ciphertext;
        bodyReq.secret_key = secretKey;
        const user = new User(bodyReq);
        await user.save();
        res.json({
            status: "ok",
            msg: "User created successfully!",
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Server error"
        }
        )
    }
}
const saveUserFromFacebook = async (req = request, res = response) => {
    console.log('save from social media');
    const bodyReq = req.body;
    const information = req.query;
    console.log('save from social media');
    try {
        const user = new User(bodyReq);
        await user.save();
        res.json({
            status: "ok",
            msg: "User created successfully!",
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Server error"
        }
        )
    }
}
const saveUserFromGoogle = async (req = request, res = response) => {
    const body = req.body;
    const information = req.query;

    try {
        const user = new User(body);
        await user.save();
        res.json({
            status: "ok",
            msg: "User created successfully!",
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Server error"
        }
        )
    }
}
const putUser = (req, res) => {
    res.json({
        status: "ok",
        msg: "put user controller"
    })
}
const patchUser = (req, res) => {
    res.json({
        status: "ok",
        msg: "patch user controller"
    })
}
const deleteUser = (req, res) => {
    res.json({
        status: "ok",
        msg: "delete controller"
    })
}
const registerUser = async (req=request, res= response) => {

    const body = req.body;
    const secretKey = body.secretKey; //secret Key
    const pass = body.pass; //hashed password
    console.log('encripted password: '+ pass)
    console.log('secretKey '+ secretKey)

    const savePassword = cryptojs.AES.decrypt(pass, secretKey);
    const originalText = savePassword.toString(cryptojs.enc.Utf8);
    console.log("decripted password ", originalText)
    try {
        const user = await getAuth().createUser({
          email: body.email,
          emailVerified: true,
          password: originalText,
          displayName: body.name,
          disabled: false,
        }).then ((userRecord)=> {
            console.log("this is the userRecorded in firebase ", userRecord)
            try {
                const additionalClaims = {
                    name: body.name,
                    lastname: body.lastName,
                    email:userRecord.email
                }
                admin.auth().createCustomToken(userRecord.uid, additionalClaims).then(
                    (token) => {
                        console.log("this is the generated token",token)
                        sendWelcomeMessage(body.email, body.name) //send email welcome
                        res.json({
                            status: "ok",
                            msg: "User created successfully",
                            body: {
                                name: body.name,
                                lastname: body.lastName,
                                email: body.email
                            },
                            tokenAuth: token
                        })
                    }
                )
                

            } catch (error) {
                console.log("this is the token creation error ", error)
            }
            
        });
        
    } catch (error) {
        console.log(error)
        res.json({
            status: "ok",
            msg: "The user was not created!",
           
        })
    }
}

module.exports = {
    getUsers,
    postUser,
    saveUserFromFacebook,
    saveUserFromGoogle,
    putUser,
    patchUser,
    deleteUser,
    getUser,
    registerUser
};