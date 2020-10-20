import React, { useState, MouseEvent, useContext } from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";
import InvertedPopup from "../InvertedPopup";

function Menubar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname.substr(1);
  const path = pathname === "" ? "home" : pathname;
  const [activeItem, setActiveItem] = useState<string>(path);

  const handleItemClick = (
    e: MouseEvent<HTMLAnchorElement>,
    { name }: MenuItemProps
  ) => setActiveItem(name as React.SetStateAction<string>);

  return user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to={"/"} />

      <Menu.Menu position="right">
        <InvertedPopup
          position="top center"
          content="Logout"
          trigger={<Menu.Item name="logout" onClick={logout} />}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to={"/"}
      />

      <Menu.Menu position="right">
        <InvertedPopup
          position="top center"
          content="Login"
          trigger={
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={handleItemClick}
              as={Link}
              to={"/login"}
            />
          }
        />
        <InvertedPopup
          position="top center"
          content="Register"
          trigger={
            <Menu.Item
              name="register"
              active={activeItem === "register"}
              onClick={handleItemClick}
              as={Link}
              to={"/register"}
            />
          }
        />
      </Menu.Menu>
    </Menu>
  );
}

export default Menubar;
