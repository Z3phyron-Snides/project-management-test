import { useDispatch } from "react-redux";
import "../styles/navbar.scss";
import { AppDispatch } from "../store/store";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from "../features/authSlice";

// type Props = {}

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <nav>
      <div className="logo">Logo</div>

      <Button onClick={() => dispatch(logout())}>
        <LogoutOutlined />
      </Button>
    </nav>
  );
};

export default Navbar;
