import React from 'react';
import "./RightMenu.scss";
import SearchInput from '../SearchInput';


export default function RightMenu(props) {

    const { children } = props



    return (

        <div className="right-menu">

            <SearchInput />

            {children}



        </div>

    )
}
