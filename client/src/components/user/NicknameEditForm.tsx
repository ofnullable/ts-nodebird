import { Button, Form, Input } from 'antd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../lib/hooks/useInput';
import { AppState } from '../../store/reducers';
import { userActions } from '../../store/actions/users';

function NicknameEditForm() {
  const { auth } = useSelector((state: AppState) => state.user);
  const [edited, handleEditedChange] = useInput(auth.info?.nickname || '');
  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    dispatch(userActions.editNickname.request(edited));
  }, [edited]);

  return (
    <Form
      style={{
        marginBottom: '20px',
        border: '1px solid #d9d9d9',
        padding: '20px',
      }}
      onFinish={handleSubmit}
    >
      <Input addonBefore="nickname" name="edited" type="text" value={edited} onChange={handleEditedChange} required />
      <Button type="primary" htmlType="submit" block>
        Update
      </Button>
    </Form>
  );
}

export default NicknameEditForm;
