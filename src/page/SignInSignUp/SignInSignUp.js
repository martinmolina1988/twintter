
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faUsers,
    faComment
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../components/Modal/BasicModal";
import SignUpForm from "../../components/SignUpForm";
import SignInForm from "../../components/SignInForm";
import LogoTwittor from "../../assets/png/logo.png";
import LogoWhiteTwittor from "../../assets/png/logo-white.png";
import "./SignInSignUp.scss"

export default function SignInSignUp(props) {

    const { setRefreshCheckLogin } = props;
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);

    const openModal = content => {
        setShowModal(true);
        setContentModal(content);
    }
    return (
        <>
            <Container className="signin-signup">
                <Row>
                    <LeftComponent />
                    <RightComponent openModal={openModal} setShowModal={setShowModal} setRefreshCheckLogin={setRefreshCheckLogin} />
                </Row>
            </Container>
            <BasicModal show={showModal} setShow={setShowModal}>
                {contentModal}
            </BasicModal>
        </>
    )
    function LeftComponent(params) {
        return (
            <Col className="signin-signup__left d-none d-sm-none d-md-none d-lg-block" sm={0} xs={0} lg={6}>

                <img src={LogoTwittor} alt="twittor" />

                <div >
                    <h2> <FontAwesomeIcon icon={faSearch} /> Sigue lo que te interesa</h2>
                    <h2> <FontAwesomeIcon icon={faUsers} /> Enterate lo que esta hablando la gente</h2>
                    <h2><FontAwesomeIcon icon={faComment} /> Unete a la conversacion</h2>
                </div>
            </Col>

        )
    }

    function RightComponent(props) {
        const { openModal, setShowModal, setRefreshCheckLogin } = props;
        return (
            <Col className="signin-signup__right " sm={12} xs={12} lg={6}>
                <div>
                    <img src={LogoWhiteTwittor} alt="twittor" />
                    <h2>Mirá lo que esta pasando en el mundo en este momento</h2>
                    <h3>Únete a Twitter ahora mismo</h3>
                    <Button variant="primary"
                        onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
                    >
                        Registrate</Button>

                    <Button variant="outline-primary"
                        onClick={() => openModal(<SignInForm setRefreshCheckLogin={setRefreshCheckLogin} />)}
                    >
                        Iniciar sesión
                 </Button>
                </div>
            </Col>

        )
    }
}
