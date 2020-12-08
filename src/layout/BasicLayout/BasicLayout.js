import React from 'react'
import "./BasicLayout.scss";
import { Container, Row, Col } from "react-bootstrap";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from '../../components/RightMenu';
import Menu from '../../components/Menu';
import SearchInput from '../../components/SearchInput';


export default function BasicLayout(props) {

    const { className, children, setRefreshCheckLogin } = props;




    return (

        <Container className={`basic-layout ${className}`}>

            <div className="d-block d-sm-block d-md-block d-lg-none">
                <Menu setRefreshCheckLogin={setRefreshCheckLogin} className="menu" />
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

        </Container>
    )
}
