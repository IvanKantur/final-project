import styled from "styled-components";

export const ReportDetailStyles = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: -5px;
  border: 3px solid #dc3545;
  width: 101%;
  padding: 0 60px;
  background: #100f0e;
  left: -5px;
  @media (max-width: 991px) {
    left: -3px;
  }
`;

export const LabelStyles = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ListMessages = styled.ul`
  height: 350px;
  overflow-y: scroll;
`;

export const TextareaStyles = styled.textarea`
  height: 100px;
  resize: none;
`;
