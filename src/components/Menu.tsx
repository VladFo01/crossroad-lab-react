import { styled, Typography } from '@mui/material';

const MyTypography = styled(Typography)`
  font-family: monospace;
  font-size: 2rem;
  font-weight: normal;
  text-align: center;
  background-color: white;
  color: black;
  border-radius: 10px;

  margin: 0;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export default function Menu({ children }) {
  return (
    <div>
      <MyTypography>OOP project - Crossroads</MyTypography>
      <br />
      <div>{children}</div>
    </div>
  );
}
