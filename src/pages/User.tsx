import { useState } from "react";
import { useSelector } from "react-redux";
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";

export default function User() {
  const [active, setActive] = useState("yourFeed");
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  return (
    <>
      <div className="text-center">
      <Image src={currentUser.image} roundedCircle />
        <h1>{currentUser.username}</h1>
        <div>
          <Link to='/settings'>Edit profile settings</Link>
        </div>
      </div>
      <div>
        <ul className="nav nav-underline">
          <li className="nav-item">
            <div
              className={`nav-link ${active === "yourFeed" ? "active" : null}`}
              aria-current="page"
              id="yourFeed"
              onClick={(e) => setActive((e.target as HTMLTextAreaElement).id)}
            >
              Your feed
            </div>
          </li>
          <li className="nav-item">
            <div
              className={`nav-link ${
                active === "globalFeed" ? "active" : null
              }`}
              aria-current="page"
              id="globalFeed"
              onClick={(e) => setActive((e.target as HTMLTextAreaElement).id)}
            >
              Global feed
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
