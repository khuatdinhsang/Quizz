// ** React Imports
import { Fragment } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Bell, X, Check, AlertTriangle } from "react-feather";

// ** Reactstrap Imports
import {
  Button,
  Badge,
  Input,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const NotificationDropdown = () => {
  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component="li"
        className="media-list scrollable-container"
        options={{
          wheelPropagation: false,
        }}
      >
        No Data
      </PerfectScrollbar>
    );
  };
  /*eslint-enable */

  return (
    <UncontrolledDropdown
      tag="li"
      className="dropdown-notification nav-item me-25"
    >
      <DropdownToggle
        tag="a"
        className="nav-link"
        href="/"
        onClick={(e) => e.preventDefault()}
      >
        <Bell size={21} />
        {/* <Badge pill color="danger" className="badge-up">
          5
        </Badge> */}
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem className="d-flex" tag="div" header>
            <h4 className="notification-title mb-0 me-auto">Notifications</h4>
            {/* <Badge tag="div" color="light-primary" pill>
              6 New
            </Badge> */}
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        <li className="dropdown-menu-footer">
          <Button color="primary" block>
            Read all notifications
          </Button>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NotificationDropdown;
