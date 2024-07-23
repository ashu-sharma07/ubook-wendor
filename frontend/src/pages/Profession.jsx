import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import BookingCard from "../components/BookingCard";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { axiosInstance } from "../utils/axiosInstance";
import { useEffect, useState } from "react";


export default function Profession() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const fetchProfessionals = async () => {
        try {
            const res = await axiosInstance.get("/professional/all/" + id + "?sortOrder=desc");
            if (res.data?.data) {
                setData(res.data?.data?.professionals);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfessionals();
    }, []);
    return (
        <div className="lg:w-1/2 md:w-[75%] w-full mx-auto my-5 gap-10 flex flex-col h-full raleway">
            <div className="flex items-center gap-2">
                <button onClick={() => navigate("/")}><MdOutlineArrowCircleLeft size={26} /></button>
                <h1 className="lg:text-3xl md:text-2xl font-semibold capitalize">{searchParams.get('category')}</h1>
            </div>
            {data.length > 0 ? data.map((item) => (<BookingCard key={item.id} data={item} />)) : <h1 className="w-full text-center">No Professionals found</h1>
            }
        </div>
    )
}
