import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Upload from './Upload.js';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import CodeIcon from '@material-ui/icons/Code';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minWidth: "800px"
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
      <AppBar position="static" style={{backgroundColor: "#212121"}}>
        <Toolbar>
          <Upload handleImageUpload={props.handleImageUpload}/>
          <Button variant="contained" color="inherit" style={{ marginLeft: "20px", backgroundColor: "blue" }} onClick={props.handleJSONOutputClicked} startIcon={<CodeIcon />} >JSON Output</Button>
          <div className={classes.title}>
            
            <Button variant="contained" color="inherit" style={{ backgroundColor: "green"}} onClick={props.handleInteresting} startIcon={<SentimentVerySatisfiedIcon />} >Interesting</Button>
            <Button variant="contained" color="secondary" style={{ marginLeft: "20px"}} onClick={props.handleUninteresting} startIcon={<SentimentDissatisfiedIcon />} >Uninteresting</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}