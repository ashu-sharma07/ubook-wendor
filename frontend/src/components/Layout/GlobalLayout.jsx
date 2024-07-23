import Navbar from '../Navbar'
import { useLocation } from 'react-router-dom'
import Footer from '../Footer';
import LocationModal from '../Modals/LocationModal';
import LoginModal from '../Modals/LoginModal';
import { useEffect } from 'react';

export default function GlobalLayout({ children }) {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <main className='w-screen'>
            <Navbar />
            <div className='max-w-[1350px] h-full xl:px-0 lg:px-12 mx-auto min-h-screen overflow-x-hidden md:px-10 px-6 w-full'>
                {children}
            </div>
            {pathname == "/" && <Footer />}
            <LoginModal />
            <LocationModal />
        </main>
    )
}
