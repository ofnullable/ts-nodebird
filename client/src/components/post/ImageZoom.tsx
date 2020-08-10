import { useState } from 'react';
import Slider from 'react-slick';
import { css } from '@emotion/core';
import { CloseOutlined } from '@ant-design/icons';
import { Image } from './PostImages';
import { serverAddress } from '../../utils/global';

const overlayStyle = css`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const imageZoomHeaderStyle = css`
  height: 44px;
  background: #fff;
  position: relative;
  padding: 0;
  text-align: center;

  h1 {
    margin: 0;
    color: #333;
    line-height: 44px;
  }
`;

const sliderWrapperStyle = css`
  height: calc(100% - 44px);
  background: #1f1f1f;
`;

const closeButtonStyle = css`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px;
  line-height: 14px;
`;

const indicatorStyle = css`
  text-align: center;
  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #5f5f5f;
    display: inline-block;
    text-align: center;
    color: white;
  }
`;

const imageWrapperStyle = css`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-width: 100%;
    max-height: 750px;
  }
`;

interface ImageZoomProps {
  images: Image[];
  handleClose: () => void;
}

function ImageZoom({ images, handleClose }: ImageZoomProps) {
  const [currSlide, setCurrSlide] = useState(0);

  return (
    <div css={[overlayStyle]}>
      <header css={[imageZoomHeaderStyle]}>
        <h1>Detail image</h1>
        <CloseOutlined onClick={handleClose} css={[closeButtonStyle]} />
      </header>
      <div css={[sliderWrapperStyle]}>
        <div>
          <Slider
            initialSlide={0}
            afterChange={(slide) => setCurrSlide(slide)}
            infinite={false}
            slidesToShow={1}
            slidesToScroll={1}
            arrows
          >
            {images.map((image) => (
              <div key={image.src} css={[imageWrapperStyle]}>
                <img src={`${serverAddress}/${image.src}`} alt="" />
              </div>
            ))}
          </Slider>
        </div>
        <div css={[indicatorStyle]}>
          <div>
            {currSlide + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageZoom;
