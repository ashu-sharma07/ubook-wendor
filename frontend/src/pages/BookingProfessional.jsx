import { MdCollectionsBookmark, MdOutlineArrowCircleLeft } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useModalContext } from "../context/ModalContext";
import { MdOutlineAccessTime } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import { useAddressContext } from "../context/AddressContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-hot-toast"


export default function BookingProfessional() {
    const { id } = useParams();
    const { setLocationModalOpen, setLoginModalOpen } = useModalContext();
    const { address } = useAddressContext();
    const { user } = useAuthContext();
    const [data, setData] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const fetchTimeSlots = async () => {
        try {
            const res = await axiosInstance.get(`/professional/${id}/available-slots/${new Date()}`);
            if (res.data?.data) {
                setTimeSlots(res.data?.data?.availableSlots);
                setSelectedTimeSlot(res.data?.data?.availableSlots[0])
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchProfessional = async () => {
        try {
            const res = await axiosInstance.get("/professional/" + id);
            if (res.data?.data) {
                setData(res.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfessional();
        fetchTimeSlots();
    }, []);

    const bookExpert = async () => {
        setLoading(true);
        try {
            await axiosInstance.post("/professional/book", {
                professionalId: id,
                address: address,
                startTime: selectedTimeSlot,
                date: new Date()
            });
            toast.success("Booked Successfully");
            return navigate("/my-bookings");
        } catch (error) {
            toast.error("Booking failed!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="lg:w-[75%] w-full mx-auto my-5 h-full raleway">
            <button className="flex border p-3 rounded-lg border-gray-400 hover:border-gray-600 transition items-center gap-2 lg:text-3xl md:text-2xl font-semibold"
                onClick={() => navigate("/profession/" + data?.profession?.id + "?category=" + data?.profession?.name)}>
                <MdOutlineArrowCircleLeft size={26} />
                <span className="">Search for more {data?.profession?.name}s</span>
            </button>
            <div className="w-full h-full mt-10 flex md:flex-row flex-col items-start lg:gap-10 gap-7">
                <div className="rounded-lg border w-full h-full flex flex-col">
                    <div className="w-full flex md:p-5 p-3 border-b items-center gap-4">
                        <MdCollectionsBookmark size={24} className="text-green-900" />
                        <div className="flex flex-col gap-2">
                            <h4 className="text-sm">Send Booking details to</h4>
                            <p className="dm_sans">{user?.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="flex border-b w-full md:p-5 p-3 flex-col gap-3">
                        <div className="w-full flex items-center gap-4">
                            <FaLocationDot size={24} className="text-green-900" />
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm">Address</h4>
                                {address.street != "" && <p className="dm_sans">{address?.street + ", " + address?.city + ", " + address?.pinCode}</p>}
                            </div>
                        </div>
                        <button className="py-2 w-full rounded-lg text-center bg-black text-white font-medium" onClick={() => user?.id == "" ? setLoginModalOpen(true) : setLocationModalOpen(true)}>
                            {address.street != "" ? "Edit" : "Add"} Address
                        </button>
                    </div>
                    <div className="flex w-full md:p-5 p-3 flex-col gap-3">
                        <div className="w-full flex items-center gap-4">
                            <MdOutlineAccessTime size={24} className="text-green-900" />
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm">Slots</h4>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold">
                                When should the professional arrive?
                            </h3>
                            <h4 className="text-sm dm_sans">
                                Your service will take approx. {data?.slotDuration} mins
                            </h4>
                        </div>
                        <div className="grid grid-cols-4 gap-3 w-full">
                            {timeSlots?.map((item, index) => (
                                <button onClick={() => setSelectedTimeSlot(item)} key={index}
                                    className={"px-5 dm_sans py-3 border flex flex-col rounded-md border-gray-500 items-center xl:text-base text-sm justify-center "
                                        + (item == selectedTimeSlot && "border-purple-700 border-2")}>
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border w-full h-full flex flex-col">
                    <div className="w-full flex flex-col border-b md:p-5 p-3">
                        <h1 className="font-semibold text-xl">Order Summary</h1>
                        <div className="flex w-full items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-medium">{data?.user?.fullName}</h2>
                                <p className="text-xl dm_sans">₹{data?.pricePerSlot}</p>
                            </div>
                            <img src={data?.user?.avatarUrl} className="w-20 h-20 rounded-full border" alt="Professional Image" />
                        </div>
                        <h3 className="font-medium text-lg">Profession: {data?.profession?.name}</h3>
                        <pre className="text-sm raleway">
                            {data?.services}
                        </pre>
                    </div>
                    <div className="md:p-5 p-3 w-full flex-col gap-4 flex">
                        <h2 className="text-xl font-medium">
                            Payment Summary
                        </h2>
                        <div className="space-y-2 pb-5 border-b">
                            <div className="flex w-full items-center justify-between">
                                <span>Total</span>
                                <span className="dm_sans font-medium">₹{data?.pricePerSlot}</span>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <span>Tax</span>
                                <span className="dm_sans font-medium">₹0</span>
                            </div>
                        </div>
                        <div className="w-full font-medium flex items-center justify-between">
                            <h3>Amount to pay</h3>
                            <p className="font-medium dm_sans text-2xl">₹{data?.pricePerSlot}</p>
                        </div>
                        <button disabled={loading} onClick={() => {
                            user?.id == "" ? setLoginModalOpen(true) : bookExpert()
                        }} className="w-full bg-green-950 text-white font-medium h-12 flex items-center justify-center rounded-md">
                            {loading ? <Spinner color="default" size="sm" /> : <p>Pay <span className="dm_sans">₹{data?.pricePerSlot}</span> and Book</p>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
