import Link from 'next/link';

interface AppLinkProps {
  href: string;
  children: React.ReactNode;
}

function AppLink({ href, children }: AppLinkProps) {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
}

export default AppLink;
