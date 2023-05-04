import styled from "styled-components";

export const OfficerDetailStyles = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: -5px;
  border: 3px solid #dc3545;
  width: 101%;
  background: #100f0e;
  left: -5px;
  padding: 20px 20%;
  align-items: center;
  @media (max-width: 991px) {
    left: -3px;
  }
`;

export const ListOfficer = styled.ul`
  height: 280px;
  overflow-y: scroll;
`;
