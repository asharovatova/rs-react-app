import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const targetLocale = locale || 'en';

  const messages = (await import(`../../messages/${targetLocale}.json`))
    .default;

  return {
    locale: targetLocale,
    messages,
    timeZone: 'UTC',
  };
});
