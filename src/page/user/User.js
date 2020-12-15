import React, { useEffect, useState } from 'react';
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth"
import BasicLayout from "../../layout/BasicLayout";
import { withRouter } from "react-router-dom";
import BannerAvatar from "../../components/user/BannerAvatar";
import InfoUser from "../../components/InfoUser";
import ListTweets from "../../components/ListTweet";
import { getUserTweetApi } from '../../api/tweet';
import { checkBlockedApi, unBlockedUserApi } from '../../api/bloqueos';
import "./User.scss";
import { getUserApi } from '../../api/user';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock
} from "@fortawesome/free-solid-svg-icons";


function User(props) {

  const { match, setRefreshCheckLogin } = props;
  const { params } = match;
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false);
  const loggedUser = useAuth();
  const [tweets, setTweets] = useState(null);
  const [iAmBlock, setIAmBlock] = useState(false);
  const [isBlock, setIsBlock] = useState(null);



  useEffect(() => {
    getUserApi(params.id)
      .then((response) => {
        if (!response) toast.error("El usuario que has visitado no existe");
        setUser(response);
      })
      .catch(() => {
        toast.error("El usuario que has visitado no existe");
      });
  }, [params]);

  useEffect(() => {
    getUserTweetApi(params.id, 1).then((response) => {
      setTweets(response);

    }).catch(() => {

      setTweets([]);
    }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const moreData = () => {
    const pageTemp = page + 1;
    setLoadingTweets(true);
    getUserTweetApi(params.id, pageTemp).then(response => {
      if (!response) {
        setLoadingTweets(0);
      } else {
        setTweets([...tweets, ...response]);
        setPage(pageTemp);
        setLoadingTweets(false);
      }
    })
  }

  useEffect(() => {
    if (user) {
      checkBlockedApi(user?.id, loggedUser._id).then(response => {
        if (response?.status) {
          setIAmBlock(true);
        } else {
          setIAmBlock(false);
        }
      });
    }
  }, [user])

  useEffect(() => {
    if (user) {
      checkBlockedApi(loggedUser._id, user?.id).then(response => {
        if (response?.status) {
          console.log(response)
          setIsBlock(true);
        } else {
          setIsBlock(false);
        }
      });
    }

  }, [user]);

  const unBlock = () => {

    unBlockedUserApi(user?.id).then(() => {
      toast.success("El usuario fue desbloqueado");
      window.location.reload();
    })
  }

  return (

    < BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin} >
      { !user ? (<>
        <h2>Espere unos instantes..</h2>
        <div className="load">
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            arian-hidden="true"
          /></div></>
      ) : (

          iAmBlock ? (
            <h2> Estas bloqueado!</h2>
          ) :
            (

              isBlock ? (
                <div className="lock">
                  <h2>Bloqueaste a  {user?.nombre} {user?.apellidos}</h2>
                  <Button onClick={unBlock} className="blocked" > Desbloquear</Button>

                </div>) : (

                  <>

                    <div className="user__title">
                      <h2>{user ? ` ${user.nombre} ${user.apellidos}` : "El usuario no existe"} </h2></div>
                    <BannerAvatar loggedUser={loggedUser} user={user} isBlock={isBlock} />
                    <InfoUser user={user} />
                    <div className="user__tweets" ><h3>Tweets</h3>
                      {tweets && <ListTweets tweets={tweets} />}
                      <Button onClick={moreData}>
                        {!loadingTweets ? (
                          loadingTweets !== 0 && 'Obtener mas tweets'
                        ) : (
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              arian-hidden="true"
                            />
                          )}

                      </Button>

                    </div></>
                )
            )

        )
      }
    </BasicLayout >
  )
}

export default withRouter(User);