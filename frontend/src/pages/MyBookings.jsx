import { useNavigate } from "react-router-dom";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { axiosInstance } from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import MyBookingCard from "../components/Bookings/MyBookingCard";
import { useAuthContext } from "../context/AuthContext";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const { user } = useAuthContext();
    const fetchBookings = async () => {
        try {
            const response = await axiosInstance.get("/booking/my-bookings")
            setBookings(response.data?.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [user]);
    const navigate = useNavigate();
    return (
        <div className="md:w-1/2 w-full mx-auto my-5 gap-10 flex flex-col h-full raleway">
            <div className="flex items-center gap-2">
                <button onClick={() => navigate(-1)}><MdOutlineArrowCircleLeft size={26} /></button>
                <h1 className="text-3xl font-semibold">My Bookings</h1>
            </div>
            {bookings.length > 0 ? bookings.map((item) => (<MyBookingCard key={item?.id} data={item} />))
                : <h1 className="w-full text-center">No Bookings found</h1>
            }
        </div>
    )
}
