import React from 'react';
import { Modal } from 'react-bootstrap';
import { isEmpty, map } from 'lodash';
import "./UserLikeModal.scss";
import User from './User';
import { Close } from '../../../utils/Icons';

export default function UserLikeModal(props) {
    const { showModal, setShowModal, like } = props;

    return (
        <div>
            <Modal
                className="tweet-modal"
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="lg"

            >
                <Modal.Header>
                    <Modal.Title className="modal-title">
                        <Close onClick={() => setShowModal(false)} />
                        <h2>
                            Marcado como me gusta por:
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                {
                    map(like, (likes, index) => (
                        <User key={index} likes={likes} />
                    ))
                }
            </Modal>
        </div >
    )
}
