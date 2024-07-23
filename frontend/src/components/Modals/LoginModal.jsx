import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useModalContext } from '../../context/ModalContext';
import ModalComponent from './Modal'
import { axiosInstance } from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

export default function LoginModal() {
    const [formData, setFormData] = useState({
        code: "",
        phoneNumber: ""
    });
    const [authState, setAuthState] = useState({
        otp: false,
        id: ""
    });
    const [loading, setLoading] = useState(false);
    const { loginModalOpen, setLoginModalOpen } = useModalContext();
    const { handleLogin } = useAuthContext();

    const handleSubmit = async () => {
        setLoading(true)
        try {
            if (authState.otp) {
                const res = await axiosInstance.post("/auth/login/verify", {
                    code: formData.code,
                    userId: authState.id
                })
                if (res.data?.data) {
                    handleLogin(res.data?.data?.user, res.data?.data?.token);
                }
                setAuthState({
                    otp: false,
                    id: ""
                });
                setLoginModalOpen(false)

            } else {
                const phoneNumber = formData.phoneNumber.includes("+91") ? formData.phoneNumber.slice(3) : formData.phoneNumber.includes("91") ? formData.phoneNumber.slice(2) : formData.phoneNumber;
                const res = await axiosInstance.post("/auth/login/start", {
                    phoneNumber: phoneNumber
                });
                setAuthState({
                    otp: true,
                    id: res.data?.data?.id
                });
                return toast.success("Otp Sent Successfully!");
            }
            setFormData({
                code: "",
                phoneNumber: ""
            });
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    return (
        <ModalComponent action={handleSubmit} title="Login/Signup" isOpen={loginModalOpen} setIsOpen={setLoginModalOpen}>
            {authState.otp ?
                <input onChange={handleInputChange} value={formData.code} className='border w-full rounded-md px-3 py-2 focus:outline-none' placeholder='Enter Code' name='code' type='number' /> :
                <input onChange={handleInputChange} value={formData.phoneNumber} className='border w-full rounded-md px-3 py-2 focus:outline-none' placeholder='Enter Mobile number' name='phoneNumber' id='phoneNumber' type='tel' />
            }
        </ModalComponent>
    )
}
