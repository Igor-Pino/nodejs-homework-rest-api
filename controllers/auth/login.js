const createError = require('http-errors');
const { Unauthorized } = require('http-errors');
const { User } = require('../../models');
const { joiSchema } = require('../../models/users');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {

    try {
        const { error } = joiSchema.validate(req.body);

        if (error) {
            throw new createError(400, error.message)
        }


        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user || !user.comparePasswords(password)) {
            throw new Unauthorized('Email or password is wrong')
        }
        if (!user.verify) {
            throw new createError(401, "user not verify")
        }
        else {
            const payload = { id: user._id };
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
            await User.findByIdAndUpdate(user._id, { token });
            res.status(200).json({
                token: token,
                user: {
                    "email": user.email,
                    "subscription": user.subscription
                }
            })

        }
    }


    catch (error) {

        next(error)

    }
}


module.exports = login;