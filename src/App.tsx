import { Button, Container, styled } from '@mui/material';

import RoadMatrix from './classes/roadElements/RoadMatrix.ts';
import MatrixTable from './components/MatrixTable/MatrixTable';
import Menu from './components/Menu.tsx';
import { matrixSize } from './utils/constants/matrixSize.ts';

const MyButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  border-radius: 10px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  color: white;
  height: 3rem;
`;

const MyContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  text-align: center;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const App = () => {
  return (
    <>
      <MyContainer>
        <Menu>
          <MyButton>Start simulation</MyButton>
        </Menu>
        <MatrixTable size={matrixSize} roadMatrix={RoadMatrix.createOnce(matrixSize)} />
      </MyContainer>
    </>
  );
};

export default App;
