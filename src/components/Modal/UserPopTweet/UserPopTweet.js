import React, { useRef, useEffect, useState } from 'react';
import "./UserPopTweet.scss";
import { Popover, Overlay } from 'react-bootstrap';
import TweetLite from '../../Tweet/TweetLite';
import { getTweetApi } from '../../../api/tweet';

export default function UserModal(props) {
    const { show, setShow, target, tweet } = props;
    const ref = useRef(null);
    const [tw, setTw] = useState(null)

    useEffect(() => {
        if (tweet) {
            getTweetApi(tweet).then(response => {
                setTw(response)
            })
        }

    }, [tweet])


    return (
        <div ref={ref}
            className="user-pop-tweet"
            onMouseLeave={() => { setShow(false); }}
            onMouseEnter={() => { setShow(true); }}
        >
            <Overlay
                target={target}
                show={show}
                placement="left"
                onHide={() => { }}
                container={ref.current}
                containerPadding={1}
                size="lg"
            >
                <Popover id="popover-contained">
                    <Popover.Title >


                    </Popover.Title>
                    <Popover.Content >
                        <TweetLite tweet={tw} />
                    </Popover.Content>

                </Popover>
            </Overlay>
        </div >
    )
}
