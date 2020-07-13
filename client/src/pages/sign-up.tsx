import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { Button, Checkbox, Form, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import useInput from '../lib/hooks/useInput';
import { AppState } from '../store/reducers';
import { userActions } from '../store/actions/users';

function SignUp() {
  const [email, handleEmailChange] = useInput('');
  const [nickname, handleNicknameChange] = useInput('');

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);

  const { auth, join } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();

  if (auth.info) {
    Router.push('/');
    return null;
  }

  useEffect(() => {
    if (join.complete) {
      Router.push('/');
    }
  }, [join.complete]);

  const handleSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return;
    }

    if (!term) {
      return;
    }

    dispatch(userActions.join.request({ email, nickname, password }));
  }, [email, nickname, password, passwordCheck, term]);

  const handlePasswordChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(target.value);
      setPasswordError(target.value !== passwordCheck);
    },
    [passwordCheck]
  );

  const handlePasswordCheckChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(target.value);
      setPasswordError(target.value !== password);
    },
    [password]
  );

  const handleTermChange = useCallback(({ target }: CheckboxChangeEvent) => {
    setTerm(target.checked);
  }, []);

  return (
    <>
      <Form onFinish={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <Input name="email" type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label htmlFor="nickanme">Nickname</label>
          <Input name="nickname" value={nickname} onChange={handleNicknameChange} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input name="password" type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div>
          <label htmlFor="password-check">Password check</label>
          <Input
            name="password-check"
            type="password"
            value={passwordCheck}
            onChange={handlePasswordCheckChange}
            required
          />
          {passwordError && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다</p>}
        </div>
        <div>
          <Checkbox name="term" checked={term} onChange={handleTermChange}>
            어쨋든 동의합니다
          </Checkbox>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button type="primary" htmlType="submit" loading={join.loading} block>
            Join
          </Button>
        </div>
      </Form>
    </>
  );
}

export default SignUp;
