import { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import AppLink from '../common/AppLink';
import { userActions } from '../../store/actions/users';

function SimpleProfile() {
  const { info, loading } = useSelector((state: AppState) => state.user.auth);
  const dispatch = useDispatch();

  const handleSignOut = useCallback(() => {
    dispatch(userActions.signOut.request());
  }, []);

  return (
    <Card
      actions={[
        <AppLink href="/profile" key="twit">
          <div>
            Twit <br />
            {info?.posts?.length || 0}
          </div>
        </AppLink>,
        <AppLink href="/profile" key="following">
          <div>
            Following <br />
            {info?.followings?.length || 0}
          </div>
        </AppLink>,
        <AppLink href="/profile" key="follower">
          <div>
            Follower <br />
            {info?.followers?.length || 0}
          </div>
        </AppLink>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{info?.nickname[0]}</Avatar>} title={info?.nickname} />
      <Button onClick={handleSignOut} loading={loading}>
        Sign-out
      </Button>
    </Card>
  );
}

export default SimpleProfile;
