import logo from '@/assets/navbar/logo.svg'
import LoginForm from '@/layouts/auth/LoginForm'
import OtpForm from '@/layouts/auth/OtpForm'
import SignupForm from '@/layouts/auth/SignupForm'


const AuthPage = ({ isSignup, isLogin, isOtp }) => {
    return (
        <div className="bg-[#E7F1F3] flex items-center bg-auth max-w-[1660px] h-[100vh] 4xl:h-[1175px] bg-no-repeat bg-cover bg-center px-5 2xl:py-5 lg:py-2 mx-auto">

            <div className={`bg-white flex flex-col items-center gap-4 2xl:gap-10 4xl:gap-0 py-5 2xl:py-14 4xl:py-[62px] rounded-[20px] w-[100%] md:w-[580px] mx-auto`}>
                <img src={logo} alt="lystra logo" className='w-12 2xl:w-[70px] 4xl:mb-[38.51px]' />

                {isSignup && <SignupForm />}
                {isLogin && <LoginForm />}
                {isOtp && <OtpForm />}

            </div>
        </div>
    )
}

export default AuthPage