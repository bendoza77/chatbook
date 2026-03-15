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
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #007bff;">
                <h2 style="color: #333; margin: 0;">Email Verification</h2>
                <p style="color: #666; margin: 5px 0 0 0;">Secure Your Account</p>
            </div>
            <div style="padding: 30px 0;">
                <p style="color: #555; font-size: 16px; line-height: 1.6;">Hello,</p>
                <p style="color: #555; font-size: 16px; line-height: 1.6;">Thank you for signing up! Please verify your email address by clicking the button below to activate your account.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${url}" style="
                        display: inline-block;
                        padding: 12px 32px;
                        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
                        color: #fff;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                        font-size: 16px;
                        transition: transform 0.2s;
                    ">
                        ✓ Verify Email
                    </a>
                </div>
                <p style="color: #888; font-size: 14px; text-align: center;">Or copy this link: <span style="word-break: break-all; color: #007bff;">${url}</span></p>
            </div>
            <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
                <p style="color: #856404; margin: 0; font-size: 14px;"><strong>Security Notice:</strong> If you didn't create this account, please ignore this email.</p>
            </div>
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
                <p style="margin: 5px 0;">© 2024 Your Company. All rights reserved.</p>
            </div>
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