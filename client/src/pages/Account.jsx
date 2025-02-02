import {
  LogoutOutlined,
  ManageAccountsOutlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { mobile, md } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "../redux/cartApi";
import { deleteCart } from "../redux/cartSlice";
import { logout } from "../redux/authSlice";

const Container = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  ${md({ flexDirection: "column" })}
`;

const Nav = styled.div`
  padding: 20px 10px 20px 30px;
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  ${md({
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    padding: "20px 0px",
  })}
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  transition: all 300ms ease-in-out;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #f8f8f8;
  }
`;

const Icon = styled(SvgIcon)`
  ${mobile({
    height: "20px !important",
    width: "20px !important",
  })}
`;

const ItemTitle = styled.span``;

const Content = styled.div`
  max-width: 560px;
  width: 100%;
  padding: 20px;

  ${md({
    maxWidth: "calc(100% - 40px)",
    width: "calc(100% - 40px)",
  })}
`;

const Account = () => {
  const userId = useSelector((state) => state.auth.currentUser?._id);
  const storeCart = useSelector((state) => state.cart.products);
  const { data: cartData } = useGetCartQuery(userId);
  const [createCart] = useCreateCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    let products;
    if (storeCart.length > 0) {
      products = storeCart.map(({ _id, quantity }) => ({
        product: _id,
        quantity,
      }));
    } else {
      products = [];
    }
    await (cartData
      ? updateCart({ id: userId, data: { products } })
      : createCart({ userId, products }));
    dispatch(deleteCart());
    dispatch(logout());
  };

  return (
    <Container>
      <Nav>
        <NavItem to="/account" end>
          <Icon component={ManageAccountsOutlined} />
          <ItemTitle>My Account</ItemTitle>
        </NavItem>
        <NavItem to="/account/orders">
          <Icon component={ReceiptLongOutlined} />
          <ItemTitle>My Orders</ItemTitle>
        </NavItem>
        <NavItem to="/" onClick={handleLogout}>
          <Icon component={LogoutOutlined} />
          <ItemTitle>Logout</ItemTitle>
        </NavItem>
      </Nav>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default Account;
