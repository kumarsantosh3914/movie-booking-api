const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { USER_ROLES, USER_STATUS } = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email'],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    userRole: {
        type: String,
        required: true,
        enum: {
            values: [USER_ROLES.customer, USER_ROLES.admin, USER_ROLES.client],
            message: "Invalid user role given",
        },
        default: USER_ROLES.customer,
    },
    userStatus: {
        type: String,
        required: true,
        enum: {
            values: [USER_STATUS.approved, USER_STATUS.pending, USER_STATUS.rejected],
        },
        default: USER_STATUS.approved,
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    // a trigger to encrypt the plain password before saving the user
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

/**
 * This is going to be an instance method for user, to compare a password
 * With the stored encrypted password
 * @param plainPassword -> input password given by the user in sign in request
 * @returns boolen donoting whether passwords are same or not?
 */

userSchema.methods.isValidPassword = async function (plainPassword) {
    const currentUser = this;
    const compare = await bcrypt.compare(plainPassword, currentUser.password);
    return compare;
}

const User = mongoose.model('User', userSchema);
module.exports = User;

