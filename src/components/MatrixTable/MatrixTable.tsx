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
import { useEffect } from 'react';

import useUIMatrix from '../../hooks/useUIMatrix';

type MatrixTableProps = {
  size: number;
};

const CellStyled = styled(TableCell)`
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid #000;
`;

const MatrixTable = ({ size }: MatrixTableProps) => {
  const matrix = useUIMatrix(size);

  useEffect(() => {
    console.log(matrix.cells);
  }, [matrix.getCell(0, 0)?.current]);

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
            {matrix.cells.map((row, i) => (
              <TableRow key={i}>
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
