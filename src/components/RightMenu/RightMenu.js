import React from 'react';
import "./RightMenu.scss";
import { Lupa } from "../../utils/Icons";
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
