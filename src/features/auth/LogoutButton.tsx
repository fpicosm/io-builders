import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Page } from "../../App";
import IoButton, { IoButtonProps } from "../../components/IoButton";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "./AuthSlice";

function LogoutButton(props: IoButtonProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(Page.LOGIN);
  };

  return (
    <IoButton {...props} onClick={handleLogout}>
      {t("user.logout")}
    </IoButton>
  );
}

export default LogoutButton;
