import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
// import img from "assets/main.jpg";

const GlobalStyle = createGlobalStyle`
  body {
    font-size:18px;
    font-family: Roboto;
  }

  h2 {
    font-family: "Seymour One";
    margin: 5px 0 20px;
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }
  
  p {
    margin: 0;
    padding: 0;
  }

  a {
    color: unset;
    text-decoration: auto;
  }
`;

// width: 100vh;
//     background-image: url("https://phonoteka.org/uploads/posts/2021-04/1618441963_20-phonoteka_org-p-neitralnii-fon-dlya-fotoshopa-21.jpg") ;


export default GlobalStyle;

export const Styles = styled.div`
  position: relative;
  background-image: url("https://phonoteka.org/uploads/posts/2021-04/1618441963_20-phonoteka_org-p-neitralnii-fon-dlya-fotoshopa-21.jpg");
  background-size: cover;
  color: white;
  text-align: center;
  height: 826px;
  padding-top: 100px;
  @media (max-width: 768px) {
    height: 861px;
    padding-top: 25px;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
`;

export const FormStyles = styled.div`
  position: relative;
  border: 2px solid #f1f1f1;
  z-index: 5;
  padding: 25px;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
  align-items: center;
  @media (max-width: 991px) {
    width: 95%;
  }
`;

export const InputStyles = styled.input`
  margin-bottom: 15px;
  width: 245px;
`;

export const LabelStyles = styled.label`
  display: flex;
  flex-direction: column;
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
`;
