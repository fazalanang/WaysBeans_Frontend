import React from 'react'
import Navbar from '../components/navbar'
import Contact from '../components/complain/contact'
import Chat from '../components/complain/chat'

function Complain () {
    return (
        <>
            <Navbar/>
            <div className="containerComplain">
                <Contact/>
                <Chat/>
            </div>
        </>
    )
}

export default Complain