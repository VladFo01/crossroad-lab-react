import {
  Box,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useEffect, useRef, useMemo, useState, useCallback } from 'react';

import useUIMatrix from '../../hooks/useUIMatrix';
import ClassParser from './ClassParser.ts';
import RoadMatrix from '../../classes/roadElements/RoadMatrix.ts';
import { delay } from '../../utils/helpers/delay.ts';

type MatrixTableProps = {
  size: number;
  playSimulation: boolean;
  renderInterval: number;
};

const CellStyled = styled(TableCell)`
  width: 32px;
  height: 32px;
  padding: 0;
`;

const MatrixTable = ({ playSimulation, size, renderInterval }: MatrixTableProps) => {
  const UImatrix = useUIMatrix(size);
  const roadMatrix = useMemo(() => RoadMatrix.createOnce(size), []);
  const parser = useRef(new ClassParser(UImatrix));

  const [, updateState] = useState<object>({});
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    parser.current.parse(roadMatrix);

    let isRunning = playSimulation;

    const runSimulation = async () => {
      while (isRunning) {
        roadMatrix.makeOneIteration();
        parser.current.parse(roadMatrix);
        forceUpdate();
        await delay(renderInterval);
      }
    };

    runSimulation();

    return () => {
      isRunning = false;
      parser.current.clearClasses();
    };
  }, [playSimulation, renderInterval]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TableContainer component={Paper} sx={{ width: `${32 * size}px` }}>
        <Table>
          <TableBody>
            {UImatrix.cells.map((row, i) => (
              <TableRow key={i} sx={{ height: '32px', border: 'none' }}>
                {row.map((ref, j) => (
                  <CellStyled key={`${i}${j}`} id={`${i}${j}`} ref={ref} />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MatrixTable;
