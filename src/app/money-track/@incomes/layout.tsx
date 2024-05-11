import Card from '@/components/surface/card';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Card title="Latest Incoming">{children}</Card>;
}
