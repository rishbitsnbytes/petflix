import "./sidebar.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Sidebar = () => {
  return (
    <div className="w-full">
      <SidebarRoutesMapped />
    </div>
  );
};

const SidebarRoutesMapped = () => {
  const routes = [
    {
      id: uuid(),
      route: "Home",
      path: "/",
      icon: <i className="fa-solid fa-house"></i>,
    },
    {
      id: uuid(),
      route: "Explore",
      path: "/explore",
      icon: <i className="fa-solid fa-compass"></i>,
    },
    {
      id: uuid(),
      route: "Playlists",
      path: "/playlists",
      icon: <i className="fa-regular fa-circle-play"></i>,
    },
    {
      id: uuid(),
      route: "Likes",
      path: "/likes",
      icon: <i className="fa-regular fa-thumbs-up"></i>,
    },
    {
      id: uuid(),
      route: "Watch Later",
      path: "/watchlater",
      icon: <i className="fa-regular fa-clock"></i>,
    },
    {
      id: uuid(),
      route: "History",
      path: "/history",
      icon: <i className="fa-solid fa-clock-rotate-left"></i>,
    },
  ];

  return (
    <ul className="sidebar flex-col flex-justify-start flex-align-start gap-2 py-2 w-full">
      {routes.map(({ id, route, icon, path }) => (
        <li className="w-full rounded-md" key={id}>
          <NavLink
            to={path}
            className="h4 flex-row flex-align-center flex-justify-start mx-auto flex-wrap gap-2 w-full px-3 py-1 rounded-md"
          >
            {icon} {route}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export { Sidebar };
