import React from "react";
import "./NavBar.css";
import { FontAwesomeIcon as Fa } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar: React.FC = (props) => {
  return (
    <div className="navigation flex flex-wrap py-4 px-2 justify-between select-none">
      <div className="groupOne flex items-center justify-center">
        <div
          // on:click={() => {
          // 	// @ts-ignore
          // 	sidebar.classList.toggle('hidden');
          // }}
          // on:keypress={() => {
          // 	// @ts-ignore
          // 	sidebar.classList.toggle('hidden');
          // }}
          className="toggleMenu px-2 mr-4 py-2 hover:opacity-90 hover:bg-white hover:bg-opacity-5 rounded-sm cursor-pointer"
        >
          <Fa icon={faBars} fontSize={20} className="mx-2" />
        </div>
        <div className="title flex">
          MTA Transit — <div className="font-light">Lines</div>
        </div>
      </div>
      <div className="groupTwo flex items-center justify-center select-text">
        <div className="refreshTimeContainer">
          <i className="flex">
            Last Refreshed:
            <div className="font-semibold px-2">
              <slot name="RefreshTime">SLOT=RefreshTime</slot>
            </div>
          </i>
        </div>
        <slot name="Extra">
          {
            /* @ts-ignore */
            props.Extra || "SLOT=Extra"
          }
        </slot>
      </div>
    </div>
  );
};

export default NavBar;
