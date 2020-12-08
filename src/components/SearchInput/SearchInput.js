/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import "./SearchInput.scss";
import queryString from "query-string";
import { withRouter } from 'react-router-dom';
import { getUsersApi } from "../../api/follow";
import { isEmpty } from 'lodash';
import { Spinner } from 'react-bootstrap';
import ListSearchUsers from '../ListSearchUsers';

function searchInput(props) {

    const { location, history } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [users, setUsers] = useState(null);
    const [searchName, setSearchName] = useState(null)
    const [pageLoading, setPageLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [loadingTweets, setLoadingTweets] = useState(null)

    function useUserQuery(location) {
        const { page = 1, search } = queryString.parse(location.search);
        return { page, search };
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useUserQuery(location);

    const onSearch = value => {
        setSearchName(value);
        setTimeout(() => {
            history.push({
                search: queryString.stringify({
                    ...params,
                    search: value,
                    page: 1
                })
            })

        }, 500);
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {

        setPageLoading(true);
        getUsersApi(queryString.stringify(params))
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

    const enter = (e) => {
        if (e.key === 'Enter') {

            history.push("/search")

            history.push({

                search: queryString.stringify({
                    ...params,
                    search: searchName,
                    page: 1
                })
            })


        }

    }


    return (
        <div className="search-input " id="input">

            <label>
                <input
                    type="text"
                    placeholder={` Busca un usuario..`
                    }
                    onChange={(e) => onSearch(e.target.value)}
                    onKeyPress={enter}
                />
            </label >

            {!users ? (

                <div className="users__loading">
                    <Spinner animation="border" variant="info" />
    Buscando usuarios
                </div>

            ) : (
                    <>
                        {searchName && (
                            <ListSearchUsers users={users} searchName={searchName} />
                        )}
                    </>
                )}
        </div >
    )
}

export default withRouter(searchInput)

