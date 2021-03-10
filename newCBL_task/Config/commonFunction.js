var md5 = require('md5');

exports.hashPassword = hashPassword;
exports.compareHashPassword = compareHashPassword;


function hashPassword(plainTextPassword) {

	return md5(md5(plainTextPassword));
};



function compareHashPassword(data) {
	return md5(md5(data.password)) === data.bcryptPassword;

};