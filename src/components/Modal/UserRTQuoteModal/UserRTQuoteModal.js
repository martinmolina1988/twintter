import React from 'react';
import { Modal } from 'react-bootstrap';
import { map } from 'lodash';
import "./UserRTQuoteModal.scss";
import { Close } from '../../../utils/Icons';
import Tweet from "../../Tweet"

export default function UserRTQuoteModal(props) {
    const { showRTQuoteModal, setShowRTQuoteModal, tweets } = props;





    return (
        <div>
            <Modal
                className="tweet-modal"
                show={showRTQuoteModal}
                onHide={() => setShowRTQuoteModal(false)}
                centered
                size="lg"

            >
                <Modal.Header>
                    <Modal.Title className="modal-title">
                        <Close onClick={() => setShowRTQuoteModal(false)} />
                        <h2>
                            Citado por
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                {
                    map(tweets, (tweet, index) => (
                        <Tweet key={index} tweet={tweet} />
                    ))
                }
            </Modal>
        </div >
    )
}
