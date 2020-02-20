import React from 'react';
import { Stage, Layer } from 'react-konva';
import shortid from 'shortid';

import Upload from '../components/Upload.js';
import Rectangle from './Rectangle/Rectangle';
import RectTransformer from './Rectangle/RectTransformer';
import AnnotationImage from './AnnotationImage/AnnotationImage';
import './App.css';

class App extends React.Component {
  state = {
    rectangles: [],
    rectCount: 0,
    selectedShapeName: '',
    mouseDown: false,
    mouseDraw: false,
    newRectX: 0,
    newRectY: 0,
    imgData: null,
    strokePrimary: "green",
    strokeSecondary: "lightgreen"
  };

  componentDidMount() {
    this.img.moveToBottom();
  }

  handleStageMouseDown = (event) => {
    const { rectangles } = this.state;
    // clicked on stage - clear selection or ready to generate new rectangle
    if (event.target.className === 'Image') {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      this.setState({
        mouseDown: true,
        newRectX: mousePos.x,
        newRectY: mousePos.y,
        selectedShapeName: '',
      });
      return;
    }
    // clicked on transformer - do nothing
    if (event.target.getParent()) {
      const clickedOnTransformer = event.target.getParent().className === 'Transformer';
        if (clickedOnTransformer) {
          return;
        }
    }
    

    // find clicked rect by its name
    const name = event.target.name();
    const rect = rectangles.find(r => r.name === name);
    if (rect) {
      this.setState({
        selectedShapeName: name,
        rectangles,
      });
    } else {
      this.setState({
        selectedShapeName: '',
      });
    }
  };

  handleRectChange = (index, newProps) => {
    const { rectangles } = this.state;
    rectangles[index] = {
      ...rectangles[index],
      ...newProps,
    };

    this.setState({ rectangles });
  };

  handleNewRectChange = (event) => {
    const {
      rectangles, rectCount, newRectX, newRectY,
    } = this.state;
    const stage = event.target.getStage();
    const mousePos = stage.getPointerPosition();
    if (!rectangles[rectCount]) {
      rectangles.push({
        x: newRectX,
        y: newRectY,
        width: mousePos.x - newRectX,
        height: mousePos - newRectY,
        name: `rect${rectCount + 1}`,
        strokes: [this.state.strokePrimary, this.state.strokeSecondary],
        key: shortid.generate(),
      });
      return this.setState({ rectangles, mouseDraw: true });
    }
    rectangles[rectCount].width = mousePos.x - newRectX;
    rectangles[rectCount].height = mousePos.y - newRectY;
    return this.setState({ rectangles });
  };

  handleStageMouseUp = () => {
    const { rectCount, mouseDraw } = this.state;
    if (mouseDraw) {
      this.setState({ rectCount: rectCount + 1, mouseDraw: false });
    }
    this.setState({ mouseDown: false });
  };

  handleImageUpload = (event) => {
    this.setState({
      imgData: URL.createObjectURL(event.target.files[0])
      // imgData: 'https://picsum.photos/200/300'
    })
  }

  render() {
    const {
      state: { rectangles, selectedShapeName, mouseDown },
      handleStageMouseDown,
      handleNewRectChange,
      handleRectChange,
      handleStageMouseUp,
    } = this;
    return (
      <div>
        <Upload handleImageUpload={this.handleImageUpload} />

        <button onClick={() => {this.setState({ strokePrimary: "green", strokeSecondary: "lightgreen" }) }} >Interesting!</button>
        <button onClick={ () => {this.setState({ strokePrimary: "red", strokeSecondary: "tomato" }) }} >Uninteresting</button>

        <div id="image-container">
          <Stage
            ref={(node) => {
              this.stage = node;
            }}
            container="image-container"
            width={300}
            height={200}
            onMouseDown={handleStageMouseDown}
            onTouchStart={handleStageMouseDown}
            onMouseMove={mouseDown && handleNewRectChange}
            onTouchMove={mouseDown && handleNewRectChange}
            onMouseUp={mouseDown && handleStageMouseUp}
            onTouchEnd={mouseDown && handleStageMouseUp}
          >
            <Layer>
              {rectangles.map((rect, i) => (
                <Rectangle
                  sclassName="rect"
                  key={rect.key}
                  {...rect}
                  onTransform={(newProps) => {
                    handleRectChange(i, newProps);
                  }}
                />
              ))}
              <RectTransformer selectedShapeName={selectedShapeName} />
            </Layer>
            <Layer
              ref={(node) => {
                this.img = node;
              }}
            >
              <AnnotationImage img={this.state.imgData} />
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

export default App;
