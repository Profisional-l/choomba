import { createRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Announcements from "./MainScreen.jsx";
import ProfilePage from "./ProfilePage.jsx";
import FindPage from "./FindPage.jsx";
import AnnPage from "./AnnPage.jsx";
import addpng from "./assets/add.png";
import layerspng from "./assets/layers.png";
import profilepng from "./assets/profile.png";
import looppng from "./assets/loop.png";
import Create from "./Create.jsx";
import "./index.css"; // Убедитесь, что у вас есть стили для анимации

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Получаем функцию navigate
  const nodeRef = createRef();

  // ----------------фикс бага с кнопкой назад в подкатегориях-----------------------
  function HideBackBut() {
    const BackToCatBut = document.querySelector(".BackToCatBut");

    if (BackToCatBut) {
      BackToCatBut.classList.add("BackButOut");
    }
  }
  // -----------------------------------------------------------------------------------

  return (
    <div>
      <div>
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={220}
            classNames="page"
            unmountOnExit
          >
            <div ref={nodeRef}>
              <Routes location={location}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/" element={<Announcements />} />
                <Route path="/create" element={<Create />} />
                <Route path="/annpage" element={<AnnPage />} />
                <Route path="/findpage" element={<FindPage />} />
              </Routes>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>

      {/* Условный рендеринг кнопки "Фильтр" */}
      {location.pathname === "/" ? (
        <Link to="/findpage">
          <button className="SearchBut">
            Фильтр <img src={looppng} alt="" />
          </button>
        </Link>
      ) : location.pathname === "/annpage" ? (
        <button className="SearchBut" onClick={() => navigate(-1)}>
          Назад
        </button>
      ) : null}

      <div className="navbar">
        <Link to="./">
          <button onClick={() => HideBackBut()} className="nav_button">
            <img src={layerspng} alt="" />
          </button>
        </Link>
        <Link to="./create">
          <button onClick={() => HideBackBut()} className="nav_button">
            <img src={addpng} alt="" />
          </button>
        </Link>
        <Link to="./profile">
          <button onClick={() => HideBackBut()} className="nav_button">
            <img src={profilepng} alt="" />
          </button>
        </Link>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
    </Router>
  );
};

export default App;
