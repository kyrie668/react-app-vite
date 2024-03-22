import { useState, useContext, createContext, useReducer, useEffect } from "react";
import "./App.css";
import router from "./router";
import { useRoutes } from "react-router-dom";
import styled from "styled-components";
import { debounce } from "@/utils";
import { useNavigate } from "react-router-dom";
import { CloseOutlined, UnorderedListOutlined, SettingOutlined } from "@ant-design/icons";

const Logo = require("@/assets/icons/leetcode.svg");

const AppContext = createContext();

const RouterMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .left-menu {
    display: flex;
    height: 100%;
    align-items: center;
    .logo {
      width: 59px;
      height: 22px;
      background-size: contain;
    }
  }
  .menu-btn-list {
    margin-left: 40px;
    display: flex;
    gap: 18px;
    height: 100%;
    align-items: center;
    .menu-btn {
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .active {
      font-weight: bold;
      position: relative;
      border-bottom: 2px solid;
    }
    .menu-vip {
      padding: 10px;
      background-color: #ffa1161f;
      border-radius: 3px;
      color: #e7a116;
      cursor: pointer;
    }
  }
`;

const LeftMenuBtn = [
  { name: "学习", path: "/Study", id: 1 },

  { name: "题库", path: "/ItemBank", id: 2 },
  { name: "竞赛", path: "/Race", id: 3 },
  { name: "讨论", path: "/Discuss", id: 4 },

  { name: "求职", path: "/Work", id: 5 },
  { name: "商店", path: "/Shop", id: 6 },
];

const RightMenuBtn = [
  { name: "注册", path: "/Register", id: 7 },
  { name: "登录", path: "/Login", id: 8 },
];

function App() {
  const outlet = useRoutes(router);
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action }), {
    isMobile: false,
    curWidth: 0,
    activeMenuId: 2,
    showMenu: false,
  });

  const { isMobile, curWidth, activeMenuId, showMenu } = state;

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = debounce(() => {
    const curWidth = window.innerWidth;
    const isMobile = curWidth < 768;
    console.log("isMobile", isMobile);

    console.log("curWidth", curWidth);
    dispatch({ isMobile, curWidth });
  }, 200);

  const handleMenuClick = (id, path) => {
    if (id === activeMenuId) {
      return;
    }
    if (isMobile && showMenu) {
      dispatch({ showMenu: false });
    }
    dispatch({ activeMenuId: id });
    navigate(path);
  };

  return (
    <AppContext.Provider value={{ appState: { isMobile, curWidth }, appDispatch: dispatch }}>
      <div className="page-layout">
        <div className="router-memu" style={{ padding: isMobile ? "10px 10px" : "0px 120px" }}>
          <RouterMenu>
            <div className="left-menu">
              <div className="logo" style={{ backgroundImage: `url(${Logo})` }}></div>
              <div className="menu-btn-list" style={{ display: isMobile ? "none" : "flex" }}>
                {LeftMenuBtn.map(({ name, path, id }, index) => {
                  return (
                    <div
                      onClick={() => handleMenuClick(id, path)}
                      className={`menu-btn ${id === activeMenuId ? "active" : ""}`}
                      key={id}
                    >
                      {name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="right-menu">
              <div className="menu-btn-list" style={{ display: isMobile ? "none" : "flex" }}>
                {RightMenuBtn.map(({ name, path, id }, index) => {
                  return (
                    <div
                      onClick={() => handleMenuClick(id, path)}
                      className={`menu-btn ${id === activeMenuId ? "active" : ""}`}
                      key={id}
                    >
                      {name}
                    </div>
                  );
                })}
                <div className="menu-vip" onClick={() => {}}>
                  Plus 会员
                </div>
              </div>
              {isMobile && (
                <UnorderedListOutlined
                  onClick={() => {
                    dispatch({ showMenu: !showMenu });
                  }}
                />
              )}
              {/* <CloseOutlined /> */}
            </div>
          </RouterMenu>
        </div>
        <div className="router-outlet">
          <div className="router-outlet-router" style={{ padding: isMobile ? "10px 10px" : "0px 120px" }}>
            {outlet}
          </div>
          <div className="router-outlet-footer" style={{ padding: isMobile ? "10px 10px" : "50px 50px" }}>
            <div className="footer-item">
              <div className="item-title">竞赛</div>
              <div className="footer-item-detail">讨论社区</div>
              <div className="footer-item-detail">讨论社区</div>
              <div className="footer-item-detail">讨论社区</div>
              <div className="footer-item-detail">讨论社区</div>
            </div>
            <div className="footer-item">
              <div className="item-title">竞赛</div>
              <div className="footer-item-detail">讨论社区</div>
              <div className="footer-item-detail">讨论社区</div>
              <div className="footer-item-detail">讨论社区</div>
              <div className="footer-item-detail">讨论社区</div>
            </div>
            <div className="footer-item">
              <div className="item-title">竞赛</div>
              <div className="footer-item-detail">讨论社区</div>
              <div className="footer-item-detail">讨论社区</div>
              <div className="footer-item-detail">讨论社区</div>
              <div className="footer-item-detail">讨论社区</div>
            </div>
          </div>
        </div>
      </div>
      {isMobile && showMenu && (
        <div className="mobile-menu">
          <div className="top-menu">
            <div className="left-top-menu">
              {RightMenuBtn.map(({ name, path, id }, index) => {
                return (
                  <div className="mobile-menu-btn" key={id} onClick={() => handleMenuClick(id, path)}>
                    {name}
                  </div>
                );
              })}
            </div>

            <div className="mobile-close-icon">
              <CloseOutlined
                style={{ fontSize: "20px" }}
                onClick={() => {
                  dispatch({ showMenu: false });
                }}
              />
            </div>
          </div>
          <div className="menu-list">
            {LeftMenuBtn.map(({ name, path, id }, index) => {
              return (
                <div className="mobile-menu-btn" onClick={() => handleMenuClick(id, path)} key={id}>
                  <SettingOutlined /> {name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}

export default App;
