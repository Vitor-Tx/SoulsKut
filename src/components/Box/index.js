import styled from 'styled-components';

const Box = styled.div`
  background: #1b1a17;;
  border-radius: 2px;
  padding: 16px;
  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #2E7BB4;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
    color: #f4efde;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
    color: #f4efde;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #f4efde;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }
  input {
    width: 100%;
    background-color: #38322b;
    color: #f4efde;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 2px;
    ::placeholder {
      color: #f4efde;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #FFFFFF;
    border-radius: 2px;
    background-color: #695442;
  }
  a, .boxLink{
      color: #f4efde;
  }
`; 

export default Box