import React, { useRef } from 'react';
import "./UserPop.scss";
import { Popover, Overlay, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Location } from '../../../utils/Icons';
import ButtonFollow from '../../ButtonFollow/ButtonFollow';

export default function UserModal(props) {
    const { show, setShow, target, avatarUrl, userInfo } = props;
    const ref = useRef(null);



    return (
        <div ref={ref}
            className="userpop"
            onMouseLeave={() => { setShow(false); }}
            onMouseEnter={() => { setShow(true); }}
        >
            <Overlay
                target={target}
                show={show}
                placement="right"
                onHide={() => { }}
                container={ref.current}
                containerPadding={100}
                size="lg"
            >
                <Popover id="popover-contained">
                    <Popover.Title >

                        <div className="tit">
                            <Image className="avatar" src={avatarUrl} roundedCircle />
                            <div className="cabecera">

                                <h2>< Link to={`/${userInfo?.id}`}>
                                    <div className="nombre">{userInfo?.nombre} {userInfo?.apellidos} </div></Link>
                                </h2>

                                <p> {userInfo?.email?.charAt(0).toUpperCase() + userInfo?.email.slice(1)}</p>
                            </div></div>

                        <p> <Location />    {userInfo?.ubicacion}</p>
                    </Popover.Title>
                    <Popover.Content >
                        <p> {userInfo?.biografia} </p>

                        <ButtonFollow user={userInfo} />
                    </Popover.Content>

                </Popover>
            </Overlay>
        </div >
    )
}
