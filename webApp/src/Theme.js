import { createMuiTheme } from '@material-ui/core/styles';

const oceanBlue = '#458fff';
const sandyBrown = '#fad7aa';
const steel = '#96a0b0';

let Theme = ({ darkMode = true }) => createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
// let Theme = ({ darkMode = true }) => createMuiTheme({
//   palette: {
//     background: {
//       default: oceanBlue,
//       paper: sandyBrown,
//     },
//     paper: {
//       background: sandyBrown,
//     },
//     primary: {
//       contrastText: sandyBrown,
//       dark: steel,
//       light: steel,
//       main: sandyBrown,
//     }
//   },
// });

export default Theme;