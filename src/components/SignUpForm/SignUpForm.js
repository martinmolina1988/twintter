import React, { useState } from 'react';
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signUpApi } from "../../api/auth";
import "./SignUpForm.scss";
export default function SignUpForm(props) {
    const { setShowModal } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signUpLoading, setSignUpLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault();


 
        let validCount = 0;
        values(formData).some(value => {
            value && validCount++;
            return null;
        })


        if (validCount !== size(formData))
            toast.warning(`Faltan completar ${size(formData) - validCount} campo/s`);
        else {
            if (!isEmailValid(formData.email))
                toast.warning("Email invalido");

            else if (formData.password !== formData.repeatPassword) {
                toast.warning("Las contraseñas deben ser iguales");
            } else if (size(formData.password) < 6) {

                toast.warning("Las contraseña debe tener mas de 6 caracteres");
            } else {
                setSignUpLoading(true);
                toast.success("Todo OK");
            }
            signUpApi(formData).then(response => {
                if (response.code) {
                    toast.warning(response.message);
                } else {
                    toast.success("Registro exitoso");
                    setShowModal(false);
                    setFormData(initialFormValue());
                }
            }).catch(() => toast.err("Error del servidor, intentelo mas tarde")).finally(() => {
                setSignUpLoading(false);
            });
        }
    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    return (
        <div className="sign-up-form">
            <h2>Crea tu cuenta</h2>
            <form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Nombre" name="nombre" />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Apellidos" name="apellidos" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="Correo electronico" name="email" />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="password" placeholder="Contraseña" name="password" />
                        </Col>
                        <Col>
                            <Form.Control type="password" placeholder="Repetir contraseña" name="repeatPassword" />
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {!signUpLoading ? "Registrate" : <Spinner animation="border" />}
                </Button>
            </form>
        </div>
    )
}


function initialFormValue() {
    return {
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        repeatPassword: "",

    }
}