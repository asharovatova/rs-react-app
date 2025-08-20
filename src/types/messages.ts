export interface Messages {
  [key: string]: string | Messages;
}

export type LocaleMessages = Record<string, Messages>;
