import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Announcements from "./MainScreen.jsx";
import ProfilePage from "./ProfilePage.jsx";
import FindPage from "./FindPage.jsx";
import AnnPage from './AnnPage.jsx';
import addpng from "./assets/add.png";
import layerspng from "./assets/layers.png";
import profilepng from "./assets/profile.png";
import Create from "./Create.jsx";

const Navbar = () => {
  return (
    <Router>
      <div>
        <div>
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<Announcements />} />
            <Route path="/create" element={<Create />} />
            <Route path="/annpage" element={<AnnPage/>} />
            <Route path="/findpage" element={<FindPage/>} />
          </Routes>
        </div>
        <div className="navbar">
          <Link to="./">
            <button className="nav_button">
              <img src={layerspng} alt="" />
            </button>
          </Link>
          <Link to="./create">
            <button className="nav_button">
              <img src={addpng} alt="" />
            </button>
          </Link>
          <Link to="./profile">
            <button className="nav_button">
              <img src={profilepng} alt="" />
            </button>
          </Link>
        </div>
      </div>
    </Router>
  );
};

export default Navbar;
