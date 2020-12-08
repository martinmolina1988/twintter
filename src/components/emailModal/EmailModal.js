import React, { useState } from 'react';
import { Col, Row, Form, Button, Spinner, Modal, Toast } from "react-bootstrap";
import { values, size } from "lodash";
import { Close } from "../../utils/Icons";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { updateEmailApi } from '../../api/user';
import "./EmailModal.scss";
export default function EmailModal(props) {
    const { show, setShow } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signUpLoading, setSignUpLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();




        console.log(formData)

        if (!isEmailValid(formData.email)) {

            toast.warning("Email invalido");
        } else {
            updateEmailApi(formData).then(response => {
                if (response.code) {
                    toast.warning(response.message);
                } else {
                    toast.success("Se ha modificado el password");
                    setShow(false);
                    setFormData(initialFormValue());
                }
            })
        }
    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="password-modal">
            <Modal
                className="password-modal"
                show={show}
                onHide={() => setShow(false)}
                centered
                size="lg"

            >
                <Modal.Header>
                    <Modal.Title>
                        <Close onClick={() => setShow(false)} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h2>Cambia tu contraseña</h2>
                    <form onSubmit={onSubmit} onChange={onChange}>


                        <Form.Group>
                            <Row>
                                <p>Ingresa tu nuevo email</p>
                                <Form.Control type="email" placeholder="Email" name="email" />
                            </Row>

                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {!signUpLoading ? "Enviar" : <Spinner animation="border" />}
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}


function initialFormValue() {
    return {

        email: "",

    }
}