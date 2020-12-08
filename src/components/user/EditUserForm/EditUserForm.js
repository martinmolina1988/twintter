import React, { useState } from 'react';
import { Button, Col, Row, Form, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { API_HOST } from "../../../utils/constants";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Camera } from "../../../utils/Icons";
import { uploadBannerApi, uploadAvatarApi, updateInfoApi } from "../../../api/user"
import "./EditUserForm.scss";

export default function EditUserForm(props) {
    const { user, setShowModal } = props;
    const [formData, setFormData] = useState(initialValue(user))
    const [bannerUrl, setBannerUrl] = useState(
        user?.banner ? `${API_HOST}/obtenerBanner?id=${user.id}` : null
    );

    const [bannerFile, setBannerFile] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(
        user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : null
    );

    const onDropBanner = (acceptedFile) => {
        const file = acceptedFile[0];
        setBannerUrl(URL.createObjectURL(file));
        setBannerFile(file);
    };

    const { getInputProps: getInputBannerProps, getRootProps: getRootBannerProps, } = useDropzone({
        accept: "image/jpeg, image/png, image/bmp",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner

    })

    const onDropAvatar = (acceptedFile) => {
        const file = acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file));
        setAvatarFile(file);
    };

    const { getInputProps: getInputAvatarProps, getRootProps: getRootAvatarProps, } = useDropzone({
        accept: "image/jpeg, image/png, image/bmp",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar

    })

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (bannerFile) {
            await uploadBannerApi(bannerFile).catch(() => {
                toast.error("Error al subir el banner");
            })
        }
        if (avatarFile) {
            await uploadAvatarApi(avatarFile).catch(() => {
                toast.error("Error al subir el avatar");
            })
        }

        await updateInfoApi(formData).then(() => {
            setShowModal(false);
        }
        ).catch(() => {
            toast.error("Error al actualizar los datos");
        })
        setLoading(false)
        window.location.reload();
    }

    return (
        <div className="edit-user-form">
            <div className="banner" style={{ background: `url('${bannerUrl}')` }}{...getRootBannerProps()}>
                <input {...getInputBannerProps()} />
                <Camera />
            </div>
            <div className="avatar" style={{ background: `url('${avatarUrl}')` }}{...getRootAvatarProps()}>
                <input {...getInputAvatarProps()} />
                <Camera />
            </div>

            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col><Form.Control onChange={onChange} type="text" placeholder="Nombre" name="nombre" defaultValue={formData.nombre} /></Col>
                        <Col><Form.Control onChange={onChange} type="text" placeholder="Apellidos" name="apellidos" defaultValue={formData.apellidos} /></Col>

                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Control onChange={onChange} as="textarea" row="3" placeholder="Agrega tu biografia" type="text" name="biografia" defaultValue={formData.biografia} />
                </Form.Group>

                <Form.Group>
                    <Form.Control onChange={onChange} placeholder="Agrega tu ubicación" type="text" name="ubicacion" defaultValue={formData.ubicacion} />
                </Form.Group>

                <Form.Group>
                    <Form.Control onChange={onChange} placeholder="Sitio web" type="text" name="sitioWeb" defaultValue={formData.sitioWeb} />
                </Form.Group>

                <Form.Group>
                    <DatePicker
                        placeholder="Fecha de nacimiento"
                        locale={es}
                        selected={new Date(formData.fechaNacimiento)}
                        onChange={value => setFormData({ ...formData, fechaNacimiento: value })}

                    />
                </Form.Group>
                <Button className="btn-submit" variant="primary" type="submit">
                    {loading && <Spinner animation="border" size="sm" />}

                    {!loading && "Actualizar"}
                </Button>
            </Form>
        </div>
    )
}

function initialValue(user) {
    return {

        nombre: user.nombre || "",
        apellidos: user.apellidos || "",
        biografia: user.biografia || "",
        ubicacion: user.ubicacion || "",
        sitioWeb: user.sitioWeb || "",
        fechaNacimiento: user.fechaNacimiento || "",
    };
}