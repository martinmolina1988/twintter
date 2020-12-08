import React, { useEffect, useState } from 'react'
import { getUserApi } from '../../api/user'
import { API_HOST } from '../../utils/constants'
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { getLastesMessage } from '../../api/mensajes';


function User(props) {
    const [users, setUsers] = useState(null)
    const [mensaje, setMensaje] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null);

    const { user, setUs, setUserss, history, userLogged } = props;
    useEffect(() => {
        const fetchUser = async () => {
            await getUserApi(user?.userrecived).then(response => {

                setUsers(response)

                setAvatarUrl(
                    response?.avatar
                        ? `${API_HOST}/obtenerAvatar?id=${response.id}`
                        : AvatarNoFound
                );
            })

        }
        getLastesMessage(1, userLogged._id, user?.userrecived).then(response => {
            setMensaje(response)
        })
        fetchUser()


    }, [user])

    const onClick = () => {
        setUs(user); setUserss(users);
        history.push(`/messages`)
        history.push({
            search: users?.id
        })
        console.log("Clcik")

    }
    return (
        <>
            <div sm={2} xs={2} lg={3} className="d-none d-sm-none d-md-block d-lg-block" >
                <div className="messages"> <div className="perfil" onClick={onClick}>
                    <Image className="avatar" src={avatarUrl} roundedCircle />
                    <h6> {users?.nombre} {users?.apellidos} {"@" + users?.id}  </h6>
                </div>
                    <p className="span">{mensaje?.[0].mensaje}</p>
                </div>
            </div>
            <div sm={1} xs={2} lg={3} className="d-block d-sm-block d-md-none d-lg-none ">
                <div className="messages" onClick={onClick}>
                    <Image className="avatar" src={avatarUrl} roundedCircle />


                </div>
            </div>
        </>)


}
export default withRouter(User)