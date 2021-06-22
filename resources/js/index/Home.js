import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./Home.css";
import "./menu.js";
import moment from "moment";
import { set } from "lodash";
import { useHistory } from "react-router-dom";

function Home() {

  const history = useHistory();
    const token = localStorage.getItem("@Token");
    const username = localStorage.getItem("@Username");
    const userId = localStorage.getItem("@UserId");
    const [Users, setUsers] = useState([]);
    
    const [Conversation, setConversation] = useState([]);
    const [UserSelectNew, setUserSelectNew] = useState(null);
    const [UserSelectConv, setUserSelectConv] = useState(null);

    const [Messages, setMessages] = useState([]);
    const [sendMessages, setSendMessages] = useState([]);
    
    const getUsers = () => {
        const token = localStorage.getItem("@Token");
        axios({
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: "http://127.0.0.1:8000/api/auth/users/",
        })
            .then(({ data }) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error("Error : ", error);
            });
    };
    const getConversation = () => {
        const token = localStorage.getItem("@Token");
        axios({
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: "http://127.0.0.1:8000/api/auth/chats",
            data: {
                user_id: userId,
            },
        })
            .then(({ data }) => {
                setConversation(data.content);
            })
            .catch((error) => {
                console.error("Error : ", error);
            });
    };

    const selectUserNew = (props) => {
        setUserSelectNew(props);
       
       
        $(".side-two").css({
          left: "-100%",
      });
    };
    console.log(UserSelectNew);
    const chooseUser = (props) => {
        $(".side-two").css({
            left: "0",
        });
    };

    const selectUserConv = (props) => {
        getmessage(props);
        setUserSelectConv(props);
    };
    const getmessage = (props) => {
        const token = localStorage.getItem("@Token");
        axios({
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: "http://127.0.0.1:8000/api/auth/message",
            data: {
                conversation_id: props.id_conversation,
            },
        })
            .then(({ data }) => {
                setMessages(data.content);
            })
            .catch((error) => {
                console.error("Error : ", error);
            });
    };
    const handleChat = (e) => {
        setSendMessages(e.target.value);
    };
    const sendChat = (props) => {
        const token = localStorage.getItem("@Token");
        if(UserSelectNew!==null){
         
          axios({
              method: "POST",
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              url: "http://127.0.0.1:8000/api/auth/conversation",
              data: {
                  user_id_1: userId,
                  user_id_2: UserSelectNew.id
              },
          })
              .then(({ data }) => {
                axios({
                  method: "POST",
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
                  url: "http://127.0.0.1:8000/api/auth/send",
                  data: {
                      conversation_id:data.content.id,
                      user_id: userId,
                      body: sendMessages,
                  },
                  })
                  .then(({ data }) => {
                    window.location.reload();
                      history.push("/");
                  })
                  .catch((error) => {
                      console.error("Error : ", error);
                  });
                
              })
              .catch((error) => {
                  console.error("Error : ", error);
              });
          }
          if(UserSelectConv!==null){
            axios({
              method: "POST",
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              url: "http://127.0.0.1:8000/api/auth/send",
              data: {
                  conversation_id:
                      UserSelectConv && UserSelectConv.id_conversation,
                  user_id: userId,
                  body: sendMessages,
              },
              })
              .then(({ data }) => {
                  selectUserConv(UserSelectConv);
              })
              .catch((error) => {
                  console.error("Error : ", error);
              });
          }
        
    };
    const logoutClick = (props) => {
      localStorage.removeItem("@Token");
      localStorage.removeItem("@Username");
      localStorage.removeItem("@UserId");
      
      history.push("/login");
      // axios({
      //     method: "POST",
      //     headers: {
      //         Authorization: `Bearer ${token}`,
      //     },
      //     url: "http://127.0.0.1:8000/api/auth/logout",
         
      // })
      //     .then(({ data }) => {
      //       history.push("/login");
      //     })
      //     .catch((error) => {
      //         console.error("Error : ", error);
      //     });
  };
  
    useEffect(() => {
        getUsers();
        getConversation();
        return () => {
            setUsers([]);
            setConversation([]);
            setMessage([]);
        };
    }, []);

    return (
        <React.Fragment>
            <button type="button" style={{ float: "right", backgroundColor: "black" }} onClick={()=>{logoutClick()}}>
                Logout
            </button>
            <div className="container app">
                <div className="row app-one">
                    <div className="col-sm-4 side">
                        <div className="side-one">
                            <div className="row heading">
                                <div className="col-sm-3 col-xs-3 heading-avatar">
                                    <div className="heading-avatar-icon">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                                    </div>
                                </div>
                                <div className="col-sm-1 col-xs-1 heading-dot pull-right">
                                    <i
                                        className="fa fa-ellipsis-v fa-2x pull-right"
                                        aria-hidden="true"
                                    ></i>
                                </div>
                                <div className="col-sm-2 col-xs-2 heading-compose pull-right">
                                    <i
                                        className="fa fa-comments fa-2x pull-right"
                                        aria-hidden="true"
                                        onClick={() => {
                                            chooseUser();
                                        }}
                                    ></i>
                                </div>
                            </div>

                            <div className="row searchBox">
                                <div className="col-sm-12 searchBox-inner">
                                    <div className="form-group has-feedback">
                                        <input
                                            id="searchText"
                                            type="text"
                                            className="form-control"
                                            name="searchText"
                                            placeholder="Search"
                                        />
                                        <span className="glyphicon glyphicon-search form-control-feedback"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="row sideBar">
                                {Conversation.map((value) => {
                                    return (
                                        <div
                                            className="col-m-9 col-m-9 sideBar-main"
                                            key={value.id}
                                            onClick={() => {
                                                selectUserConv(value);
                                            }}
                                        >
                                            <div className="row sideBar-body">
                                                <div className="col-sm-3 col-xs-3 sideBar-avatar">
                                                    <div className="avatar-icon">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-8 col-xs-8 sideBar-name">
                                                        <span className="name-meta">
                                                            {value.name}
                                                        </span>
                                                    </div>
                                                    <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                                                        <span className="time-meta pull-right">
                                                            {moment(
                                                                value.login_at
                                                            ).format("HH:MM")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="side-two">
                            <div className="row newMessage-heading">
                                <div className="row newMessage-main">
                                    <div className="col-sm-2 col-xs-2 newMessage-back">
                                        <i
                                            className="fa fa-arrow-left"
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                    <div className="col-sm-10 col-xs-10 newMessage-title">
                                        New Chat
                                    </div>
                                </div>
                            </div>

                            <div className="row composeBox">
                                <div className="col-sm-12 composeBox-inner">
                                    <div className="form-group has-feedback">
                                        <input
                                            id="composeText"
                                            type="text"
                                            className="form-control"
                                            name="searchText"
                                            placeholder="Search People"
                                        />
                                        <span className="glyphicon glyphicon-search form-control-feedback"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="row compose-sideBar">
                                {Users &&
                                    Users.map((value) => {
                                        if (+value.id !== +userId) {
                                            return (
                                                <div
                                                    className="row sideBar-body newMessage-back"
                                                    key={value.id}
                                                    onClick={() => {
                                                        selectUserNew(value);
                                                    }}
                                                >
                                                    <div className="col-sm-3 col-xs-3 sideBar-avatar">
                                                        <div className="avatar-icon">
                                                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-9 col-xs-9 sideBar-main">
                                                        <div className="row">
                                                            <div className="col-sm-8 col-xs-8 sideBar-name">
                                                                <span className="name-meta">
                                                                    {value.name}
                                                                </span>
                                                            </div>
                                                            <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                                                                <span className="time-meta pull-right">
                                                                    {value.is_login ===
                                                                    1
                                                                        ? "Online"
                                                                        : moment(
                                                                              value.login_at
                                                                          ).format(
                                                                              "HH:MM"
                                                                          )}{" "}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-8 conversation">
                        <div className="row heading">
                            <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                                <div className="heading-avatar-icon">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" />
                                </div>
                            </div>
                            <div className="col-sm-8 col-xs-7 heading-name">
                                {UserSelectConv ? (
                                    <>
                                        <a className="heading-name-meta">
                                            {UserSelectConv &&
                                                UserSelectConv.name}{" "}
                                        </a>
                                        <span className="heading-online">
                                            {" "}
                                            {UserSelectConv.is_login === 1
                                                ? "Online"
                                                : UserSelectConv &&
                                                  UserSelectConv.login_at}
                                        </span>
                                    </>
                                ) : (
                                    <></>
                                )}
                                 {UserSelectNew ? (
                                    <>
                                        <a className="heading-name-meta">
                                            {UserSelectNew &&
                                                UserSelectNew.name}{" "}
                                        </a>
                                        <span className="heading-online">
                                            {" "}
                                            {UserSelectNew.is_login === 1
                                                ? "Online"
                                                : UserSelectNew &&
                                                UserSelectNew.login_at}
                                        </span>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="col-sm-1 col-xs-1 heading-dot pull-right">
                                <i
                                    className="fa fa-ellipsis-v fa-2x pull-right"
                                    aria-hidden="true"
                                ></i>
                            </div>
                        </div>

                        <div className="row message" id="conversation">
                            {Messages &&
                                Messages.map((value) => {
                                    if (value.user_id * 1 === userId * 1) {
                                        return (
                                            <div
                                                className="row message-body"
                                                key={value.id}
                                            >
                                                <div className="col-sm-12 message-main-sender">
                                                    <div className="sender">
                                                        <div className="message-text">
                                                            {value.body}
                                                        </div>
                                                        <span className="message-time pull-right"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    if (value.user_id * 1 !== userId * 1) {
                                        return (
                                            <div
                                                className="row message-body"
                                                key={value.id}
                                            >
                                                <div className="col-sm-12 message-main-receiver">
                                                    <div className="receiver">
                                                        <div className="message-text">
                                                            {value.body}
                                                        </div>
                                                        <span className="message-time pull-right">
                                                            Sun
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                        </div>

                        <div className="row reply">
                            <div className="col-sm-1 col-xs-1 reply-emojis">
                                <i className="fa fa fa-2x"></i>
                            </div>
                            <div className="col-sm-9 col-xs-9 reply-main">
                                <textarea
                                    className="form-control"
                                    rows="1"
                                    id="comment"
                                    onChange={(e) => {
                                        handleChat(e);
                                    }}
                                ></textarea>
                            </div>
                            <div className="col-sm-1 col-xs-1 reply-recording">
                                <i
                                    className="fa fa fa-2x"
                                    aria-hidden="true"
                                ></i>
                            </div>
                            <div className="col-sm-1 col-xs-1 reply-send">
                                <i
                                    className="fa fa-send fa-2x"
                                    aria-hidden="true"
                                    onClick={(e) => {
                                        sendChat();
                                    }}
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Home;

if (document.getElementById("app")) {
    ReactDOM.render(<Home />, document.getElementById("app"));
}
