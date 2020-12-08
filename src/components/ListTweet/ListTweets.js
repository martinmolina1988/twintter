
import React from "react";
import { map } from "lodash";
import "./ListTweets.scss";
import Tweet from "../Tweet"
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";


function ListTweets(props) {
    const { tweets } = props;

    return (
        <div >
            {
                map(tweets, (tweet, index) => (
                    <Tweet key={index} tweet={tweet} index={index} />
                ))
            }
        </div >
    );
}
export default withRouter(ListTweets)