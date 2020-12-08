import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

function Example(props) {

    console.log(props)

    useEffect(() => {
        document.title = props.route;
    });

    return (
        <div>
        </div>
    );
}

export default withRouter(Example);