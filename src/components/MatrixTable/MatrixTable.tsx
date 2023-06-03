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

import useUIMatrix from '../../hooks/useUIMatrix';

type MatrixTableProps = {
  size: number;
};

const CellStyled = styled(TableCell)`
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid #000;
`;

const MatrixTable = ({ size }: MatrixTableProps) => {
  const matrix = useUIMatrix(size);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TableContainer component={Paper} sx={{ maxWidth: 30 * size }}>
        <Table>
          <TableBody>
            {matrix.cells.map((row, i) => (
              <TableRow key={i}>
                {row.map((_cell, j) => (
                  <CellStyled key={`${i}${j}`} id={`${i}${j}`} />
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
