import React, { useState } from "react";
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
} from "react-icons/fa6";
import "./SideNavBar.css";
import "../../Utility/Utility.css";
import { NavLink, Link, Outlet } from "react-router-dom";

const SideNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [];

  // Conditional Based Routing

  if (props.role.includes("Doctor")) {
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
      }
    );
  } else if (props.role.includes("Receptionist")) {
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
      }
    );
  } else if (props.role.includes("Nurse")) {
    menuItem.push({
      path: "/billing",
      name: "Billing",
      icon: <FaFileInvoice />,
    });
  } else if (props.role.includes("Laboratory")) {
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
  } else if (props.role.includes("Medical")) {
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
  } else if (props.role.includes("Admin")) {
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
  } else {
  }

  const closeSidebar = () => {
    if (isOpen) {
      setIsOpen(false);
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
        <div className="d-flex justify-content-lg-center align-items-center justify-content-sm-center">
          <FaBell className="m-3 text-white" style={{ cursor: "pointer" }} />
          <h6 className="text-white text-uppercase mt-2">USER: Manoj</h6>
          <Link to={"/"}>
            <button className="btn btn-primary m-4">Logout</button>
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
        {menuItem.map((item, index) => (
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
      {/* <main
        style={{ zIndex: 1, backdropFilter: isOpen ? "darken" : "" }}
        onClick={closeSidebar}
      >
        {children}
      </main> */}

      <main onClick={closeSidebar}>
        <Outlet />
      </main>
    </div>
  );
};

export default SideNavBar;
