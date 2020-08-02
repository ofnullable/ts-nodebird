import AppLink from '../common/AppLink';

interface PostCardContentProps {
  content: string;
}
function PostCardContent({ content }: PostCardContentProps) {
  return (
    <div>
      {content.split(/(#[^\s]+)/g).map((value) => {
        if (value.match(/(#[^\s]+)/)) {
          return (
            <AppLink
              href={{ pathname: '/hashtag', query: { tag: value.slice(1) } }}
              as={`/hashtag/${value.slice(1)}`}
              key={value}
            >
              {value}
            </AppLink>
          );
        }
        return value;
      })}
    </div>
  );
}

export default PostCardContent;
