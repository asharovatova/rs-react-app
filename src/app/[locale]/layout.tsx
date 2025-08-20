import '../globals.scss';
import { Header } from '../../components/Header';
import { Providers } from '../providers';
import { notFound } from 'next/navigation';
import type { Messages } from '../../types/messages';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  let messages: Messages;

  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale} messages={messages}>
          <Header />

          <div id="root">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}
