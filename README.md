# ioBuilders coding test by Fernando Picos

## Step by step

### Project basics

Run the command to create the project using the [Redux](https://redux.js.org/) template in `io-builders` folder.

```bash
npx create-react-app io-builders --template redux-typescript
```

Create `.vscode` folder and the file `settings.json` with this content inside:

```json
{
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": ["source.fixAll.eslint"]
}
```

### Adding [`eslint`](https://eslint.org/)

This is a tool that analizes the code and allows us to find problems quickly (some of the them could be fixed automatically too). Run the next command:

```bash
npm install eslint --save-dev.
```

I have added [`prettier`](https://prettier.io/) plugin because is the most common style guide I have been working with and is very useful as it fixes and format the code automatically. Run the command:

```bash
npm install eslint-config-prettier eslint-plugin-prettier prettier --save-dev
```

And add the file `eslintrc.json` in the root folder with this content:

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "always"]
  }
}
```

Edit `package.json` file adding the lint scripts:

```json
{
  "scripts": [
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,css,md,json}\" --config ./.prettierrc"
  ]
}
```

Create `.prettierrc` config file and paste:

```json
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 80,
  "trailingComma": "es5",
  "jsxBracketSameLine": false
}
```

### Adding [`react-router`](https://reactrouter.com/en/main)

This plugin allows us to create the routes for the app. To install it, run the command

```bash
npm install react-router-dom
```

Edit `src/index.tsx` file including the `BrowserRouter` provider:

```tsx
import { BrowserRouter } from "react-router-dom";

// ...

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```

Replace `src/App.tsx` content with:

```tsx
import { useRoutes } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import MainLayout from "./layouts/MainLayout";
import DepositPage from "./pages/DepositPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TransferPage from "./pages/TransferPage";
import WalletPage from "./pages/WalletPage";

export const Page = Object.freeze({
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  WALLET: "/wallet",
  MAKE_DEPOSIT: "/deposit",
  MAKE_TRANSFER: "/transfer",
});

function App() {
  const routes = useRoutes([
    {
      path: "/auth",
      element: <GuestLayout />,
      children: [
        {
          path: Page.LOGIN,
          element: <LoginPage />,
        },
        {
          path: Page.REGISTER,
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: Page.WALLET,
          element: <WalletPage />,
        },
        {
          path: Page.MAKE_DEPOSIT,
          element: <DepositPage />,
        },
        {
          path: Page.MAKE_TRANSFER,
          element: <TransferPage />,
        },
        {
          path: "/",
          element: <WalletPage />,
        },
      ],
    },

    {
      path: "*",
      element: <h1>Not found</h1>,
    },
  ]);

  return routes;
}

export default App;
```

### Adding [`chakra-ui`](https://chakra-ui.com/)

This is a library that allows us to build React apps faster, as it provides us components tested and working. To install it, run the command:

```bash
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`
```

and include the provider in the `src/index.tsx` file:

```tsx
import { ChakraProvider } from "@chakra-ui/react";

// ...

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```

### Adding [`react-i18next`](https://react.i18next.com/)

This library helps us with the internationalization and allows us to insert different languages in the app. To install it, run the command

```bash
npm install react-i18next i18next --save
```

Add the `src/i18n/index.ts` file and paste:

```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./messages/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en,
  },
  lng: "en",
  fallbackLng: "en",
});
```

And import the file in `src/index.tsx`:

```tsx
import "./i18n";
// ...
```

### Adding `auth` feature

For login and register users, we need to create the auth feature containing the `redux` module and the related components (see the `src/feature/auth` folder).

We use the `GuestLayout` (see `src/layouts/GuestLayout.tsx`) to hide the toolbar and manage the redirection when an authenticated user tries to enter in a children route.

As we don't have any API, I used localStorage to store the users. When you register a new one, the username is stored in the array of users. And when you log in, the user is stored in sessionStorage.

This behavior allows us to reload the navigator and keep the user logged in. On the other hand, if the user closes the navigator tab and opens the app in a new one, the session is closed but the users are still stored in localStorage, so it is not necessary to register the user again.

In `src/features/auth/AuthSlice.ts` we have the `redux` module to store the authenticated user and the actions to login/register a user. These actions calls the API (in this case, it is mocked but is easy to scale up only updating these actions).

Don't forget to add the reducer in `src/store/index.ts` to get the state in the components:

```ts
// src/store/index.ts
import auth from "../features/auth/AuthSlice";

export const store = configureStore({
  reducer: {
    auth,
  },
});
```

### Blockchain part

#### Installing [`truffle`](https://trufflesuite.com/)

Create a new folder in the root folder (I have called it `truffle`) and with the terminal inside this folder, run the commands:

```bash
$ cd truffle
$ truffle unbox metacoin
$ truffle compile
```

#### Installing [Ganache](https://trufflesuite.com/ganache/)

Ganache is a desktop application with a personal blockchain for development. Download, install and open it.

Then select the option "QUICKSTART (Ethereum)", choose the "Contracts" tab and click on "Link Truffle Projects".

In the dialog, click on "Add project" and select the `truffle-config.js` from our project.

Click on "Save and restart", and back in the terminal run the command:

```bash
truffle migrate --development
```

Then in Garnache, we can see the deployed contracts.

### Adding `wallet` feature

When a user is logged in the app, we want to show the accounts with the balances, and allow the user to make deposits or transfers.

For this purpose, I'm using [web3.js](https://web3js.readthedocs.io/en/v1.8.2/index.html) and the truffle project created in the previous step.

web3.js is a collection of libraries that allows us to interact with our ethereum node.

To install it, run the command:

```bash
npm install web3
```

And then create the wallet `redux` module and the related components in `src/features/wallet` folder. Create the `.env` file in the root of the project and add the variable

```env
REACT_APP_WEB3_URL="ws://localhost:7545"
```

It allows us to update

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run lint`

Launches the linting from the terminal and shows the report with the problems.

### `npm run lint:fix`

Launches the linting from the terminal and shows the report with the problems, trying to fix automatically them.

### `npm run format`

Formats all files in the app.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
