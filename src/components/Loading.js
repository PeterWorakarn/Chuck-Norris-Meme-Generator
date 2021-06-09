import React from 'react';
import { FaCircleNotch } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Loading() {
    return (
        <div className="loading">
            <IconContext.Provider value={{ className: 'loading__icons' }}><FaCircleNotch /></IconContext.Provider>
        </div>
    )
}