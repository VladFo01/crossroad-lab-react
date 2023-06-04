import '../../appearance/styles.css';

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
import { useEffect, useRef, useState } from 'react';

import RoadMatrix from '../../classes/roadElements/RoadMatrix.ts';
import ClassParser from './ClassParser.ts';
import useUIMatrix from '../../hooks/useUIMatrix';

type MatrixTableProps = {
  roadMatrix: RoadMatrix;
  size: number;
};

export const CellStyled = styled(TableCell)`
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid #000;
`;

const MatrixTable = ({ roadMatrix, size }: MatrixTableProps) => {
  const matrix = useUIMatrix(size);
  const parserRef = useRef(new ClassParser(matrix));

  useEffect(() => {
    parserRef.current.parse(roadMatrix);

    return () => parserRef.current.clearClasses();
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TableContainer component={Paper} sx={{ maxWidth: 32 * size }}>
        <Table>
          <TableBody>
            {matrix.UIBoard().map((row, i) => (
              <TableRow key={i}>
                {row.map((uicell, j) => (
                  <CellStyled
                    key={`${i}${j}`}
                    id={`${i}${j}`}
                    className={uicell && uicell.current ? uicell.current.className : 'grass'}
                  />
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
