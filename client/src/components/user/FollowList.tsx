import { memo } from 'react';
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { FollowUser } from '../../store/interfaces';

interface FollowListProps {
  header: string;
  hasMore: boolean;
  handleLoadMore: () => void;
  data: FollowUser[] | undefined;
  handleStopFollow: (id: number) => () => void;
}

function FollowList({ header, hasMore, handleLoadMore, data, handleStopFollow }: FollowListProps) {
  return (
    <List
      style={{ marginBottom: '20px' }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      bordered
      header={<div>{header}</div>}
      loadMore={
        hasMore && (
          <Button block onClick={handleLoadMore}>
            Load more
          </Button>
        )
      }
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: '20px' }}>
          <Card actions={[<StopOutlined key="stop" onClick={handleStopFollow(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}

export default memo(FollowList);
