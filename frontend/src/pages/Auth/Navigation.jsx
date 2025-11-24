import "./Navigation.css";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { apiSlice } from "../../redux/api/apiSlice";
import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(apiSlice.util.resetApiState());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <MobileNavigation userInfo={userInfo} logoutHandler={logoutHandler} />
      <DesktopNavigation userInfo={userInfo} logoutHandler={logoutHandler} />
    </div>
  );
};

export default Navigation;
