import { Link } from "react-router-dom";

export default function CustomNavbar() {
    return (
        <>
        <nav>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">
            <Link to="/">Single Layer Neural Network (LR)</Link>
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a><Link to="/">Try Neural Network</Link></a>
              </li>
              <li>
                <a><Link to="/about">Project Info</Link></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        </>
    );
}