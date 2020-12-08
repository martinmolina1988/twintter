import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { getUsersTweetApi } from '../../api/tweet';
import queryString from "query-string";
import BasicLayout from '../../layout/BasicLayout';
import "./Search.scss";
import ListTweet from '../../components/ListTweet';



function Search(props) {

    const [tweets, setTweets] = useState(null)
    const { location, history } = props;
    // eslint-disable-next-line no-undef
    const params = useUserQuery(location);

    function useUserQuery(location) {
        const { page = 1, search } = queryString.parse(location.search);
        return { page, search };
    }
    useEffect(() => {

        getUsersTweetApi(params.search, 1).then((response) => {

            console.log(response)
            setTweets(response);
            // eslint-disable-next-line no-unused-expressions
        }).catch(() => {

            setTweets([]);

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.search])

    return (
        <BasicLayout className="search">

            <h2>Resultados:</h2>
            <ListTweet tweets={tweets} />
        </BasicLayout>
    )
}
export default withRouter(Search)