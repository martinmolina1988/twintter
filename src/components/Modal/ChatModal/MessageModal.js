import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Close } from "../../../utils/Icons";
import classNames from 'classnames';
import { toast } from "react-toastify";
import "./MessageModal.scss";
import TweetLite from '../../Tweet/TweetLite';
import { addResponseApi } from '../../../api/rta';
import { altaNotif, aumentoNotif } from "../../../api/notif";
import useAuth from '../../../hooks/useAuth';


export default function MessageModal(props) {
    const { showModal, setShowModal, tweet } = props;
    const userLogged = useAuth();

    const [message, setMessage] = useState("");
    const maxLength = 280;

    const onSubmit = (e) => {

        e.preventDefault();


        if (message.length > 0 && message.length <= maxLength && tweet) {
            addResponseApi(tweet?._id, message, tweet?.userId)
                .then((response) => {
                    console.log(response)
                    if (userLogged._id !== tweet?.userId) {
                        altaNotif("respuesta", response?._id, tweet?.userId)
                            .then((response) => {
                                if (response?.code >= 200 && response?.code < 300) {
                                    toast.success(response.message);

                                }
                            })
                    }


                    setShowModal(false);
                    window.location.reload();


                }).catch(() => {
                    toast.warning("Error al enviar el tweet, intentelo mas tarde");
                });
        }



    }

    return (
        <Modal
            className="tweet-modal"
            show={showModal}
            onHide={() => setShowModal(false)}
            centered
            size="lg"
            onChange={e => setMessage(e.target.value)}
        >
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={() => setShowModal(false)} />
                </Modal.Title>
                <TweetLite tweet={tweet} />
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Control
                        as="textarea"
                        rows="6"
                        placeholder="¿Que estás pensando?"
                    />
                    <span className={classNames("count", { error: message.length > maxLength })}>
                        {maxLength - message.length}
                    </span>

                    <Button type="submit" disabled={message.length > maxLength}>Responder </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
