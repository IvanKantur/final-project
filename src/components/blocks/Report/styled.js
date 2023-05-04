import styled from "styled-components";

export const TextareaStyles = styled.textarea`
  margin-bottom: 15px;
  width: 245px;
  height: 100px;
  resize: none;
`;

export const ReportAuthDetailStyles = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: -5px;
  border: 3px solid #dc3545;
  width: 101%;
  z-index: 5;
  background: #100f0e;
  left: -5px;
  padding: 20px 20%;
  align-items: center;
  @media (max-width: 991px) {
    left: -3px;
  }
`;
