import React from 'react'
import LeftMenu from "../../components/LeftMenu";
import { Container, Row, Col } from "react-bootstrap";
import "./ChatLayout.scss";


import { withRouter } from 'react-router-dom';
import Right from "./Right"
import Menu from '../../components/Menu';
import Iconos from '../../components/iconos';
import SideBar from '../../components/sideBar';

function ChatLayout(props) {
    const { children, setRefreshCheckLogin, us, userss } = props;


    return (
        <>
            <div className="  d-block d-sm-block d-md-block d-lg-none">

                <SideBar setRefreshCheckLogin={setRefreshCheckLogin} />
            </div>
            <Container className={`chat-layout`}>
                <Menu setRefreshCheckLogin={setRefreshCheckLogin} className="menu" />
                <Row >
                    <Col sm={0} xs={0} className="chat-layout__menu d-none d-sm-none d-md-none d-lg-block"  >
                        <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin} />
                    </Col>
                    <Col sm={2} xs={2} md={6} lg={4} className="chat-layout__content">
                        {children}
                    </Col>
                    <Col sm={10} xs={10} md={6} lg={5} className="chat-layout__right " >

                        <Right us={us} userss={userss} />
                    </Col>
                </Row>
                <Row sm={12} xs={12} className="  d-block d-sm-block d-md-block d-lg-none">
                    <Iconos />
                </Row>
            </Container>
        </>
    )
}
export default withRouter(ChatLayout)