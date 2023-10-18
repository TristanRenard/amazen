'use client'
export default function Logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
    return (
        <>
            <h1>Logout</h1>
        </>
    )
}
