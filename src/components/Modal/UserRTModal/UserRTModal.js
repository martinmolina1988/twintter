import React from 'react';
import { Modal } from 'react-bootstrap';
import { isEmpty, map } from 'lodash';
import "./UserRTModal.scss";
import User from './User';
import { Close } from '../../../utils/Icons';

export default function UserRTModal(props) {
    const { showRTModal, setShowRTModal, retweet } = props;
    return (
        <div>
            <Modal
                className="tweet-modal"
                show={showRTModal}
                onHide={() => setShowRTModal(false)}
                centered
                size="lg"

            >
                <Modal.Header>
                    <Modal.Title className="modal-title">
                        <Close onClick={() => setShowRTModal(false)} />
                        <h2>
                            Retwitteado por
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                {
                    map(retweet, (retweets, index) => (
                        <User key={index} retweets={retweets} />
                    ))
                }
            </Modal>
        </div >
    )
}
