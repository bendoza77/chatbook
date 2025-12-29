const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const ms = require("ms");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsynс");
const sendEmail = require("../utils/email");

// აქ მე შევქმენი ფუნცქია სახელად signToken რომელსაც აქვს გადაცემული ორი არგუმენტი id და role იმისთის რომ შევქმნა token
// id და role არის მომხარებლის ინფორმაცია რომელიც არის საჭირო იმისთის რომ token შეიქმნას
const signToken = (id, role) => {
    // აქ token ვქმნით jwt მოდულით რომელსაც sign მეთოიდ მოყვება ამას აქვს გადაეცნული სამი იფნფორმაცია !) მომხარებლის id და role
    // 2) jwt-ს საიდუმლო გასაღები 3) jwt-ს ვადა თუ არდმენი ხანი იქნება ის ვალიდური
    return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});

    // sign ეს არის ფუქნცია რომელიც აწერს ხელს token-ს საიდუმლო გასაღებით რომ token იყოს ორგანიზებული და დაცული
    // გაყალბებისგან და მისი შეცვლა მოხდეს მხოლოდ server-თან ერთად.
}

// ეს არის createSendToken ფუქნცია რომელიც გამოიყენება იმისთვის რომ მოვახდინოთ cookie-ს და token-ს შექმნა და თუ
// მომხარებელმა წარმატებით დაამთავრა accounte-ის შექმნა დაუბრუნდეს token ამ ფუქნციას აქვს გადაცემული სამი არგუმეტი
// user რომ შექმნილი მომხარებლს ობიექტი გამოვიქენოთ statusCode რომეიც გვეხმარება status-ის code-ის დაბურმითითებაში
// და res რომ დავაბრუნო პასუხი
const createSendToken = (user, message, statusCode, res) => {

    // იქ იქმენება token signToken-ის გამოყენებით რომელსაც გადაეცმეა ორი არგუმენტი user-ის id და role
    const token = signToken(user._id, user.role);

    // აქ იქმენება cookieOption ობიქეტი რომელიც ასახავს იმას თუ როგორ უნდა გამოიყურებოდეს cookie შექმნამდე
    const cookieOption = {
        // ეს არის maxAge რომელიც სასავს cookie-ის ვადას მილიწამებში
        maxAge: ms(process.env.COOKIE_EXPIRES),
        // ეს არის უსაფრთხოება რომ ყველა იფნრომცაი არ ინას აბრუნებული იმ შემთხვევაში რომ თუ სამუშაოს გარემო dev-ს არ უდრის
        secure: process.env.NODE_ENV !== "dev",
        // ეს კიდე არის secure რომელიც ასახავს იმას რომ ინფორმაციის გადაცემა მოხდეს მხოლოდ http პროტოკოლის გამოყენებით
        httpOnly: true,
        samSite: "Lax"
    }


    // აქ password-ს ვუტოლებ undefined რომ არ გამოჩნდეს პასუიხ დაბრუნების დროს
    user.password = undefined
    // აქ იქმნება cookie რომლის სახელი არის cookie და გადაეცემა ორი არგუმენტი token და მისი პარამეტრები
    res.cookie("ls", token, cookieOption);

    // აქ კიდე ბრუნდება საბოლოო პასუხი თუ მომარებელმა წარმატებით გაიარა რეგისტრაცია
    return res.status(statusCode).json({
        status: "succasse",
        message: message,
        data: {
            user
        }
    });

}


// ეს არის signUp ფუნცია რომელიც არის რეგსტარციი სმთავარი ფუქნცია და გამოიყენაბა უკვე მომხაებლის შესაქმენლად მონაცემთა ბაზაში
const signUp = catchAsync( async (req, res, next) => {

    const {name, email, password, postId} = req.body;

    if (!name || !email || !password) {
        return next(new AppError("All field is required", 400));
    }

    const user = await User.create({
        name, 
        email,
        password,
        postId
    })

    const code = user.createVerificationCode();
    await user.save({ validateBeforeSave: false });
    const url = `${req.protocol}://${req.get("host")}/auth/verify/${code}`;
    const designe = `
        <div style="font-family: Arial, sans-serif;">
            <h2>Email Verification</h2>
            <p>Click the button below to verify your account:</p>
            <a href="${url}" style="
                display:inline-block;
                padding:10px 20px;
                background:#000;
                color:#fff;
                text-decoration:none;
                border-radius:5px;
            ">
                Verify Email
            </a>
            <p>If you didn’t request this, ignore this email.</p>
        </div>
    `

    sendEmail(email, "Verify Your Email", designe);

    createSendToken(user, "User created! please verify your email",  201, res);

});


// ეს არის login ფუქნცია რომელიც გამოიყენება იმისთის რომ მომხარებელამ მოახდნოს უკვე არსებულ აქაუნთში შესვლა
const login = catchAsync(async (req, res, next) => {

    const {email, password} = req.body;

    // აქ მოწმდება არის თუ არა ორივე email და password შეყვანილი რადაგნ ორივე საჭირო არის
    if (!email || !password) {
        return next(new AppError("All field is required", 400));
    }

    // აქ თუ ორივე შეყავნილი არის მაშინ email-ის გამოყნებით ვეძებ მოხმარებელს და დავუწერე select(+password) რომ ყველაფერი დააბრუნოს
    const user = await User.findOne({email}).select("+password");

    if (!user.isVerified) return next(new AppError("User is not verify! please verify your email", 401));

    // თუ user არ მოიძებნა მაშინ დააბრუნო fail
    if (!user) {
        return next(new AppError("User email or password is inccorect", 404));
    }

    // აქ უკვე ვადარებ ჰეშირებულ პაროლს და მოხატებლის შემოტანლი პაროლს არის თუ არა სწროი იმისთის რომ შევიდეს თავის აქაუნთზე
    const isCorrect = await user.comparePassword(password, user.password);

    // თუ არ არის სწორი მაშინ დაბრუნება fail
    if (!isCorrect) {
        return next(new AppError("User email or password is inccorect", 404));
    }

    // თუ სწორი არის მაშინ პაროლი გახდება udefined იმისთის რომ მოხრაბელს არ გამოუჩნდეს
    user.password = undefined;

    createSendToken(user, "You login saccessfuly", 200, res);
  
})

const verifyEmail = catchAsync(async (req, res, next) => {

    const { code } = req.params;

    const user = await User.findOne({ verificationCode: code });

    if (!user) return next(new AppError("Email is not verified", 400));

    user.verificationCode = undefined;
    user.isVerified = true;
    user.save({ validateBeforeSave: false });

    res.status(200).send("Email Verified");


})

const logout = catchAsync(async (req, res, next) => {

    res.clearCookie("ls", {
        secure: process.env.NODE_ENV !== "dev",
        httpOnly: true,
        samSite: "Lax"
    })

    return res.json({
        message: "Token is deleted"
    })


})

const authoLogin = catchAsync(async (req, res, next) => {

    const { user } = req;

    if (user) {
        return res.json({
            status: "succassfuly",
            data: { user }
        })
    }

    res.send();


})



module.exports = { signUp, login, verifyEmail, authoLogin, logout };