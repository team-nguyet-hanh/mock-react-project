import { useNavigate } from "react-router-dom";


export function PrivateRoute() {
    const navigate = useNavigate()
    // check if user is logged in
    // If yes, show route
    // Otherwise, redirect to login page
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) return (
        navigate('/login')
    )

    return <div>Private Route</div>
}