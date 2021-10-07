import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import GridExample from './components/GridExample';
import SpeedDialExample from "./components/SpeedDialExample";
import VerticalStepperExample from "./components/VerticalStepperExample";
import RpcExample from "./components/RpcExample";
import {Divider} from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Pat
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align={"center"}>
          Aloha
        </Typography>

        <GridExample/>
        <Divider />
        <VerticalStepperExample />
        <Divider />
        <RpcExample />

        <SpeedDialExample />
        <Copyright />
      </Box>
    </Container>
  );
}
