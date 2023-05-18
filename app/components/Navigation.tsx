import React from 'react'
import PropTypes from 'prop-types'

import { NavLink } from "@remix-run/react";

import logo from "../images/d20.png";

const Navigation = () => {
  return (
    <header className="sticky flex justify-between top-0 left-0 w-screen -ml-40 px-40 text-[#eee6e1] bg-[#0a0a0a] items-center z-50"> 
        <div>
            <a 
            href="/"
            rel="noreferrer">
                <img src={logo} className='w-10 hover:rotate-[150deg] transition-all'/>
            </a>
        </div>
        <ul className="flex min-h-[130px] justify-end items-center gap-10 uppercase">
            <li>
                <NavLink 
                to="/pnp"
                rel="noreferrer"
                className={({ isActive}) =>
                    isActive ? "text-[#cbe458] hover:text-[#cbe458] inline-block transition-all font-bold" : "hover:text-[#cbe458] inline-block transition-all font-bold"
                }
                >
                    Build PNP
                </NavLink>
            </li>
            <li>
                <NavLink 
                to="/character-sheet"
                rel="noreferrer"
                className={({ isActive}) =>
                    isActive ? "text-[#cbe458] hover:text-[#cbe458] inline-block transition-all font-bold" : "hover:text-[#cbe458] inline-block transition-all font-bold"
                }>
                    Character Sheets
                </NavLink>
            </li>
            <li>
                <NavLink 
                to="/lobby"
                rel="noreferrer"
                className={({ isActive}) =>
                    isActive ? "text-[#cbe458] hover:text-[#cbe458] inline-block transition-all font-bold" : "hover:text-[#cbe458] inline-block transition-all font-bold"
                }>
                    Start Lobby
                </NavLink>
            </li>
        </ul>
      </header>
  )
}

Navigation.propTypes = {}

export default Navigation