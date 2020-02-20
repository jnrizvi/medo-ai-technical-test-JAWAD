import React from 'react';

import Annotation from 'react-image-annotation';
import { ReactPictureAnnotation } from "react-picture-annotation";

export default class Annotator extends React.Component {
  state = {
    annotations: [],
    annotation: {}
  }
 
  onChange = (annotation) => {
    this.setState({ annotation })
  }
 
  onSubmit = (annotation) => {
    const { geometry, data } = annotation
    console.log(data);
    this.setState({
      annotation: {},
      annotations: this.state.annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      })
    })
  }
  
  render () {
    const onSelect = selectedId => {return selectedId};
    const onChange = data => { return data };
    return (
        <Annotation
          src={this.props.img}
          alt='Two pebbles anthropomorphized holding hands'
          style={{ width: "75%" }}
          annotations={this.state.annotations}
 
          type={this.state.type}
          value={this.state.annotation}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          allowTouch
        />
        // <ReactPictureAnnotation
        //   image={this.props.img}
        //   onSelect={onSelect}
        //   onChange={onChange}
        //   width={1000}
        //   height={1000}
        // />
        
    )
  }
}