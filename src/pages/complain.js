import React, { useState, useEffect, useContext} from 'react'
import Navbar from '../components/navbar'
import Contact from '../components/complain/contact'
import Chat from '../components/complain/chat'
import { UserContext } from '../context/userContext'
import { io } from 'socket.io-client'

let socket
function Complain () {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [state] = useContext(UserContext)

    useEffect(() => {
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem("token")
            },
            query: {
                id: state.user.id
            }
        })

        socket.on("new message", () => {
            console.log("contact : ", contact);
            socket.emit("load messages", contact?.id)
        })

        // listen error sent from server
        socket.on("connect_error", (err) => {
            console.error(err.message); // not authorized
        });
        loadContact()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages])

    const loadContact = () => {
        // emit event load admin contact
        socket.emit("load admin contact")
        // listen event to get admin contact
        socket.on("admin contact", (data) => {
            // manipulate data to add message property with the newest message
            const dataContact = {
                ...data,
                message: messages.length > 0 ? messages[messages.length - 1].message : "Click here to start message"
            }
            setContacts([dataContact])
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        socket.emit("load messages", data.id)
    }

    const loadMessages = () => {
        socket.on("messages", (data) => {
            if (data.length > 0) {
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message
                }))
                setMessages(dataMessages)
            }
        })
    }

    const onSendMessage = (e) => {
            const dataSend = {
                idRecipient: contact.id,
                message: e.target.value
            }
            socket.emit("send message", dataSend)
            e.target.value = ""
    }

    return (
        <>
            <Navbar/>
            <div className="containerComplain">
                <div className='leftComplains'>
                <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
                </div>
                <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} />
            </div>
        </>
    )
}

export default Complain