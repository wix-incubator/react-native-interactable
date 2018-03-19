// TODO onSnap iOS
import * as React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height - 75,
};

interface State {
  dragEnabled: boolean;
}

export default class AlertAreas extends React.PureComponent<undefined, State> {
  constructor(props) {
    super(props);
    this.state = {
      dragEnabled: true,
    };
  }

  private onAlert = event => {
    console.log("alert:", event.nativeEvent);
    if (JSON.stringify(event.nativeEvent).includes('"blue":"enter"')) {
      this.setState({dragEnabled: false});
    }
    if (JSON.stringify(event.nativeEvent).includes('"blue":"leave"')) {
      this.setState({dragEnabled: true});
    }
  };

  private onDrag = event => {
    console.log("drag:", event.nativeEvent);
  };

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.markerContainer}>
          <View
            style={{
              backgroundColor: "#00ff0030",
              position: "absolute",
              left: Screen.width / 2 + 100,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />
        </View>
        <View style={styles.markerContainer}>
          <View
            style={{
              backgroundColor: "#ffff0060",
              position: "absolute",
              left: Screen.width / 2 - 150,
              right: Screen.width / 2 + 50,
              top: Screen.height / 2 + 100,
              bottom: Screen.height / 2 - 200,
            }}
          />
        </View>
        <View style={styles.markerContainer}>
          <View
            style={{
              backgroundColor: "#add8e6",
              position: "absolute",
              left: 0,
              right: Screen.width / 2 + 50,
              top: Screen.height / 2 - 150,
              bottom: Screen.height / 2,
            }}
          >
            <Text style={{fontSize: 28}}>Non Draggable Area</Text>
          </View>
        </View>
        <Interactable.View
          snapPoints={[
            {id: "snapId1", x: -140, y: -250},
            {x: 140, y: -250},
            {x: -140, y: 250},
            {x: 140, y: 250},
          ]}
          dragEnabled={this.state.dragEnabled}
          alertAreas={[
            {id: "green", influenceArea: {left: 100}},
            {
              id: "yellow",
              influenceArea: {top: 100, bottom: 200, left: -150, right: -50},
            },
            {
              id: "blue",
              influenceArea: {
                top: -150,
                bottom: 0,
                left: -Screen.width / 2,
                right: -50,
              },
            },
          ]}
          onAlert={this.onAlert}
          onDrag={this.onDrag}
          initialPosition={{x: -140, y: -250}}
        >
          <View
            style={{
              width: 70,
              height: 70,
              backgroundColor: "red",
              borderRadius: 35,
            }}
          />
        </Interactable.View>
      </View>
    );
  }
}
