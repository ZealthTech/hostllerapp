# React Native Network Call with Axios, Redux Toolkit, and Redux-Saga
This project showcases a structured approach to handle network calls using Axios, Redux Toolkit, and Redux-Saga in React Native, designed for scalability and maintainability.

# Why Use Redux Toolkit?
Redux Toolkit simplifies state management, reducing boilerplate and making the store configuration more intuitive. It integrates well with middleware like Redux-Saga for handling complex side effects.

# Why Use Redux-Saga?
Redux-Saga is ideal for managing complex async workflows and side effects, like API calls, in Redux. It uses generators for asynchronous control, making it easier to test and scale.

# Key Setup Points
Axios Instance: 
Configured as a central instance with interceptors for handling global request headers, tokens, and error responses consistently.

Redux Slices: 
Each feature has a Redux slice, defining initial state, reducers, and actions for handling success, loading, and error states.

Redux-Saga: 
A separate saga function to handle async API calls, dispatched by Redux actions. Each API request is handled in a clean, testable way, making it easy to manage even in complex workflows.

Store Configuration: 
Combines slices and integrates Redux-Saga middleware for centralized async handling, enhancing scalability as the app grows.


# react native reanimated
This library is used for animation in react native 

• Installation document
  https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started

• Usage document
  https://docs.swmansion.com/react-native-reanimated/docs


# Android Build

cd android

- Clean build:
./gradlew clean

- Create apk release build:
./gradlew assembleRelease

- Create Bundle release build:
./gradlew bundleRelease


# Android/iOS pre-activities for GO LIVE Build
- Change the version number in package.json
- versionCode,versionName for android in android/app/build.gradle
- Change the build number and version for iOS in Xcode manually


# React Native Payment Gateway - Razorpay
   • It is a library or package that allows developers to integrate the Razorpay payment gateway into their React Native applications.      

Prerequisites
1) Create a Razorpay Account(It is not for developer it is for merchant)
2) Generate API Keys(It is not for developer it is for merchant)

Install Razorpay React Native SDK
- npm install react-native-razorpay --save && cd ios && pod install

