import '../assets/styles/main.scss';
import { Header } from '../components/Header';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />

          <div id="root">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
