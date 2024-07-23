import { MdCollectionsBookmark, MdOutlineArrowCircleLeft } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-hot-toast"
import { HiStar } from "react-icons/hi2";


export default function SingleBookingView() {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchBookingDetails = async () => {
        try {
            const res = await axiosInstance.get("/booking/my-booking/" + id);
            if (res.data?.data) {
                setData(res.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBookingDetails();
    }, []);

    const cancelExpert = async () => {
        setLoading(true);
        try {
            await axiosInstance.patch("/booking/my-booking/cancel/" + id);
            toast.success("Cancelled Successfully");
            setData({
                ...data,
                status: "cancelled"
            })
        } catch (error) {
            toast.error("Failed to cancel booking!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="lg:w-[75%] w-full mx-auto my-5 h-full raleway">
            <div className="flex w-full justify-between items-center">
                <button className="flex border p-3 rounded-lg border-gray-400 hover:border-gray-600 transition items-center gap-2 lg:text-3xl md:text-2xl font-semibold"
                    onClick={() => navigate("/profession/" + data?.professional?.profession?.id + "?category=" + data?.professional?.profession?.name)}>
                    <MdOutlineArrowCircleLeft size={26} />
                    <span className="">Search for more {data?.professional?.profession?.name}s</span>
                </button>
                {data?.status == "confirmed" && <h1 className="capitalize bg-green-600 text-white px-4 py-2 rounded-lg">{data?.status}</h1>}
            </div>
            <div className="w-full h-full mt-10 flex md:flex-row flex-col items-start lg:gap-10 gap-7">
                <div className="rounded-lg border w-full h-full flex flex-col">
                    <div className="w-full flex md:p-5 p-3 border-b items-center gap-4">
                        <MdCollectionsBookmark size={24} className="text-green-900" />
                        <div>
                            <h4 className="text-sm">Booking details</h4>
                            <p className="dm_sans">Contact Number: {user?.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="flex border-b w-full md:p-5 p-3 flex-col gap-3">
                        <div className="w-full flex items-center gap-4">
                            <FaLocationDot size={24} className="text-green-900" />
                            <div>
                                <h4 className="text-sm">Address</h4>
                                <p className="dm_sans">{data?.addressStreet + ", " + data?.addressCity + ", " + data?.addressPinCode}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full md:p-5 p-3 flex-col gap-3">
                        <div className="w-full flex items-center gap-4">
                            <MdOutlineAccessTime size={24} className="text-green-900" />
                            <div>
                                <h4 className="text-sm">Slot</h4>
                                <p className="dm_sans">{data?.startTime}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border w-full h-full flex flex-col">
                    <div className="w-full flex flex-col border-b gap-3 md:p-5 p-3">
                        <h1 className="font-semibold text-xl">Order Summary</h1>
                        <div className="flex w-full items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-medium">{data?.professional?.user?.fullName}</h2>
                                <p className="dm_sans text-sm">{data?.professional?.user?.phoneNumber}</p>
                                <p className="text-2xl mt-3 dm_sans">₹{data?.price}</p>
                            </div>
                            <img src={data?.professional?.user?.avatarUrl} className="w-20 h-20 rounded-full border" alt="Professional Image" />
                        </div>
                        <div className="flex w-full justify-between items-center">
                            <h3 className="font-medium text-lg">Profession: {data?.professional?.profession?.name}</h3>
                            <p className="flex items-center gap-1 dm_sans"><HiStar /> {data?.professional?.rating}</p>
                        </div>
                    </div>
                    <div className="md:p-5 p-3 w-full flex-col gap-4 flex">
                        <button disabled={loading || data?.status == "cancelled"} onClick={cancelExpert}
                            className={"w-full capitalize text-white font-medium md:h-12 h-10 flex items-center justify-center rounded-md " + (data?.status == "cancelled" ? "bg-red-700" : "bg-green-950 hover:bg-red-800 transition duration-250")}>
                            {data?.status == "cancelled" ? data?.status : loading ? <Spinner color="default" size="sm" /> : <p>Cancel Booking</p>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
