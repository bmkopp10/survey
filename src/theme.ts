import {createTheme} from "@mui/material";
import {orange, purple} from "@mui/material/colors";

export const darkPurple = '#2B2351'

export const theme = createTheme({
    palette: {
        primary: purple,
        secondary: orange,
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'standard'
            }
        },
        MuiFormControl: {
            defaultProps: {
                variant: 'standard'
            }
        },
        MuiSelect: {
            defaultProps: {
                variant: 'standard'
            }
        },
        MuiButton: {
            defaultProps: {
                variant: 'contained',
                disableElevation: true,
                disableRipple: true,
            },
        },
    },
});
