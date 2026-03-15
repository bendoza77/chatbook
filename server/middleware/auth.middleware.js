const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsynс");
const jwt = require("jsonwebtoken");

// აქ მე ვქმნი allowTo ფუნქციას იმისთის რომ მოვახდინო როლების კონტროლი. მას გაადაეცეა role პარამეტრი მაგარმ გამოიყენება 
// spread ოპერატორი იმიტომ რომ არ ვიცით წინასწარ რამდენი როლი იქნება მოცემული
const allowTo = (...role) => {

    // აქ ვაბრუნებთ arrow ფუქნციას რომელსაც აქვს გადაცემული req, res, next პარამეტრები
    return (req, res, next) => {
        // აქ ვამოწმებთ შეიცავს თუ არა როლების მასივი მომხრაბელის როლს რომ მოახდინოს გარკველი მოქმედება თუ არა და
        // დააბრუნეს ფუნქცია შეცდომას
        if (!role.includes(req.user.role)) {
            return next(new AppError("You dont have permission to do this", 400));
        }

        // მაგრამ თუ შეიცავს მაშინ next() ფუქნციის გამოყენებით გადადის ახალ შამავალ ფუქნციაზე ან შემდეგ მოქმედებაზე.
        next();
    }

}

const protect = catchAsync(async (req, res, next) => {

    try {
        const ls = req.cookies?.ls;

        if (!ls) {
            return next(new AppError("User is not login", 400));
        }

        const decode = jwt.verify(ls, process.env.JWT_SECRET);

        if (!decode) {
            return next(new AppError("Ls is not valid", 404));
        }

        const user = await User.findById(decode.id);

        if (!user) {
            return next(new AppError("User not found", 404));
        }

        req.user = user;

        next();

    } catch(error) {
        console.log(error);
    }

})


module.exports = { protect, allowTo }