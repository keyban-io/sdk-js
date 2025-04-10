import React from "react";
import { IntlConfig, IntlProvider } from "react-intl";

// eslint-disable-next-line react-refresh/only-export-components
export enum Locale {
  frFR = "fr-FR",
  enUS = "en-US",
}

const defaultRichTextElements = {
  b: (text: React.ReactNode) => <b>{text}</b>,
  i: (text: React.ReactNode) => <i>{text}</i>,
};

const PROVIDERS = Object.fromEntries(
  Object.values(Locale).map((locale) => [
    locale,
    React.lazy(() =>
      import(`../lang/${locale}.ast.json`).then(
        ({ default: messages }: { default: IntlConfig["messages"] }) => ({
          default: (props: React.PropsWithChildren) => (
            <IntlProvider
              messages={messages}
              locale={locale}
              defaultLocale={Locale.frFR}
              textComponent="span"
              defaultRichTextElements={defaultRichTextElements}
              {...props}
            />
          ),
        }),
      ),
    ),
  ]),
);

const LocaleSwitcherContext = React.createContext<
  React.Dispatch<React.SetStateAction<Locale>>
>(() => {});

// eslint-disable-next-line react-refresh/only-export-components
export const useLocaleSwitcher = () => React.useContext(LocaleSwitcherContext);

export function AppIntlProvider(props: React.PropsWithChildren) {
  const userPreference = localStorage.getItem("locale") as Locale | null;
  const systemPreference = Object.values(Locale).includes(
    navigator.language as Locale,
  )
    ? (navigator.language as Locale)
    : null;

  const [locale, setLocale] = React.useState(
    userPreference ?? systemPreference ?? Locale.enUS,
  );

  React.useEffect(() => {
    window.localStorage.setItem("locale", locale);
  }, [locale]);

  const Component = PROVIDERS[locale];

  return (
    <LocaleSwitcherContext.Provider value={setLocale}>
      <Component {...props} />
    </LocaleSwitcherContext.Provider>
  );
}
