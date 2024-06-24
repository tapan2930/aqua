# Getting Started

Clone the repo, and follow the below steps:

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# installing the depencies
npm i # yarn

# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Setting up the debuggers and dev dependieces for the store management and debugging.

> **Note:** In this part we need to exit from all open terminals related to the app and emulator.

`We will be using Zustand for statment management. If you look under the package.json and check the dependancies you should find the `

Steps we will perform:

Install Redux-React Dev tool from https://github.com/jhen0409/react-native-debugger

Run the reacr native application and the above downloaded app, make sure the react native app opens in the emulator.

Once the app is open, press crlt or cmd + 'm', that will open a menu in emulator, click on the debug, your reactnative app will the open in the react-native-debugger.

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Issues in Phase 1

- Sign up flow - OTP vaidation issue
- Task CRUD Flow
- Create Parameters CREATE API (POST) respinse error
- Graphs Api
-
