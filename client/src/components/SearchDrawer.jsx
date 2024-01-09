import { Close, Search } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: ${(props) =>
    props.open ? "rgb(0, 0, 0, 0.3)" : "transparent"};
  visibility: ${(props) => !props.open && "hidden"};
  z-index: 99999;
  transition: all 600ms ease-in-out;
`;

const Wrapper = styled.div`
  width: 90vw;
  max-width: 500px;
  height: 100%;
  background-color: white;
  position: absolute;
  top: 0px;
  right: ${(props) => (props.open ? "0px" : "-500px")};
  transition: all 600ms cubic-bezier(0.75, 0, 0.175, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  width: calc(100% - 60px);
  padding: 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d5dbeb;
  gap: 10px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchIcon = styled(Search)``;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 18px;
`;

const CloseIcon = styled(Close)`
  cursor: pointer;
`;

const ProductsContainer = styled.div`
  width: calc(100% - 60px);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Overlay = styled(Link)`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: all 200ms ease;
`;

const Product = styled.div`
  position: relative;

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const Info = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const Artist = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: gray;
  letter-spacing: 1px;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #7487bf;
  letter-spacing: 1px;
`;

const ButtonContainer = styled.div`
  width: calc(100% - 60px);
  padding: 0px 30px 30px 30px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #7487bf;
  border: none;
  color: white;
  letter-spacing: 2px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    background-color: #5c6c98;
  }
`;

const SearchDrawer = ({ open, setOpen }) => {
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside, true);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <Container open={open}>
      <Wrapper open={open} ref={ref}>
        <SearchContainer>
          <InputContainer>
            <SearchIcon />
            <SearchInput type="text" placeholder="What are you looking for?" />
          </InputContainer>
          <CloseIcon onClick={() => setOpen(false)} />
        </SearchContainer>
        <ProductsContainer>
          <Product>
            <Info to="/products">
              <Image src="https://kpopmerch.com/cdn/shop/files/blackpink-md-goods-blackpink-blackpink-the-game-coupon-card-35485463412917_1000x.jpg?v=1686551535" />
              <Details>
                <Artist>BLACKPINK</Artist>
                <Title>BLACKPINK - BLACKPINK The Game Coupon Card</Title>
                <Price>$11.70</Price>
              </Details>
            </Info>
            <Overlay
              to="/product/658392da5fccef89a4bb19f1"
              onClick={() => setOpen(false)}
            ></Overlay>
          </Product>
          <Product>
            <Info to="/products">
              <Image src="https://kpopmerch.com/cdn/shop/files/blackpink-md-goods-blackpink-blackpink-the-game-coupon-card-35485463412917_1000x.jpg?v=1686551535" />
              <Details>
                <Artist>BLACKPINK</Artist>
                <Title>BLACKPINK - BLACKPINK The Game Coupon Card</Title>
                <Price>$11.70</Price>
              </Details>
            </Info>
            <Overlay
              to="/product/658392da5fccef89a4bb19f1"
              onClick={() => setOpen(false)}
            ></Overlay>
          </Product>
        </ProductsContainer>
        <ButtonContainer>
          <Button onClick={() => setOpen(false)}>View All Results</Button>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default SearchDrawer;
