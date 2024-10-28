import React from 'react';

// importing all the icons
import * as Icons from "react-icons/vsc";
import { matchPath, NavLink, useLocation } from 'react-router-dom';


const SideBarLink = ({ iconName, link }) => {


    // how to import the icons using just icon-names
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }


    return (
        <NavLink
            to={link.path}
            className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50" : "bg-opacity-0 text-richblack-200"}`}
        >
            <span className={`absolute left-0 top-0 w-[0.2rem] h-full bg-yellow-50 ${matchRoute(link.path) ? 'opacity-100' : 'opacity-0'}`}></span>

            <div className='flex items-center gap-x-2' >
                {/* Using Icon which we created using the icon name */}
                <Icon className='text-lg' />
                <span>{link.name}</span>
            </div>

        </NavLink>
    )
}

export default SideBarLink