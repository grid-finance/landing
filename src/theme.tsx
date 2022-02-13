import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#232426',
    },
    secondary: {
      main: '#2B60BF',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
