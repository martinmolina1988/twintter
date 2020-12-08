import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Close } from "../../../utils/Icons";
import classNames from 'classnames';
import { toast } from "react-toastify";
import { addTweetApi } from "../../../api/tweet";
import "./ReTweetModal.scss";
import TweetLite from '../../Tweet/TweetLite';
import { rtApi, rtWhitQuoteApi } from '../../../api/rt';
import { altaNotif, aumentoNotif } from '../../../api/notif';
import useAuth from '../../../hooks/useAuth';


export default function ReTweetModal(props) {
    const { showModal, setShowModal, tweet } = props;
    const [message, setMessage] = useState("");
    const [id, setId] = useState(null)
    const maxLength = 280;
    const userLogged = useAuth();

    const onSubmit = (e) => {

        e.preventDefault();

        if (userLogged._id !== tweet?.userId) {
            aumentoNotif(tweet?.userId).then(response => {
                console.log(response)
            })
        }
        if (message.length > 0 && message.length <= maxLength) {
            rtWhitQuoteApi(tweet?._id, message)
                .then((response) => {

                    if (userLogged._id !== tweet?.userId) {
                        altaNotif("cita", response?._id, tweet?.userId)
                            .then((response) => {
                                if (response?.code >= 200 && response?.code < 300) {
                                    toast.success(response.message);
                                }
                            })
                    }
                    if (response?.code >= 200 && response?.code < 300) {
                        toast.success("Cita enviada");
                        setShowModal(false);
                        window.location.reload();



                    }
                }).catch(() => {
                    toast.warning("Error al enviar el tweet, intentelo mas tarde");
                });


        } else if (message.length === 0) {
            if (userLogged._id !== tweet?.userId) {
                altaNotif("rt", tweet?._id, tweet?.userId)
                    .then((response) => {
                        if (response?.code >= 200 && response?.code < 300) {
                            toast.success("RT enviado");

                        }
                    })
            }

            rtApi(tweet?._id)
                .then((response) => {

                    if (response?.code >= 200 && response?.code < 300) {
                        toast.success(response.message);
                        setShowModal(false);
                        window.location.reload();

                    }
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
                    <TweetLite tweet={tweet} />
                    <Button type="submit" disabled={message.length > maxLength}>Retwittear </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
