import * as React from 'react';
import Axios from 'axios';

class ImageDetailView extends React.Component<any, any> {
  img: any = null;
  componentDidMount() {
    let img = new Image();
    img.src = `/font_api/image/${this.imageId()}/image/`;
    img.onload = () => {
      this.img = img;
      this.paint_canvas();
    };
  }

  imageId = (): string => {
    return this.props.match.params.imageId;
  };
  paint_canvas = () => {
    let canvas = document.getElementById('font-rec-image-canvas');
    if (!canvas) {
      return;
    }
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.drawImage(this.img, 0, 0, 100, 100);
  };

  render() {
    return (
      <div>
        <div>{this.imageId()}</div>
        <canvas id="font-rec-image-canvas" />
      </div>
    );
  }
}

export default ImageDetailView;
