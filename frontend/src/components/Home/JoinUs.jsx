import { FaArrowCircleRight } from "react-icons/fa";
export default function JoinUs() {
    return (
        <section className=" relative my-20 w-full h-[50vh]">
            <div className="absolute top-0 rounded-xl overflow-hidden right-0 left-0 bottom-0 h-full w-full">
                <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?cs=srgb&dl=pexels-fauxels-3184291.jpg&fm=jpg" alt="Join us Image" />
            </div>
            <div className="card z-10 h-full flex items-center flex-col gap-20 justify-center w-full">
                <h1 className="playwrite lg:text-7xl md:text-6xl text-5xl">
                    Join us
                </h1>
                <p className="lg:w-1/3 md:w-1/2 w-[80%] text-center">Grow your career and make an impact with a team that thrives on collaboration and creativity.</p>
            </div>
            <button className="bg-black absolute bottom-10 lg:text-lg flex whitespace-nowrap items-center gap-2 left-1/2 rounded-xl font-medium -translate-x-1/2 text-white syne lg:px-7 md:px-5 px-3 lg:py-2 py-1.5">
                Be a part of the team <FaArrowCircleRight/>
            </button>
        </section>
    )
}
