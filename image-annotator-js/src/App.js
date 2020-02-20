import React from 'react';
import './App.css';

import Upload from './components/Upload.js';
import Annotator from './components/Annotator.js';

class App extends React.Component {
  state = {
    imgData: null
  };

  handleImageUpload = (event) => {
    this.setState({
      imgData: URL.createObjectURL(event.target.files[0])
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Upload handleImageUpload={this.handleImageUpload} />
          <Annotator img={this.state.imgData}></Annotator>
          {/* <img id="resultImage" src={this.state.imgData} alt="uploaded"/> */}
        </header>
      </div>
    );
  }
}

export default App;
