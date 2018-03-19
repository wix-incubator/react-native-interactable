import * as React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

export default class ChangePositions extends React.PureComponent {
  private readonly snapPoints = [
    {x: -140, y: -250},
    {x: 140, y: -250},
    {x: -140, y: -120},
    {x: 140, y: -120},
    {x: -140, y: 0},
    {x: 140, y: 0},
    {x: -140, y: 120},
    {x: 140, y: 120},
    {x: -140, y: 250},
    {x: 140, y: 250},
  ];

  private greenRef: any;
  private blueRef: any;

  private setRandomPosition = () => {
    this.greenRef.changePosition({
      x: (Math.random() - 0.5) * 280,
      y: (Math.random() - 0.5) * 500,
    });
  };

  private setFixedPosition = () => {
    const blueDestination = this.snapPoints[3];
    this.blueRef.changePosition(blueDestination);
  };

  public render() {
    return (
      <View style={styles.container}>
        <Interactable.View
          style={{zIndex: 2}}
          ref={ref => (this.blueRef = ref)}
          snapPoints={this.snapPoints}
          initialPosition={{x: -140, y: 0}}
        >
          <View
            style={{
              width: 70,
              height: 70,
              backgroundColor: "blue",
              borderRadius: 35,
            }}
          />
        </Interactable.View>
        <Interactable.View
          style={{zIndex: 2}}
          ref={ref => (this.greenRef = ref)}
          snapPoints={this.snapPoints}
          initialPosition={{x: -140, y: 0}}
        >
          <View
            style={{
              width: 70,
              height: 70,
              backgroundColor: "green",
              borderRadius: 35,
            }}
          />
        </Interactable.View>
        <View
          style={{
            position: "absolute",
            left: 140,
            zIndex: 1,
          }}
        >
          <TouchableOpacity onPress={this.setFixedPosition}>
            <Text style={{color: "blue", fontSize: 12}}>
              {"ChangePosition to fixed"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.setRandomPosition}>
            <Text style={{color: "green"}}>ChangePosition to random</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
