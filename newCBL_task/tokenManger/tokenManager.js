const Jwt = require('jsonwebtoken');
let APP_CONSTANTS = require('../Config/appConstants');

let model = require("../models")

exports.generateJwtAccessToken = generateJwtAccessToken;
exports.authenticateJWT = authenticateJWT;
exports.generateAndUpdateJwtAccessToken = generateAndUpdateJwtAccessToken;
// exports.updatingTokenInfoInDb            = updatingTokenInfoInDb;
// exports.generateAndUpdateTokenInfoInDb   = generateAndUpdateTokenInfoInDb;

function generateJwtAccessToken(data) {

    return Jwt.sign(data, APP_CONSTANTS.ERROR.JWT_SECRET_KEY, {
        algorithm: 'HS256'
    });

};

async function generateAndUpdateJwtAccessToken(data) {
    try {
        console.log("tokenData",data)
        let token = generateJwtAccessToken(data)
        console.log(token)
        let criteria = {
            _id: data.id
        }
        let setData = {
            accessToken:token
        }

       await model.UsersModel.findByIdAndUpdate(criteria, setData)
        return token
    } catch (err) {
        return err
    }
};

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("auth........................",authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        Jwt.verify(token, APP_CONSTANTS.ERROR.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log("after.............................",user)
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};