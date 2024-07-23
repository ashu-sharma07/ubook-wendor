import hero_img from "../../assets/hero_img.png";
import { FaSearch } from "react-icons/fa";
import { axiosInstance } from "../../utils/axiosInstance";
import { useState, useCallback, useEffect, useRef } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedProfessions, setSearchedProfessions] = useState(null);
    const searchBoxRef = useRef(null);
    const navigate = useNavigate();
    const searchProfessions = async (query) => {
        try {
            const res = await axiosInstance.get("user/professions/search?name=" + query);
            setSearchedProfessions(res.data?.data?.professions);
        } catch (error) {
            console.log(error);
        }
    }

    const throttledSearch = useCallback(_.throttle((query) => {
        searchProfessions(query);
    }, 1000), []);

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        throttledSearch(value);
    };

    const handleClickOutside = (event) => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
            setSearchedProfessions(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <section className="w-full h-screen syne py-10 flex flex-col gap-20">
            <div className="w-full h-1/2 relative">
                <img src={hero_img} alt="Hero section image" className="w-full h-full object-cover absolute top-0 right-0 left-0 bottom-0 rounded-xl" />
                <div className="flex flex-col items-center justify-center mx-auto gap-5 absolute top-0 right-0 bottom-0 left-0 md:w-[40%] w-[80%] z-10 ">
                    <h1 className="syne font-semibold xl:text-5xl lg:text-4xl text-3xl text-white text-center">Find the right <span className="text-green-400">
                        Expert
                    </span> for you</h1>
                    <div className="w-full rounded-lg relative bg-white gap-[2%] flex px-2 py-1 items-center justify-between" ref={searchBoxRef}>
                        <input
                            placeholder="Search for any expert..."
                            className="border-none focus:outline-none w-[85%] p-2"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        <FaSearch className="bg-green-900 p-2 w-8 h-8 rounded-md text-white" />
                        {searchedProfessions && <div className="absolute max-h-60 overflow-auto top-[110%] rounded-lg shadow-xl p-3 bg-white w-full left-0">
                            {searchedProfessions.length > 0 ?
                                <ul>{searchedProfessions.map((item, index) => (<li key={index}>
                                    <button className="w-full text-left p-2 hover:bg-gray-100" onClick={() => navigate("/profession/" + item?.id + "?category=" + item?.name)}>{item?.name}</button>
                                </li>))}</ul>
                                : <p>No match</p>}
                        </div>}
                    </div>
                </div>
            </div>
            <div className="syne flex flex-col items-center w-full gap-4">
                <p className="lg:text-4xl text-3xl font-semibold text-center">Expertise you can trust, quality you can count on.</p>
                <p className="text-lg text-center lg:w-1/2 w-2/3">Book verified professionals for all your needs, from home services to personal care, with just a few clicks.</p>
                <button className="lg:text-2xl text-xl bg-green-500 md:mt-10 mt-3 hover:bg-green-600 text-white py-2 px-6 rounded">
                    Get started today and find the perfect expert for your needs.
                </button>
            </div>
        </section>
    );
}
