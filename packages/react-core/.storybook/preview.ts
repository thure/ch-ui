//
// Copyright 2022 DXOS.org
//

import { createElement, useEffect } from "react";
import { ThemeProvider } from "@ch-ui/core";
import { auroraTx } from "@ch-ui/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      // The icon for the toolbar item.
      icon: "circlehollow",
      // Array of options.
      items: [
        { value: "light", icon: "circlehollow", title: "light" },
        { value: "dark", icon: "circle", title: "dark" },
      ],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

const withTheme = (StoryFn: any, context: any) => {
  const theme = context?.parameters?.theme || context?.globals?.theme;
  useEffect(() => {
    // @ts-ignore
    document.documentElement.classList[theme === "dark" ? "add" : "remove"](
      "dark",
    );
  }, [theme]);

  return createElement(ThemeProvider, {
    children: createElement(StoryFn),
    tx: auroraTx,
  });
};

export const decorators = [withTheme];
