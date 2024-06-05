const jwt = require('jsonwebtoken');

const generateToken = (user) => jwt.sign({id:user.id},tamilskillhub,{expiresIn:'2m'});


module.exports = generateToken;