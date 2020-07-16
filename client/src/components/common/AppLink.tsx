import Link from 'next/link';

interface AppLinkProps {
  href: string | { pathname: string; query: { [key: string]: string } };
  as?: string;
  children: React.ReactNode;
}

function AppLink({ href, as, children }: AppLinkProps) {
  return (
    <Link href={href} as={as}>
      <a>{children}</a>
    </Link>
  );
}

export default AppLink;
