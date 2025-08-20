import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

const navigation = createNavigation(routing);

export const { Link, redirect, usePathname, useRouter } = navigation;
