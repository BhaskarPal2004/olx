import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AUTH_API_ENDPOINT } from '@/utils/endPoints';
import LoginBtn from '@/components/landing/LoginBtn';


const EmailVerifyPage = () => {
    const [message, setMessage] = useState('Verifying...');
    const [verified, setVerified] = useState(false)
    const params = useParams()
    const token = params.token

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await axios.post(`${AUTH_API_ENDPOINT}/verifyUser/${token}`)

                if (res.data.success) {
                    setMessage(res.data.message);
                    setVerified(true)
                }
                else
                    setMessage(res.data.message)

            } catch (error) {
                console.log(error)
                setMessage('Verification failed. The link may have expired.');
                setVerified(false)
            }
        };

        verify();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center gap-10 w-full my-20">
            <h2 className="text-4xl text-center mt-20 italic 2xl:text-7xl">Email Verification</h2>
            <p className="text-2xl text-center w-[90%] text-green-900 opacity-80 2xl:text-5xl">{message}</p>
            {verified && <LoginBtn />}
        </div>
    );
};

export default EmailVerifyPage