import { useCallback, useEffect, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/core';
import useInput from '../../lib/hooks/useInput';
import { postActions } from '../../store/actions/posts';
import { AppState } from '../../store/reducers';
import { serverAddress } from '../../utils/global';

const postRegisterFormStyle = css`
  margin-bottom: 1rem;
  textarea {
    margin-bottom: 0.5rem;
  }
`;

const uploadedImageStyle = css`
  display: inline-block;
  img {
    width: 200px;
  }
`;

function PostRegisterForm() {
  const [text, handleTextChange, setText] = useInput('');
  const fileRef = useRef<HTMLInputElement>(null);
  const { uploaded, addPost, removeImage } = useSelector((state: AppState) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addPost.complete) {
      setText('');
    }
  }, [addPost.complete]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const images = new FormData();

    [].forEach.call(e.target.files, (f) => {
      images.append('image', f);
    });

    dispatch(postActions.uploadImages.request(images));
  }, []);

  const handleFileInputClick = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, [fileRef.current]);

  const handleRemoveImage = useCallback(
    (idx: number) => () => {
      if (uploaded.data[idx]) {
        const filename = uploaded.data[idx].replace('public/', '');
        dispatch(postActions.removeImage.request(filename));
      }
    },
    [uploaded.data]
  );

  const handleSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      alert('Enter content');
      return;
    }
    const formData = new FormData();

    if (uploaded.data) {
      uploaded.data.forEach((path) => formData.append('image', path));
    }
    formData.append('content', text);

    dispatch(postActions.addPost.request(formData));
  }, [text, uploaded]);

  return (
    <Form encType="multipart/form-data" onFinish={handleSubmit} css={[postRegisterFormStyle]}>
      <Input.TextArea
        maxLength={150}
        placeholder="어떤 신기한 일이 있었나요?"
        value={text}
        onChange={handleTextChange}
      />
      <div>
        <input type="file" multiple hidden ref={fileRef} onChange={handleImageUpload} />
        <Button onClick={handleFileInputClick}>upload</Button>
        <Button type="primary" htmlType="submit" loading={addPost.loading} style={{ float: 'right' }}>
          Twit
        </Button>
      </div>
      <div>
        {uploaded.data.map((path, i) => (
          <div key={path} css={[uploadedImageStyle]}>
            <img src={`${serverAddress}/${path}`} alt={path} />
            <div>
              <Button onClick={handleRemoveImage(i)} loading={removeImage.loading}>
                X
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default PostRegisterForm;
