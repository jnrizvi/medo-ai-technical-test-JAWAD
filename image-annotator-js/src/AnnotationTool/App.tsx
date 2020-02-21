import React from 'react';
import { Stage, Layer } from 'react-konva';
import shortid from 'shortid';

import CustomToolbar from '../components/CustomToolbar';
import Rectangle from './Rectangle/Rectangle';
import RectTransformer from './Rectangle/RectTransformer';
import AnnotationImage from './AnnotationImage/AnnotationImage';
import './App.css';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { CopyToClipboard } from "react-copy-to-clipboard";

class App extends React.Component {
  img;
  rectangles;
  constructor(props){
    super(props);
    this.state = {
      rectangles: [],
      rectCount: 0,
      selectedShapeName: '',
      mouseDown: false,
      mouseDraw: false,
      newRectX: 0,
      newRectY: 0,
      imgData: null,
      imgName: "default.xyz",
      strokePrimary: "green",
      strokeSecondary: "lightgreen",
      type: "Interesting",
      jsonOutput: "No JSON Output received yet."
    };
    this.img = null;
  }
  

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
      // console.log(rect)
    } else {
      this.setState({
        selectedShapeName: '',
      });
    }
  };

  handleRectChange = (index, newProps) => {
    const { rectangles } = this.state;
    // console.log(rectangles[0]);
    rectangles[index] = {
      ...rectangles[index],
      ...newProps,
    };
    // console.log(rectangles[0]);
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
        height: mousePos.y - newRectY,
        name: `rect${rectCount + 1}`,
        strokes: [this.state.strokePrimary, this.state.strokeSecondary],
        type: this.state.type,
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
      imgData: URL.createObjectURL(event.target.files[0]),
      imgName: event.target.files[0].name
      // imgData: 'https://picsum.photos/200/300'
    });
  }

  handleInteresting = () => this.setState({ strokePrimary: "green", strokeSecondary: "lightgreen", type: "Interesting" })

  handleUninteresting = () => this.setState({ strokePrimary: "red", strokeSecondary: "tomato", type: "Uninteresting" })

  handleJSONOutputClicked = () => {
    let data = {"imageName": this.state.imgName, "annotations": [] };
    this.state.rectangles.forEach(rectangle => {
      data["annotations"].push({
          "annotationID": rectangle.key,
          "upperLeft": {"pointID": rectangle.name+"UL", "x": rectangle.x, "y": rectangle.y},
          "lowerRight": {"pointID": rectangle.name+"LR", "x": rectangle.x+rectangle.width, "y": rectangle.y+rectangle.height},
          "type": rectangle.type
        }
      ) 
      // console.log(rectangle);
    });
    this.setState({ jsonOutput: JSON.stringify(data) })
    // console.log(JSON.stringify(data))
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
        [
        <CustomToolbar 
          key="toolbar"
          handleImageUpload={this.handleImageUpload}
          handleJSONOutputClicked={this.handleJSONOutputClicked}
          handleInteresting={this.handleInteresting}
          handleUninteresting={this.handleUninteresting}
        />,

        
        <div key="content" style={{ display: 'flex', justifyContent: "center" }}>
          <Card
            style={{
              flexGrow: 1,
              margin: '20px',
              padding: '20px',
              paddingTop: 0,
              minWidth: '260px',
              maxWidth: '360px',
              width: "80%",
              height: '400px',
              alignSelf: 'center',
            }}
          >
            <CardHeader style={{ padding: "10px"}} title="JSON Output" action={
              <CopyToClipboard
                text={this.state.jsonOutput}
              >
                <IconButton aria-label="settings" style={{ marginTop: '10px' }} >
                  <FileCopyIcon />
                </IconButton>
              </CopyToClipboard> 
            }/>
            <Typography style={{
              wordWrap: 'break-word',
              position: "relative",
              height: "100%",
              overflow: "auto"
              }}>
              {this.state.jsonOutput}
            </Typography>
            
          </Card>
          
          <div id="image-container">
            <Stage
              ref={(node) => {
                this.stage = node;
              }}
              container="image-container"
              width={800}
              height={500}
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
        ]
        

    );
  }
}

export default App;
