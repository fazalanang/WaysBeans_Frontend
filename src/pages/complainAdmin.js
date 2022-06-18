import React, { useState, useEffect, useContext} from 'react'
import Navbar from '../components/navbar'
import Contact from '../components/complain/contact'
import Chat from '../components/complain/chat'
import { UserContext } from '../context/userContext'
import { io } from 'socket.io-client'

let socket
function ComplainAdmin () {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [state] = useContext(UserContext)

    useEffect(() => {
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            },
            query: {
                id: state.user.id
            }
        })

        socket.on("new message", () => {
            console.log("contact : ", contact);
            socket.emit("load messages", contact?.id)
        })

        loadContacts()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages])

    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
            let dataContacts = data.filter(item => (item.status !== "admin") && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))
            // manipulate customers to add message property with the newest message
            dataContacts = dataContacts.map((item) => ({
                ...item,
                message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].message : "Click here to start message"
            }))
            setContacts(dataContacts)
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
            loadContacts()
        })
    }

    const onSendMessage = (e) => {
        if (e.key === 'Enter') {
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            socket.emit("send message", data)
            e.target.value = ""
        }
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

export default ComplainAdmin