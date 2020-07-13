import { Avatar, Button, Card } from 'antd';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import AppLink from '../common/AppLink';

function SimpleProfile() {
  const { info } = useSelector((state: AppState) => state.user.auth);
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
      <Button>Sign-out</Button>
    </Card>
  );
}

export default SimpleProfile;
