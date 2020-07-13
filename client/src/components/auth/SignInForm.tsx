import { useCallback } from 'react';
import { css } from '@emotion/core';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import useInput from '../../lib/hooks/useInput';
import { userActions } from '../../store/actions/users';
import { AppState } from '../../store/reducers';
import AppLink from '../common/AppLink';

const ButtonWrapperStyle = css`
  margin-top: 10px;

  button {
    width: 47.5%;
  }
  a > button {
    margin-left: 5%;
  }
`;

const errorMessageStyle = css`
  color: red;
`;

function SignInForm() {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const { error, loading } = useSelector((state: AppState) => state.user.auth);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    dispatch(userActions.signIn.request({ email, password }));
  }, [email, password]);

  return (
    <Form onFinish={handleSubmit} style={{ padding: '10px' }}>
      <div>
        <label htmlFor="email">Email</label>
        <Input name="email" type="email" value={email} onChange={handleEmailChange} required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input name="password" type="password" value={password} onChange={handlePasswordChange} required />
      </div>
      {error && <p css={[errorMessageStyle]}>{error}</p>}
      <div css={[ButtonWrapperStyle]}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Sign-in
        </Button>
        <AppLink href="/sign-up">
          <Button htmlType="button">Sign-up</Button>
        </AppLink>
      </div>
    </Form>
  );
}

export default SignInForm;
