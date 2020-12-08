import React, { useEffect, useState } from 'react';
import BasicLayout from '../../layout/BasicLayout/index.js';
import { Spinner, Button, ButtonGroup } from "react-bootstrap";
import queryString from "query-string";
import "./Users.scss";
import { getFollowApi } from '../../api/follow.js';
import { withRouter } from 'react-router-dom';
import ListUsers from '../../components/ListUsers/ListUsers.js';
import { isEmpty } from 'lodash';


function Users(props) {
    const { setRefreshCheckLogin, location, history } = props;
    const params = useUserQuery(location);
    const [users, setUsers] = useState(null);
    const [typeUser, setTypeUser] = useState(params.type || "follow");
    const [pageLoading, setPageLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const onSearch = value => {

        setTimeout(() => {

            setUsers(null);
            history.push({
                search: queryString.stringify({
                    ...params,
                    search: value,
                    page: 1
                })
            })
        }


            , 1500);


    }

    useEffect(() => {

        setPageLoading(true);
        getFollowApi(queryString.stringify(params))
            .then(response => {

                // eslint-disable-next-line eqeqeq
                if (params.page == 1) {

                    if (isEmpty(response)) {
                        setUsers([]);
                    } else {
                        setUsers(response);
                    }
                } else {
                    if (!response) {
                        setBtnLoading(0);

                    } else {
                        setUsers([...users, ...response]);
                        setBtnLoading(false);
                    }
                }



            }).catch(() => {

                setUsers([]);

                return () => { setPageLoading(false); };
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    if (!pageLoading) {
        return null;
    }

    const onChangueType = type => {
        setUsers(null);
        if (type === "new") {
            setTypeUser("new");
        } else {
            setTypeUser("follow");
        }
        history.push(
            {
                search: queryString.stringify({
                    type: type, page: 1, search: ""
                })
            }
        )
    }

    const moreData = () => {
        setBtnLoading(true);
        const newPage = parseInt(params.page) + 1;
        history.push({
            search: queryString.stringify({ ...params, page: newPage }),
        })
    }

    return (
        <BasicLayout className="users" title="Usuarios" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="users__title" >
                <h2>Usuarios </h2>

                <input
                    type="text"
                    placeholder="Busca un usuario.."

                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            <ButtonGroup className="users__options">
                <Button onClick={() => onChangueType("follow")} className={typeUser === "follow" && "active"} >Siguiendo</Button>
                <Button onClick={() => onChangueType("new")} className={typeUser === "new" && "active"}>Nuevo</Button>
            </ButtonGroup>
            {!users ? (

                <div className="users__loading">
                    <Spinner animation="border" variant="info" />
                    Buscando usuarios
                </div>

            ) : (
                    <>
                        <ListUsers users={users} />
                        <Button onClick={moreData} className="load-more">
                            {!btnLoading ? (
                                btnLoading !== 0 && "Cargar mas usuarios"
                            ) : (
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                )}
                        </Button>
                    </>
                )}
        </BasicLayout>

    )
}

function useUserQuery(location) {
    const { page = 1, type = "follow", search } = queryString.parse(location.search);
    return { page, type, search };
}
export default withRouter(Users);