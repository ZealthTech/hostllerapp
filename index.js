/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//to ignore all the logs of the app
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
