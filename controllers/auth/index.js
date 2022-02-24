const register = require ('./register');
const login = require ('./login')
const getCurrent = require ('./getCurrent');
const logout = require ('./logout');
const patchUser = require ('./patchUser');
const patchAvatar = require ('./patchAvatar');
const emailVerify = require('./emailVerify');
const emailReValidation = require ('./emailReValidation')



module.exports = {
    register,
    login,
    getCurrent,
    logout,
    patchUser,    
    patchAvatar,
    emailVerify,
    emailReValidation    
    
}