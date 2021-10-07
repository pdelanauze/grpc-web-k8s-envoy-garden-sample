import * as React from 'react';
import {useState} from 'react';
import {Box, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useActions, useAppState} from "../index";

export default function RpcExample() {
  const appState = useAppState();
  const actions = useActions();

  const [command, setCommand] = useState('hostname');
  const [arg1, setArg1] = useState('');
  const [arg2, setArg2] = useState('');
  const [arg3, setArg3] = useState('');

  const handleInputChange = (e, method) => {
    method(e.target.value);
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': {m: 1, width: '25ch'},
      }}
      noValidate
      autoComplete="off">
      <TextField id="command"
                 label="Command"
                 variant="standard"
                 value={command}
                 onChange={(e) => handleInputChange(e, setCommand)}/>
      <TextField id="arg1"
                 label="Arg1"
                 value={arg1}
                 variant="standard"
                 onChange={(e) => handleInputChange(e, setArg1)}/>
      <TextField id="arg2"
                 label="Arg2"
                 value={arg2}
                 variant="standard"
                 onChange={(e) => handleInputChange(e, setArg2)}/>
      <TextField id="arg3"
                 label="Arg3"
                 value={arg3}
                 variant="standard"
                 onChange={(e) => handleInputChange(e, setArg3)}/>

      <LoadingButton variant="outlined"
                     loading={appState.isSending}
                     onClick={() => actions.sendCommandAction(command, [arg1, arg2, arg3])}>
        Send command
      </LoadingButton>

      <Typography>{appState.result}</Typography>
    </Box>
  )
}
