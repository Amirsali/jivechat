import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { enterRoom } from "../features/appSlice";
import { db } from "../Firebase";

function SidebarOptions({ Icon, title, addChannelOption, id }) {
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
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>{title}</SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

export default SidebarOptions;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #0e630e;
  }
  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }

  :hover {
    opacity: 0.9;
    background-color: #0e630e;
  }
  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 5px;
  padding-left: 10px;
  align-items: center;
  font-weight: 300;
`;
