import {useState} from "react"

export default function User() {
  const [active, setActive] = useState('yourFeed')
  return (
    <>
      <div>
        <ul className="nav nav-underline">
          <li className="nav-item">
            <a
              className={`nav-link ${active === "yourFeed" ? "active" : null}`}
              aria-current="page"
              id="yourFeed"
              onClick={(e) => setActive(e.target.id)}
            >
              Your feed
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                active === "globalFeed" ? "active" : null
              }`}
              aria-current="page"
              id="globalFeed"
              onClick={(e) => setActive(e.target.id)}
            >
              Global feed
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
