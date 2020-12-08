import React, { useState } from 'react';
import { Col, Row, Form, Button, Spinner, Modal, Toast } from "react-bootstrap";
import { values, size } from "lodash";
import { Close } from "../../utils/Icons";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { updatePasswordApi } from '../../api/user';
import "./PasswordModal.scss";
export default function PasswordModal(props) {
    const { show, setShow } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signUpLoading, setSignUpLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();




        console.log(formData)

        if (formData.password !== formData.repeatPassword) {
            toast.warning("Las contraseñas deben ser iguales");
        } else if (size(formData.password) < 6) {

            toast.warning("Las contraseña debe tener mas de 6 caracteres");
        } else {
            setSignUpLoading(true);
            toast.success("Todo OK");
        }
        updatePasswordApi(formData).then(response => {
            if (response.code) {
                toast.warning(response.message);
            } else {
                toast.success("Se ha modificado el password");
                setShow(false);
                setFormData(initialFormValue());
            }
        })

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
                                <p>Ingresa tu nueva contraseña</p>
                                <Form.Control type="password" placeholder="Contraseña" name="password" />
                            </Row>
                            <Row>
                                <p>Vuelve a ingresar tu nueva contraseña</p>
                                <Form.Control type="password" placeholder="Repetir contraseña" name="repeatPassword" />
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

        password: "",
        repeatPassword: "",

    }
}