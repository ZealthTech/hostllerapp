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
