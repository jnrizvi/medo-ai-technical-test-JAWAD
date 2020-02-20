import React from 'react';

import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// <Button
      //   variant="contained"
      //   type="file"
      //   color="default"
      //   className={classes.button}
      //   startIcon={<CloudUploadIcon />}
      // >
      //   Upload
      // </Button>
class Upload extends React.Component {
  render() {
    return (
      
      <div>
        <input type="file" onChange={this.props.handleImageUpload}/>
      </div>
    );
  }
}

export default Upload;