import React, { useEffect, useState } from 'react'
import { getRTApi, removeRTApi, rtApi } from '../../../api/rt';
import { Message } from "../../../utils/Icons"
import MessageModal from '../../Modal/MessageModal/MessageModal';
import ReTweetModal from '../../Modal/ReTweetModal/ReTweetModal';
import "./RTA.scss";

export default function RTA(props) {

    const { tweet } = props;
    const [showModal, setShowModal] = useState(false)




    const RTAModal = () => {
        console.log("showModal");
        setShowModal(true);


    }

    return (
        <>
            <div className="rt">

                <Message className="rta" onClick={RTAModal} />

            </div>
            <MessageModal tweet={tweet} setShowModal={setShowModal} showModal={showModal} />
        </>
    )

}
