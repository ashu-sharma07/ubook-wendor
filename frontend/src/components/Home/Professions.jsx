import { useEffect, useState } from "react";
import ProfessionalCard from "../ProfessionalCard";
import { axiosInstance } from "../../utils/axiosInstance";

export default function Professions() {

    const [data, setData] = useState({
        popular: [],
        home: [],
        personal: [],
        appliance: []
    });

    const fetchHomeData = async () => {
        try {
            const response = await axiosInstance.get("/user/home");
            if (response.data) {
                setData({
                    popular: response.data?.data?.popular,
                    home: response.data?.data?.home,
                    personal: response.data?.data?.personal,
                    appliance: response.data?.data?.appliance
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchHomeData();
    }, []);

    return (
        <section className="w-full flex syne h-full flex-col items-center gap-24 mb-16">
            <div className="flex flex-col gap-10 items-center">
                <h1 className="font-bold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl ">Popular Professions</h1>
                <div className="grid md:grid-cols-4 grid-cols-2 lg:h-80 md:h-60 h-[500px] gap-5 w-full ">
                    {data?.popular.slice(0, 4).map((item, index) => (
                        <ProfessionalCard id={item.id} text={item.name} key={index} img={item.coverUrl} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-10 items-center">
                <h1 className="font-bold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">Home Services</h1>
                <div className="grid md:grid-cols-4 grid-cols-2 lg:h-80 md:h-60 h-[500px] gap-5 w-full ">
                    {data?.home.slice(0, 4).map((item, index) => (
                        <ProfessionalCard id={item.id} text={item.name} key={index} img={item.coverUrl} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-10 items-center">
                <h1 className="font-bold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">Personal Care</h1>
                <div className="grid md:grid-cols-4 grid-cols-2 lg:h-80 md:h-60 h-[500px] gap-5 w-full ">
                    {data?.personal.slice(0, 4).map((item, index) => (
                        <ProfessionalCard id={item.id} text={item.name} key={index} img={item.coverUrl} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-10 items-center">
                <h1 className="font-bold 2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl">Appliance Services</h1>
                <div className="grid md:grid-cols-4 grid-cols-2 lg:h-80 md:h-60 h-[500px] gap-5 w-full ">
                    {data?.appliance.slice(0, 4).map((item, index) => (
                        <ProfessionalCard id={item.id} text={item.name} key={index} img={item.coverUrl} />
                    ))}
                </div>
            </div>
        </section>
    )
}
