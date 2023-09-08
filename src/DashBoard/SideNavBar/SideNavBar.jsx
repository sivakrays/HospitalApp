import React, { useContext, useState } from "react";
import {
  FaBars,
  FaBriefcaseMedical,
  FaUserPlus,
  FaHospitalUser,
  FaXmark,
  FaFileMedical,
  FaBed,
  FaCalendarDays,
  FaFileInvoice,
  FaUsers,
  FaVialCircleCheck,
  FaUserDoctor,
  FaUserLock,
  FaBell,
  FaGear,
} from "react-icons/fa6";
import "./SideNavBar.css";
import "../../Utility/Utility.css";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";

const SideNavBar = (props) => {
  const { currentUser, logout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [SettingClicked, setSettingClick] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [];

  // Conditional Based Routing

  {
    props.role.includes("Doctor") &&
      menuItem.push(
        {
          path: "/DoctorView",
          name: "Doctor",
          icon: <FaUserDoctor />,
        },
        {
          path: "/patients",
          name: "Patients",
          icon: <FaBed />,
        },
        {
          path: "/reports",
          name: "Reports",
          icon: <FaFileMedical />,
        },
        {
          path: "/filterPatients",
          name: "FilterPatients",
          icon: <FaUsers />,
        },
      );
  }
  {
    props.role.includes("Receptionist") &&
      menuItem.push(
        {
          path: "/addpatients",
          name: "AddPatients",
          icon: <FaHospitalUser />,
        },
        {
          path: "/appointment",
          name: "Appointment",
          icon: <FaCalendarDays />,
        },
        {
          path: "/filterPatients",
          name: "FilterPatients",
          icon: <FaUsers />,
        }
      );
  }
  {
    props.role.includes("Nurse") &&
      menuItem.push(
        {
          path: "/billing",
          name: "Billing",
          icon: <FaFileInvoice />,
        },
        {
          path: "/filterPatients",
          name: "FilterPatients",
          icon: <FaUsers />,
        }
      );
  }
  {
    props.role.includes("Laboratory") &&
      menuItem.push(
        {
          path: "/lab",
          name: "Lab",
          icon: <FaVialCircleCheck />,
        },
        {
          path: "/filterPatients",
          name: "FilterPatients",
          icon: <FaUsers />,
        }
      );
  }

  {
    props.role.includes("Medical") &&
      menuItem.push(
        {
          path: "/medical",
          name: "Medical",
          icon: <FaBriefcaseMedical />,
        },
        {
          path: "/billing",
          name: "Billing",
          icon: <FaFileInvoice />,
        },
        {
          path: "/filterPatients",
          name: "FilterPatients",
          icon: <FaUsers />,
        }
      );
  }

  {
    props.role.includes("Admin") &&
      menuItem.push(
        {
          path: "/DoctorView",
          name: "Doctor",
          icon: <FaUserDoctor />,
        },
        {
          path: "/addpatients",
          name: "AddPatients",
          icon: <FaHospitalUser />,
        },
        {
          path: "/appointment",
          name: "Appointment",
          icon: <FaCalendarDays />,
        },
        {
          path: "/patients",
          name: "Patients",
          icon: <FaBed />,
        },
        {
          path: "/adduser",
          name: "AddUser",
          icon: <FaUserPlus />,
        },
        {
          path: "/filterPatients",
          name: "FilterPatients",
          icon: <FaUsers />,
        },
        {
          path: "/medical",
          name: "Medical",
          icon: <FaBriefcaseMedical />,
        },
        {
          path: "/lab",
          name: "Lab",
          icon: <FaVialCircleCheck />,
        },
        {
          path: "/reports",
          name: "Reports",
          icon: <FaFileMedical />,
        },
        {
          path: "/billing",
          name: "Billing",
          icon: <FaFileInvoice />,
        },
        {
          path: "/Admin",
          name: "Admin",
          icon: <FaUserLock />,
        }
      );
  }

  function removeDuplicates(arr) {
    const uniqueItems = [];
    const seenNames = new Set();

    for (const item of arr) {
      if (!seenNames.has(item.name)) {
        uniqueItems.push(item);
        seenNames.add(item.name);
      }
    }

    return uniqueItems;
  }

  const uniqueMenuItem = removeDuplicates(menuItem);

  const closeSidebar = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleSettings = () => {
    setSettingClick(true);
    console.log(SettingClicked);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="sideNav" style={{ position: "relative", height: "100vh" }}>
      <div
        className="topBar d-flex justify-content-between align-items-center"
        style={{
          height: "60px",
          width: "100%",
          backgroundColor: "var(--color-sidebar)",
          position: "fixed",
          top: 0,
          zIndex: 4,
          padding: "0 20px",
        }}
      >
        <div></div>
        <div className="settingIcon" onClick={handleSettings}>
          <FaGear className="text-white" />
        </div>
        <div className="d-flex justify-content-lg-center align-items-center justify-content-center onlymobile">
          <FaBell className="m-3 text-white" style={{ cursor: "pointer" }} />
          <h6 className="text-white text-uppercase mt-2">
            USER: {currentUser.userName}
          </h6>
          <Link to={"/"}>
            <button className="btn btn-primary m-4" onClick={handleLogout}>
              Logout
            </button>
          </Link>
        </div>
      </div>

      <div
        className="sidebar"
        style={{
          width: isOpen ? "250px" : "50px",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 5,
        }}
      >
        <div className="top__section">
          <h1 className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <Link
              to="/"
              className="sideBar__logo"
              style={{ textDecoration: "none", color: "white" }}
            >
              ABC
            </Link>
          </h1>
          <div className="bars" style={{ marginLeft: isOpen ? "65px" : "0" }}>
            {!isOpen ? (
              <FaBars onClick={toggle} className="bar__icon" />
            ) : (
              <FaXmark
                className="bar__icon"
                onClick={toggle}
                style={{ marginLeft: isOpen ? "3rem" : "" }}
              />
            )}
          </div>
        </div>
        {uniqueMenuItem &&
          uniqueMenuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link "
              activeclassname="active"
              style={{ textDecoration: "none" }}
            >
              <div
                className="icon"
                style={{ margin: !isOpen ? "0rem -0.2rem" : "" }}
                data-toggle="tooltip"
                title={item.name}
              >
                {item.icon}
              </div>
              <div
                className="link__text"
                style={{ display: isOpen ? "block" : "none" }}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
      </div>
      <main onClick={closeSidebar}>
        <Outlet />
      </main>
    </div>
  );
};

export default SideNavBar;
