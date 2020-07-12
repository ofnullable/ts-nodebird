import { Menu, Input, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { AppState } from '../store/reducers';

interface Props {
  children: React.ReactNode;
}

function AppLayout({ children }: Props) {
  const { auth } = useSelector((state: AppState) => state.user);

  const onSearch = (value: string) => {
    Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
  };

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>NodeBird</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} onSearch={onSearch} />
        </Menu.Item>
      </Menu>
      <Row gutter={16} style={{ margin: '10px' }}>
        <Col xs={0} md={0} lg={3} />
        <Col xs={24} md={6} lg={4}>
          {/* {auth ? <UserProfile /> : <SignInForm />} */}
        </Col>
        <Col xs={24} md={12} lg={10}>
          {children}
        </Col>
        <Col xs={24} md={6} lg={4}>
          <a href="https://github.com/ofnullable" target="_blank" rel="noreferrer noopener">
            Github
          </a>
        </Col>
        <Col xs={0} md={0} lg={3} />
      </Row>
    </div>
  );
}

export default AppLayout;
