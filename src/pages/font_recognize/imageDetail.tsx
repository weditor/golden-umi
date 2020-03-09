import * as React from 'react';
import Axios from 'axios';

class ImageDetailView extends React.Component<any, any> {
  img: any = null;
  imgRef?: HTMLImageElement = undefined;
  state = {
    image_max_width: 500,
    image_max_height: 500,
    image_display_width: 500,
    image_display_height: 500,
    image_real_width: 0,
    image_real_height: 0,
  };
  componentDidMount() {
    let imgRef: HTMLImageElement = this.imgRef as HTMLImageElement;
    let img = new Image();
    img.onload = () => {
      this.img = img;
      imgRef.src = this.img.src;
      this.setState(
        {
          image_real_width: imgRef.naturalWidth,
          image_real_height: imgRef.naturalHeight,
          image_display_width: imgRef.width,
          image_display_height: imgRef.height,
        },
        this.paint_canvas,
      );
    };
    img.src = `/font_api/image/${this.imageId()}/image/`;
  }
  onRenderImg = (ref: HTMLImageElement): void => {
    this.imgRef = ref;
  };
  imageId = (): string => {
    return this.props.match.params.imageId;
  };
  paint_canvas = () => {
    let canvas = document.getElementById('font-rec-image-canvas');
    console.log(canvas?.clientWidth, canvas?.clientHeight);
    if (!canvas) {
      return;
    }
    let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.moveTo(10, 10), ctx.lineTo(10, 50), ctx.lineTo(50, 50);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
    // ctx.drawImage(this.img, 0, 0, 100, 100);
  };

  render() {
    const imageStyle = {
      maxWidth: this.state.image_max_width,
      maxHeight: this.state.image_max_height,
    };
    const canvasStyle = {
      width: this.state.image_display_width,
      height: this.state.image_display_height,
    };
    return (
      <div>
        <div>{this.imageId()}</div>
        <div style={{ position: 'relative' }}>
          <img
            ref={this.onRenderImg}
            // src={`/font_api/image/${this.imageId()}/image/`}
            style={imageStyle}
          />
          <div
            style={{ position: 'absolute', left: 0, top: 0, ...canvasStyle }}
          >
            <canvas id="font-rec-image-canvas" {...canvasStyle} />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDetailView;
