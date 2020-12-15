import React from 'react'
import "./BasicLayout.scss";
import { Container, Row, Col } from "react-bootstrap";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from '../../components/RightMenu';
import Menu from '../../components/Menu';
import SearchInput from '../../components/SearchInput';
import SideBar from '../../components/sideBar';
import { Lupa } from "../../utils/Icons"
import Iconos from '../../components/iconos';

export default function BasicLayout(props) {

    const { className, children, setRefreshCheckLogin } = props;




    return (
        <>
            <div className="  d-block d-sm-block d-md-block d-lg-none">

                <SideBar setRefreshCheckLogin={setRefreshCheckLogin} />
            </div>
            <Container className={`basic-layout ${className}`}>
                <div className="d-block d-sm-block d-md-block d-lg-none">
                    <SearchInput className="inp" />
                </div>
                <Row >
                    <Col sm={1} xs={2} lg={3} className="basic-layout__menu  d-none d-sm-none d-md-none d-lg-block" >

                        <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin} />
                    </Col>
                    <Col sm={12} xs={12} lg={6} className="basic-layout__content">
                        {children}
                    </Col>
                    <Col sm={0} xs={0} lg={3} className=" d-none d-sm-none d-md-none d-lg-block" >
                        <RightMenu />
                    </Col>
                </Row>
                <Row sm={12} xs={12} className="  d-block d-sm-block d-md-block d-lg-none">
                    <Iconos />
                </Row>
            </Container>
        </>)
}
