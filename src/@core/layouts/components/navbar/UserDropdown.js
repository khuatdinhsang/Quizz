// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { isUserLoggedIn } from "@utils";

// ** Store & Actions
import { useDispatch } from "react-redux";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { handleLogout } from "@redux/authentication";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ** State
  const [userData, setUserData] = useState(null);
  const [openLogout, setOpenLogout] = useState(false);
  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, []);
  const handleOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };
  const handleLogoutAccount = () => {
    navigate('/login')
    dispatch(handleLogout())
  }
  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar;

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {(userData && userData.fullName)}
          </span>
          {/* <span className="user-status">
            {(userData && userData.role) || "Developer"}
          </span> */}
        </div>
        <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/pages/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        {/* <DropdownItem tag={Link} to='/apps/email'>
          <Mail size={14} className='me-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
         */}
        <DropdownItem
          onClick={handleOpenLogout}
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
      <Dialog
        open={openLogout}
        onClose={handleCloseLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn muốn đăng xuất khỏi hệ thống?"}
        </DialogTitle>
        <DialogActions>
          <Button style={{ backgroundColor: 'red', color: 'white', borderRadius: '3px' }} onClick={handleCloseLogout}>Hủy</Button>
          <Button style={{ backgroundColor: 'blue', color: 'white', borderRadius: '3px' }} className="button-save-update" onClick={handleLogoutAccount} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
