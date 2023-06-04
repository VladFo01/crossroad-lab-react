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
import { useEffect, useRef } from 'react';

import useUIMatrix from '../../hooks/useUIMatrix';
import ClassParser from './ClassParser.ts';
import RoadMatrix from '../../classes/roadElements/RoadMatrix.ts';

type MatrixTableProps = {
  roadMatrix: RoadMatrix;
  size: number;
};

const CellStyled = styled(TableCell)`
  width: 32px;
  height: 32px;
  padding: 0;
`;

const MatrixTable = ({ roadMatrix, size }: MatrixTableProps) => {
  const matrix = useUIMatrix(size);
  const parser = useRef(new ClassParser(matrix));

  useEffect(() => {
    parser.current.parse(roadMatrix);
    return () => parser.current.clearClasses();
  });

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
            {matrix.cells.map((row, i) => (
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
