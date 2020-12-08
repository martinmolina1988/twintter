import React, { useState } from 'react';

import { Button, Form, Spinner } from 'react-bootstrap';
import "./SignInForm.scss";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signInApi, setTokenApi } from "../../api/auth";


export default function SignInForm(props) {
    const { setRefreshCheckLogin } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signInLoading, setSignInLoading] = useState(false)

    const onSubmit = e => {
        e.preventDefault();
        let validCount = 0;

        values(formData).some(value => {
            value && validCount++
            return null;
        });

        if (size(formData) !== validCount) {
            toast.warning(`Te falta completar  ${size(formData) - validCount} campo/s`);
        } else {
            if (!isEmailValid(formData.email)) {
                toast.warning("El email es invalido");
            } else {
                setSignInLoading(true);
                toast.success("Todo OK");
                signInApi(formData).then(response => {
                    if (response.message) {
                        toast.warning(response.message);
                    } else {

                        setTokenApi(response.token);
                        setRefreshCheckLogin(true);
                    }
                }).catch(() => {
                    toast.error("Error del servidor, intentelo mas tarde");
                }).finally(() => {
                    setSignInLoading(false);

                })
            }
        }




    };


    const onChange = e => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div className="sign-in-form">
            <h2>Entrar</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>

                <Form.Group>
                    <Form.Control type="email" name="email" placeholder="Correo electronico" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="Password" name="password" placeholder="Contraseña" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {!signInLoading ? "Iniciar sesión" : <Spinner animation="border" />}
                </Button>
            </Form>

        </div>
    );

}

function initialFormValue() {
    return {
        email: "",
        password: ""
    };
}