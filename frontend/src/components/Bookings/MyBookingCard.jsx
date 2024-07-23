import { MdOutlineAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function MyBookingCard({ data }) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate("/booking/" + data?.id)} className="w-full cursor-pointer flex rounded-lg flex-col h-auto border hover:border-gray-400 tranisition py-4 px-5 gap-5">
            <div className="flex items-center justify-between w-full gap-2">
                <div className="flex flex-col">
                    <h3 className="font-medium xl:text-2xl text-[22px]">{data?.professional?.user?.fullName}</h3>
                    <h3 className="font-medium xl:text-xl text-lg">{data?.professional?.profession.name}</h3>
                </div>
                <img src={data?.professional?.user?.avatarUrl} alt="Professional Image" className="w-24 h-24 border rounded-full" />
            </div>
            <div className="flex items-center justify-between">
                <p className="font-light xl:text-lg text-base flex items-center gap-1 dm_sans"><MdOutlineAccessTime /> {new Date(data?.date).toLocaleDateString()} at {data?.startTime}</p>
                <button className={"text-white lg:px-5 px-4 lg:py-2 py-1.5 xl:text-lg lg:text-base text-sm rounded-lg font-medium capitalize " + (data?.status == "confirmed" ? "bg-green-600" : "bg-red-700")}>{data?.status}</button>
            </div>
        </div>
    )
}
