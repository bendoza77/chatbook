// get all user
const mongoose = require("mongoose");
const User = require("../models/user.model");
const catchAsynс = require("../utils/catchAsynс");
const AppError = require("../utils/AppError");

const getUsers = catchAsynс(async (req, res, next) => {

    const users = await User.find();
    return res.json(users);
});

// get user by id
/**
 * User Controller Handlers
 *
 * - getUsers: Retrieve a list of all users.
 * - getUser: Retrieve a user by their unique id.
 * - createUser: Register a new user with name, email, and password.
 * - deleteUser: Delete a user by id.
 * - updateUser: Update user information by id.
 *
 * Utilities:
 * - Uses catchAsynс for async error handling.
 * - Uses AppError for custom error response objects.
 * - Validates MongoDB object ids before attempting CRUD operations.
 */

const getUser = catchAsynс(async (req, res, next) => {


     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            next(new AppError("user not found", 404));
        }
    const user = await User.findById(req.params.id);

    return res.json(user);

});


// delete user by id

const deleteUser = catchAsynс(async (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            next(new AppError("user not found", 404));
        }

    const user = await User.findByIdAndDelete(req.params.id);

    return res.status(204).send();

});

// update user data

const updateUser = catchAsynс(async (req, res, next) => {

    const data = req.body

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            next(new AppError("user not found", 404));
        }

    const user = await User.findByIdAndUpdate(req.params.id, data);
    
    return res.json(user);

});


module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
};