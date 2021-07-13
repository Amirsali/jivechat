import React from "react";

import SideNav, {
  // Toggle,
  // Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
// Make sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SidebarOptions from "./SidebarOptions";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { enterRoom } from "../features/appSlice";
import { useDispatch } from "react-redux";

function Residebar({ Icon, title, addChannelOption, id }) {
  const [user] = useAuthState(auth);
  // Pulling data from database
  const [channels, loading, error] = useCollection(db.collection("rooms"));

  const dispatch = useDispatch();
  // Adding channels
  const addChannel = () => {
    const channelName = prompt("Please enter the Channel Name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };

  return (
    <SideNav>
      <SideNav.Toggle />
      <SideNav.Nav>
        <NavItem eventKey="add" onClick={addChannel}>
          <NavIcon>
            <AddIcon />
          </NavIcon>
          <NavText>Add New ChatRoom</NavText>
        </NavItem>
        <NavItem eventKey="channels" onClick={selectChannel}>
          <NavIcon>
            <PeopleAltIcon />
          </NavIcon>
          <NavText>Chat Rooms</NavText>
          <NavItem>
            <NavText onClick={() => <SideNav.Toggle />}>
              {channels?.docs.map((doc) => (
                <SidebarOptions
                  key={doc.id}
                  id={doc.id}
                  title={doc.data().name}
                />
              ))}
            </NavText>
          </NavItem>
        </NavItem>
        <NavItem onClick={() => auth.signOut()}>
          <NavIcon>
            <ExitToAppIcon />
          </NavIcon>
          <NavText>Sign out</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

export default Residebar;
