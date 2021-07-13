import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOptions from "./SidebarOptions";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
  const [user] = useAuthState(auth);
  // Pulling data from database
  const [channels, loading, error] = useCollection(db.collection("rooms"));

  return (
    <div>
      <SidebarContainer>
        <SidebarHeader>
          <SidebarInfo>
            <h2>JIVE FAM HQ</h2>
            <h3>
              <FiberManualRecordIcon />
              {user.displayName}
            </h3>
          </SidebarInfo>
          <CreateIcon />
        </SidebarHeader>

        <SidebarOptions Icon={InsertCommentIcon} title="Threads" />
        <SidebarOptions Icon={InboxIcon} title="Mentions & Reactions" />
        <SidebarOptions Icon={DraftsIcon} title="Saved items" />
        <SidebarOptions Icon={BookmarkBorderIcon} title="Channel browser" />
        <SidebarOptions Icon={PeopleAltIcon} title="People & user groups" />
        <SidebarOptions Icon={AppsIcon} title="Apps" />
        <SidebarOptions Icon={FileCopyIcon} title="File browser" />
        <SidebarOptions Icon={ExpandLessIcon} title="Show Less" />
        <hr />
        <SidebarOptions Icon={ExpandMoreIcon} title="Channels" />
        <hr />
        <SidebarOptions Icon={AddIcon} addChannelOption title="Add Channel" />
        {channels?.docs.map((doc) => (
          <SidebarOptions key={doc.id} id={doc.id} title={doc.data().name} />
        ))}
      </SidebarContainer>
    </div>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  /* display: grid;
  grid-template-rows: auto 1fr auto; */
  overflow-y: auto;
  max-height: calc(100vh - var(--offset) * 2);

  color: white;
  height: 95vh;
  width: 100vw;
  background-color: var(--slack-color);
  flex: 0.3;
  max-width: 260px;
  margin-top: 60px;
  ::-webkit-scrollbar {
    display: none;
  }
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;

    @media screen and (max-width: 480px) {
      margin-top: 3px;
      margin-bottom: 3px;
    }
  }

  @media screen and (max-width: 480px) {
    max-width: 125px;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding-bottom: 10px;
  padding: 13px;

  @media screen and (max-width: 480px) {
    padding-bottom: 5px;
    padding: 8px;
  }

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;

    @media screen and (max-width: 480px) {
      padding: 4px;
      font-size: 13px;
    }
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;

    @media screen and (max-width: 480px) {
      font-size: 12px;
      font-weight: 900;
      margin-bottom: 2px;
    }
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;

    @media screen and (max-width: 480px) {
      width: 100%;
      font-size: 11px;
      font-weight: 500;
      margin-bottom: 2px;
    }
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;

    @media screen and (max-width: 480px) {
      font-size: 10px;
      margin-top: 1px;
      margin-right: 3px;
      color: green;
    }
  }
`;
