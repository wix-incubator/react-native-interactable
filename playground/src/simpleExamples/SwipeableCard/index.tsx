import * as React from "react";
import {View} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

export default class SwipeableCard extends React.PureComponent {
  public render() {
    return (
      <View style={styles.container}>
        <Interactable.View
          key="first"
          horizontalOnly={true}
          snapPoints={[{x: 360}, {x: 0, damping: 0.5}, {x: -360}]}
        >
          <View style={styles.card} />
        </Interactable.View>

        <Interactable.View
          key="second"
          horizontalOnly={true}
          snapPoints={[{x: 360}, {x: 0}, {x: -360}]}
        >
          <View style={styles.card} />
        </Interactable.View>

        <Interactable.View
          key="third"
          horizontalOnly={true}
          snapPoints={[{x: 360}, {x: 0, damping: 0.8}, {x: -360}]}
        >
          <View style={styles.card} />
        </Interactable.View>
      </View>
    );
  }
}
