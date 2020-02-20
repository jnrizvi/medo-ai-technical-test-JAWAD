import React from 'react';

import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


class Upload extends React.Component {
  render() {
    return (
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
      >
        Upload File
        <input
          type="file"
          style={{ display: "none" }}
          onChange={this.props.handleImageUpload}
        />
      </Button>
    );
  }
}

export default Upload;