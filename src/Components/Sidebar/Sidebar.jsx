import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { SidebarContent } from "../SidebarContent/SidebarContent";
import { sidebarContent, sidebarFooterIcons } from "../../constants";
import toggle from "../../assets/toggle.svg";
import listIcon from "../../assets/list.svg";
import plus from "../../assets/plus.svg";
import left from "../../assets/group-left.svg";
import "./sidebar.scss";
import { redirect, replace, useNavigate } from "react-router-dom";
export const Sidebar = (props) => {
  const navigate = useNavigate();
  const [list, setList] = useState(props?.todos?.custom);
  const [listName, setListName] = useState("");
  const [isActive, setIsActive] = useState("My Day");

  const onEnter = (event) => {
    event.key == "Enter"
      ? setList([
          ...list,
          {
            name: listName,
            todos: {
              completedTodos: [],
              incompleteTodos: [],
            },
          },
        ]) & setListName("")
      : null;
  };
  useEffect(() => {
    props?.setTodos({ default: props?.todos?.default, custom: list });
  }, [list]);
  return props.sidebar ? (
    <div className="sidebar-open">
      <div className="sidebar-header">
        <div className="sidebar-toggle-button">
          <Button source={toggle} alt="" handleClick={props.handleClick} />
        </div>
      </div>
      <div className="sidebar-body">
        {sidebarContent.map((content, contentIndex) => {
          return (
            <div
              className={`${
                isActive == content?.name ? "active" : ""
              } contents`}
              key={contentIndex}
              onClick={() => {
                setIsActive(content?.name);
                navigate(`/todo/:${content?.name}`);
              }}
            >
              <SidebarContent
                contentName={content?.name}
                source={content?.icon}
                alt={content?.name}
              />
            </div>
          );
        })}
        <div className="splitter"></div>
        {list.map((list, listIndex) => {
          return (
            <div
              className={`${isActive == list.name ? "active" : ""} contents`}
              key={listIndex}
              onClick={() => {
                setIsActive(list?.name);
                navigate(`/todo/:${list?.name}`);
              }}
            >
              <SidebarContent
                contentName={list?.name}
                data={props?.todos?.custom.find(
                  (item) => item.name == list?.name
                )}
                source={listIcon}
                alt={list?.name}
              />
            </div>
          );
        })}
        <div className="add-todo">
          <div className="new-list">
            <img src={plus} width="30px" className="icon" alt="Add new list" />
            <input
              type="text"
              className="content-name"
              placeholder="New List"
              onKeyDown={onEnter}
              value={listName}
              onChange={(event) => setListName(event.target.value)}
            />
          </div>
          <div className="new-group">
            <img src={left} width="30px" className="icon" alt="" />
          </div>
        </div>
      </div>
      <div className="sidebar-footer">
        {sidebarFooterIcons.map((icon, footerIconIndex) => {
          return (
            <div className="icon" key={footerIconIndex}>
              <Button
                source={icon}
                alt={"wei"}
                handleClick={() => console.log("clicked")}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
};
