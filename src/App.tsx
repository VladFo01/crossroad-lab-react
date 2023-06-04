import { Button, Container, styled } from '@mui/material';

import MatrixTable from './components/MatrixTable/MatrixTable';

const MyButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  border-radius: 10px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  color: white;
  height: 3rem;
`;

const MyContainer = styled(Container)`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const App = () => {
  return (
    <>
      <MyContainer>
        <MyButton>OOP project - Crossroad</MyButton>
      </MyContainer>
      <MatrixTable size={20} />
    </>
  );
};

export default App;
