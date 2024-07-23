import { HiStar } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function BookingCard({ data }) {
    const navigate = useNavigate();
    return (
        <div className="w-full flex rounded-lg flex-col h-auto border hover:border-gray-400 tranisition py-4 px-5 gap-5">
            <div className="flex items-start justify-between w-full gap-2">
                <div className="flex flex-col">
                    <h3 className="font-medium text-2xl">{data?.user?.fullName}</h3>
                    <div className="flex flex-col gap-2 mt-4">
                        <h3 className="font-medium text-lg">Services</h3>
                        <ul className="text-sm list-disc space-y-2 pl-2">
                            {data?.services.split(".").slice(0, data?.services.split(".").length - 1).map((item, index) => (<li key={index}>{item}</li>))}
                        </ul>
                    </div>
                </div>
                <img src={data?.user?.avatarUrl ?? "https://dpzktz0mtxvuq.cloudfront.net/ubook-avatar.png"} alt="Professional Image" className="xl:w-32 xl:h-32 lg:h-28 lg:w-28 w-20 h-20 border rounded-full" />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex gap-5 dm_sans items-center">
                    <p className="text-lg flex items-center gap-1"><HiStar />{data?.rating}</p>
                    <p className="font-medium text-xl">₹{data?.pricePerSlot}</p>
                </div>
                <button onClick={() => navigate("/professional/" + data?.id)} className="bg-black hover:bg-gray-700 transition text-white lg:px-5 px-4 lg:py-2 py-1.5 lg:text-lg text-base rounded-lg font-medium">Book Now</button>
            </div>
        </div>
    )
}
