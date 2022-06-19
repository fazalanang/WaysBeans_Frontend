import React from "react"

const styles = {
    backgroundPopUp: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1000',
    },
    containerPopUp:{
        position: 'absolute',
        width: '782px',
        height: '98px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        border: 'none',
        marginTop: '300px',
        marginLeft: '400px'
    },
    textPopUp : {
        fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
        fontSize: '29px',
        lineHeight: '33px',
        paddingTop: '33px',
        paddingLeft: '240px',
        color: '#469F74',
    }

}

function PopUp ({ open,onClose }){
    if (!open) return null

    return (
        <>
        <div style={styles.backgroundPopUp} onClick={onClose}>
            <div style={styles.containerPopUp}>
            <p style={styles.textPopUp}>Success Add Product</p>
            </div>
        </div>
        </>
    )
}

export default PopUp