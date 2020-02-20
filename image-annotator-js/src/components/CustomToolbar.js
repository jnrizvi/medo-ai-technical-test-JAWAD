import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Upload from './Upload.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: "flex-end"
  },
}));

export default function CustomToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Upload handleImageUpload={props.handleImageUpload}/>
          <div className={classes.title}>
            <Button color="inherit" onClick={props.handleInteresting} >Interesting</Button>
            <Button color="inherit" onClick={props.handleUninteresting} >Uninteresting</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}