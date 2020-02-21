import React from 'react';
import { Image } from 'react-konva';

interface AnnotationImageProps {
  img: any;
};

interface AnnotationImageState {
  image: any;
}

class AnnotationImage extends React.Component<AnnotationImageProps, AnnotationImageState> {
  state = {
    image: null,
  };

  componentDidMount() {
    const image = new window.Image();
    // random image placeholder, until an image is uploaded by user
    image.src = 'https://picsum.photos/200/300';
    image.onload = () => {
      this.setState({
        image,
      });
    };
  }
  
  componentWillReceiveProps(nextProps) {
    // checks if a new image was loaded
    if (nextProps.img !== this.state.image) {
      const image = new window.Image();
    
      image.src = nextProps.img;
      image.onload = () => {
        this.setState({
          image,
        });
      };
    }
  }

  render() {
    const {
      state: { image },
    } = this;
    let height =null;
    let width = null;
    if (image) {
      height = (500/2) - (image.height/2);
      width = (800/2) - (image.width/2);
    }
    return (
      <Image
        x={width}
        y={height}
        image={image}
      />
    );
  }
}

export default AnnotationImage;
