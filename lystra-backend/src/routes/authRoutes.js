import express from 'express'
import { signup } from '../controllers/authControllers/signupController.js'
import { signUpValidation } from '../validator/validateSignup.js'
import { validateData } from "../middleware/validateData.js"
import regenerateTokens from '../controllers/authControllers/regenerateTokens.js'
import { verifyForgotPasswordToken, verifyRefreshToken, verifyRegistrationToken } from '../middleware/isAuthenticated.js'
import isVerified from '../middleware/isVerified.js'
import { login } from '../controllers/authControllers/loginController.js'
import verifyUser from '../controllers/authControllers/verifyUser.js'
import { resendMail } from '../controllers/authControllers/resendMailController.js'
import { logInValidation } from '../validator/validateLogin.js'
import limiter from '../middleware/rateLimit.js'
import forgotPassword from '../controllers/authControllers/forgotPassword.js'
import resetPassword from '../controllers/authControllers/resetPassword.js'
import { resetPasswordValidation } from '../validator/validateResetPassword.js'


const authRoute = express.Router()

//all api's for authentications
authRoute.post('/signup/:role', limiter, validateData(signUpValidation), signup)
authRoute.get('/accessToken', verifyRefreshToken, isVerified, regenerateTokens);
authRoute.post('/login', limiter, validateData(logInValidation), login);
authRoute.post('/verifyUser/:registrationToken', verifyRegistrationToken, verifyUser);
authRoute.post('/resendMail', resendMail);
authRoute.post('/forgotPassword', forgotPassword);
authRoute.put('/resetPassword/:forgotPasswordToken',validateData(resetPasswordValidation), verifyForgotPasswordToken, resetPassword);


export default authRoute