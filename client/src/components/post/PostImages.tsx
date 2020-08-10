import { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { serverAddress } from '../../utils/global';
import ImageZoom from './ImageZoom';

export interface Image {
  src: string;
}

interface PostImagesProps {
  images: Image[] | [];
}

function PostImages({ images }: PostImagesProps) {
  const [zoom, setZoom] = useState(false);

  const handleZoom = useCallback(() => {
    setZoom(true);
  }, []);

  const handleClose = useCallback(() => {
    setZoom(false);
  }, []);

  if (!images?.length) {
    return null;
  }

  switch (images?.length) {
    case 1:
      return (
        <>
          <div role="presentation" onClick={handleZoom}>
            <img
              style={{ width: 'calc(100% - 2px)', margin: '0 1px' }}
              src={`${serverAddress}/${images[0].src}`}
              alt=""
            />
          </div>
          {zoom && <ImageZoom images={images} handleClose={handleClose} />}
        </>
      );
    case 2:
      return (
        <>
          <div role="presentation" onClick={handleZoom}>
            <img
              style={{ width: 'calc(50% - 1px)', marginLeft: '1px' }}
              src={`${serverAddress}/${images[0].src}`}
              alt=""
            />
            <img
              style={{ width: 'calc(50% - 1px)', marginRight: '1px' }}
              src={`${serverAddress}/${images[1].src}`}
              alt=""
            />
          </div>
          {zoom && <ImageZoom images={images} handleClose={handleClose} />}
        </>
      );
    default:
      return (
        <>
          <div role="presentation" onClick={handleZoom}>
            <img
              style={{ width: 'calc(50% - 1px)', marginLeft: '1px' }}
              src={`${serverAddress}/${images[0].src}`}
              alt=""
            />
            <div style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}>
              <PlusOutlined />
              {images.length - 1}개의 사진 더 보기
            </div>
          </div>
          {zoom && <ImageZoom images={images} handleClose={handleClose} />}
        </>
      );
  }
}

export default PostImages;
