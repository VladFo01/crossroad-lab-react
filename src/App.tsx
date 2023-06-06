import { Box, Button, Container, Input, Typography, styled } from '@mui/material';

import MatrixTable from './components/MatrixTable/MatrixTable';
import Menu from './components/Menu.tsx';
import { matrixSize } from './utils/constants/matrixSize.ts';
import { useState } from 'react';

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
  const [playSimulation, setPlaySimulation] = useState(false);
  const [renderFPS, setRenderFPS] = useState(10);

  const handleStart = () => {
    setPlaySimulation(true);
  };

  const handleReset = () => {
    setPlaySimulation(false);
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value > 20) setRenderFPS(20);
    else if (value < 1) setRenderFPS(1);
    else setRenderFPS(value);
  };

  return (
    <MyContainer>
      <Menu>
        <Box
          sx={{
            display: 'flex',
            columnGap: '15px',
          }}
        >
          <MyButton onClick={handleStart}>Start simulation</MyButton>
          <MyButton onClick={handleReset}>Stop</MyButton>
          <MyButton onClick={() => window.location.reload()}>Reset</MyButton>
        </Box>
        <Box
          sx={{
            marginTop: '20px',
          }}
        >
          <Typography fontSize="16px">FPS:</Typography>
          <Input
            type="number"
            value={renderFPS}
            placeholder="FPS"
            onChange={handleIntervalChange}
          />
        </Box>
      </Menu>
      <MatrixTable
        playSimulation={playSimulation}
        size={matrixSize}
        renderInterval={1000 / renderFPS}
      />
    </MyContainer>
  );
};

export default App;
