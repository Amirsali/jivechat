import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Chat from "./components/Chat";
import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
import Residebar from "./components/Residebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import Login from "./components/Login";
import Logo from "./Logo.png";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Apploading>
        <ApploadingContent>
          <img src={Logo} alt="" />
          <Spinner name="pacman" color="green" fadeIn="none" />
        </ApploadingContent>
      </Apploading>
    );
  }
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              {/* <Sidebar /> */}
              <Residebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const Apploading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const ApploadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    object-fit: contain;
    height: 200px;
    padding: 20px;
    margin-bottom: 20px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
