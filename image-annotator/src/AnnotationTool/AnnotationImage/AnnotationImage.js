import React from 'react';
import { Image } from 'react-konva';

class AnnotationImage extends React.Component {
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

    return (
      <Image
        height={200}
        width={300}
        image={image}
      />
    );
  }
}

export default AnnotationImage;
