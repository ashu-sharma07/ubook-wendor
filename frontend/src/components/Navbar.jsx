import { NavLink, useNavigate } from "react-router-dom";
import { useModalContext } from "../context/ModalContext";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { setLoginModalOpen } = useModalContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    return (
        <nav className='w-full my-5 raleway overflow-y-hidden border-b pb-5'>
            <div className="max-w-[1350px] xl:px-0 lg:px-12 mx-auto overflow-hidden flex items-center justify-between md:px-10 px-6 w-full">
                <NavLink to="/" className={"syne text-black font-bold text-4xl"}>
                    uBook
                </NavLink>

                <ul className="flex items-center gap-4 justify-end">
                    <li className='2xl:text-lg xl:text-base lg:text-sm font-medium inline-block'>
                        <button onClick={() => user?.id != "" ? navigate("/my-bookings") : setLoginModalOpen(true)}>
                            My bookings
                        </button>
                    </li>
                    <li className='2xl:text-lg xl:text-base lg:text-sm font-medium inline-block'>
                        {user?.id != "" ? <button onClick={() => navigate("/profile")} className="h-8 w-8 rounded-full flex items-center overflow-hidden">
                            {user?.avatarUrl ? <img src={user?.avatarUrl} alt="user avatar" className="h-full w-full" /> :
                                <span className="h-8 w-8 rounded-full bg-orange-400 text-white flex items-center justify-center text-sm">{user?.fullName?.at(0)}</span>}
                        </button> : <button onClick={() => setLoginModalOpen(true)} className="border border-gray-500 rounded-lg px-3 py-1">
                            Sign In
                        </button>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}