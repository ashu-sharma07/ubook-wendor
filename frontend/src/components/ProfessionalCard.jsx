import { Link } from "react-router-dom"

export default function ProfessionalCard({ text = "", img = null, id = "" }) {
    return (
        <Link to={"/profession/" + id + "?category=" + text} className='w-full h-full rounded-xl shadow-sm overflow-hidden border border-gray-300 hover:border-gray-500 transition'>
            <div className='h-[30%] md:p-5 p-3 w-full'>
                <h3 className="text-xl text-left font-medium">
                    {text}
                </h3>
            </div>
            <div className='h-[70%] w-full'>
                <img src={img} className='h-full w-full object-cover' alt='Professional Image' />
            </div>
        </Link>
    )
}
