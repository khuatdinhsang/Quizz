// ** React Imports
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";

// ** Third Party Components
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  Facebook,
  Twitter,
  Mail,
  GitHub,
  HelpCircle,
  Coffee,
  X,
} from "react-feather";

// ** Actions

//** Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Custom Components
import Avatar from "@components/avatar";
import InputPasswordToggle from "@components/input-password-toggle";

//** Utils
import { getHomeRouteForLoggedInUser } from "@utils";

import "./style.scss";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  UncontrolledTooltip,
} from "reactstrap";

//** Styles
import "@styles/react/pages/page-authentication.scss";
import { handleLogin } from "@redux/authentication";
import logoName from "@src/assets/images/logo/ais-logo-name.png";
import { Box, Grid, TextField } from "@mui/material";
import { login } from "@src/@core/api/loginApi";

const ToastContent = ({ t, name }) => {
  return (
    <div className="d-flex">
      <div className="me-1">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h6>Xin chào {name}!</h6>
          <X
            size={12}
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logo_login =
    require(`@src/assets/images/aisolutions/logo_login.png`).default;
  const logo_name =
    require(`@src/assets/images/aisolutions/logo_name.png`).default;
  const onSubmit = (data) => {
    setLoading(true);
    login({ username: data.loginEmail, password: data.password })
      .then((res) => {
        dispatch(handleLogin(res?.data));
        navigate("/home");
        toast((t) => (
          <ToastContent t={t} name={res.data.data.accountInfo.fullName} />
        ));
        
      })
      .catch((err) => {
        if (err.request.status === 400) {
          toast.error("Tên đăng nhập hoặc mật khẩu không đúng");
        } else if (err.request.status === 500) {
          toast.error("Không có phản hồi từ máy chủ");
        } else {
          toast.error("Không thể kết nối tới máy chủ");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box className="box-login-page">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box className="box-group-icon">
            <img
              src={logo_login}
              alt=""
              width={191}
              height={191}
              style={{ marginBottom: "48px" }}
            />
            <img src={logo_name} alt="" width={253} height={26} />
            <div>AI for the better life</div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="box-input">
            <p>Đăng nhập</p>
            <Form
              style={{ padding: " 0 30px" }}
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Controller
                  id="loginEmail"
                  name="loginEmail"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      require="true"
                      type="email"
                      placeholder="john@example.com"
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      require="true"
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div>
              <Button type="submit" color="primary" block>
                Sign in
              </Button>
            </Form>

            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "-10px",
              }}
              className="text-center mt-2"
            >
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div
              style={{ width: "60%", margin: " 30px auto" }}
              className="auth-footer-btn d-flex justify-content-around"
            >
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
