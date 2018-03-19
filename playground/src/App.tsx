import * as React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ChangePosition from "./simpleExamples/TouchesInsideStatic";

export default class App extends React.Component {
  private onExamplePress = () => {};

  public render() {
    return <ChangePosition />;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flex: 1,
    justifyContent: "center",
  },
  instructions: {
    color: "#333333",
    marginBottom: 5,
    textAlign: "center",
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: "center",
  },
});
