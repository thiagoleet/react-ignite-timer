import { HeaderContainer } from "./styles";
import logoIgnite from "../../assets/logo-ignite.svg";
import { Scroll, Timer } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <HeaderContainer>
      <img
        src={logoIgnite}
        alt=""
      />
      <nav>
        <NavLink
          to="/"
          title="Início"
        >
          <Timer size={24} />
        </NavLink>
        <NavLink
          to="/history"
          title="Histórico"
        >
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
