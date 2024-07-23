import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { axiosInstance } from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const { user, resetUser } = useAuthContext();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fullName: "",
        phoneNumber: "",
        avatar: ""
    });

    useEffect(() => {
        setUserData({
            fullName: user?.fullName,
            phoneNumber: user?.phoneNumber,
            avatarUrl: user?.avatarUrl
        });
    }, []);

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData?.fullName == user?.fullName && userData.avatar == user?.avatarUrl && userData?.phoneNumber == user?.phoneNumber) return;
        try {
            const res = await axiosInstance.put("/user/profile", userData);
            if (res.data?.data) {
                console.log(res.data?.data);
            }
            toast.success("Profile Updated Successfully!");
        } catch (error) {
            toast.error("Error updating profile!");
            console.log(error);
        }
    };
    return (
        <div className="md:w-[75%] w-full mx-auto my-5 h-full raleway">
            <div className="flex w-full justify-between items-center">
                <h1 className="text-3xl font-semibold">
                    User Profile
                </h1>
            </div>
            <div className="w-full h-full mt-10 flex md:flex-row flex-col items-start gap-10">
                <div className=" w-[40%] h-full flex flex-col">
                    <div className='xl:w-64 xl:h-64 lg:w-56 lg:h-56 w-40 h-40 rounded-full overflow-hidden'>
                        <img src={user?.avatarUrl} alt='User Image' className='w-full h-full' />
                    </div>
                </div>
                <div className='flex flex-col w-full gap-3'>
                    <form onSubmit={handleSubmit} className="rounded-lg border w-full h-full flex flex-col gap-5 p-5">
                        <h3 className='text-2xl font-medium'>
                            Profile Details
                        </h3>
                        <div className="flex items-center justify-center w-full md:flex-row flex-col gap-2">
                            <label className="flex w-full items-center justify-start">
                                Name
                            </label>
                            <input
                                type="text"
                                className="flex dm_sans bg-transparent text-sm w-full p-2 border border-[#252525] rounded-[8px] focus:outline-none"
                                placeholder="Your name"
                                name="fullName"
                                onChange={handleInputChange}
                                value={userData?.fullName}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center w-full md:flex-row flex-col gap-2">
                            <label className="flex w-full items-center justify-start">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                className="flex dm_sans bg-transparent text-sm w-full p-2 border border-[#252525] rounded-[8px] focus:outline-none"
                                placeholder="Your Phone Number"
                                name="phoneNumber"
                                onChange={handleInputChange}
                                value={userData?.phoneNumber}
                                required
                            />
                        </div>
                        <button className='place-self-end text-white bg-green-950 hover:bg-green-800 transition px-4 py-2 rounded-lg'>
                            Save Changes
                        </button>
                    </form>
                    <button onClick={() => {
                        resetUser();
                        navigate("/");
                    }} className=' bg-red-800 text-white font-medium px-4 py-2 md:w-1/2 w-full md:mt-3 mt-5 rounded-lg place-self-end'>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
