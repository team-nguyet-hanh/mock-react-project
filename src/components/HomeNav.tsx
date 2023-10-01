import React, { useState } from "react";

import Nav from "react-bootstrap/Nav";

import HomeNavStyle from "./HomeNav.module.css";

type HomeNavProps = {
  setArticles: (selectedKey: string) => void;

  tag: string;

  access_token: string;
};

const HomeNav: React.FC<HomeNavProps> = ({
  setArticles,

  tag,

  access_token,
}) => {
  const [activeKey, setActiveKey] = useState(
    access_token ? "your-feed" : "global-feed"
  );

  return (
    <Nav
      onSelect={(selectedKey) => setArticles(selectedKey || "")}
      className={`${HomeNavStyle.nav} `}
    >
      {access_token && (
        <Nav.Item>
          <Nav.Link
            eventKey="your-feed"
            className={`${HomeNavStyle.navLink} ${
              activeKey === "your-feed" &&
              (tag === "your-feed" || tag === "global-feed")
                ? `${HomeNavStyle.activeNavLink}`
                : ""
            } fw-bold`}
            onClick={() => setActiveKey("your-feed")}
          >
            Your Feed
          </Nav.Link>
        </Nav.Item>
      )}

      <Nav.Item>
        <Nav.Link
          eventKey="global-feed"
          className={`${HomeNavStyle.navLink}  ${
            activeKey === "global-feed" &&
            (tag === "your-feed" || tag === "global-feed")
              ? `${HomeNavStyle.activeNavLink}`
              : ""
          } fw-bold`}
          onClick={() => setActiveKey("global-feed")}
        >
          Global Feed
        </Nav.Link>
      </Nav.Item>

      {tag !== "global-feed" && tag !== "your-feed" && (
        <Nav.Item>
          <Nav.Link
            eventKey={`${tag}`}
            className={`${HomeNavStyle.navLink} ${HomeNavStyle.activeNavLink} fw-bold`}
            onClick={() => setActiveKey(tag)}
          >
            {tag}
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default HomeNav;
