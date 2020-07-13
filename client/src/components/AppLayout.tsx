import { Col, Input, Menu, Row } from 'antd';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { AppState } from '../store/reducers';
import SignInForm from './auth/SignInForm';
import AppLink from './common/AppLink';
import SimpleProfile from './auth/SimpleProfile';

interface Props {
  children: React.ReactNode;
}

// For Menu Component rc-menu props..
// ref: https://github.com/ant-design/ant-design/issues/17551
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomMenu = Menu as any;

function AppLayout({ children }: Props) {
  const { info } = useSelector((state: AppState) => state.user.auth);

  const onSearch = (value: string) => {
    Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
  };

  return (
    <div>
      <CustomMenu mode="horizontal">
        <Menu.Item key="home">
          <AppLink href="/">NodeBird</AppLink>
        </Menu.Item>
        <Menu.Item key="profile">
          <AppLink href="/profile">Profile</AppLink>
        </Menu.Item>
        <Menu.Item key="search">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} onSearch={onSearch} />
        </Menu.Item>
      </CustomMenu>
      <Row gutter={16} style={{ margin: '10px' }}>
        <Col xs={0} md={0} lg={2} />
        <Col xs={24} md={6} lg={5}>
          {info ? <SimpleProfile /> : <SignInForm />}
        </Col>
        <Col xs={24} md={12} lg={10}>
          {children}
        </Col>
        <Col xs={24} md={6} lg={5}>
          <a href="https://github.com/ofnullable" target="_blank" rel="noreferrer noopener">
            Github
          </a>
        </Col>
        <Col xs={0} md={0} lg={2} />
      </Row>
    </div>
  );
}

export default AppLayout;
