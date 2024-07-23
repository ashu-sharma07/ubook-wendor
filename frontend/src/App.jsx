import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyBookings from './pages/MyBookings'
import Profession from './pages/Profession'
import BookingProfessional from './pages/BookingProfessional'
import SingleBookingView from './pages/SingleBookingView'
import UserProfile from './pages/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/profession/:id"
                element={<Profession />}
            />
            <Route
                path="/professional/:id"
                element={<BookingProfessional />}
            />
            <Route element={<ProtectedRoute />}>
                <Route path='my-bookings' element={<MyBookings />} />
                <Route
                    path="/booking/:id"
                    element={<SingleBookingView />}
                />
                <Route path="/profile"
                    element={<UserProfile />} />
            </Route>
        </Routes>
    )
}

export default App
