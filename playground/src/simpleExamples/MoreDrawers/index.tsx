import * as React from "react";
import {StyleSheet, View, Text} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

export default class MoreDrawers extends React.PureComponent {
  public render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: "red", marginBottom: 50}}>
          <Interactable.View
            snapPoints={[{x: 0}, {x: -230}]}
            horizontalOnly={true}
          >
            <View style={styles.cover}>
              <Text style={styles.label}>Default drawer</Text>
            </View>
          </Interactable.View>
        </View>

        <View style={{backgroundColor: "red", marginBottom: 50}}>
          <Interactable.View
            snapPoints={[{x: 0}, {x: -230}]}
            boundaries={{right: 0}}
            horizontalOnly={true}
          >
            <View style={styles.cover}>
              <Text style={styles.label}>Drawer with limits</Text>
            </View>
          </Interactable.View>
        </View>

        <View style={{backgroundColor: "red", marginBottom: 50}}>
          <Interactable.View
            snapPoints={[{x: 0}, {x: -230}]}
            boundaries={{right: 0, bounce: 0.2, haptics: true}}
            horizontalOnly={true}
          >
            <View style={styles.cover}>
              <Text style={styles.label}>Limits with bounce</Text>
            </View>
          </Interactable.View>
        </View>

        <View style={{backgroundColor: "red", marginBottom: 50}}>
          <Interactable.View
            snapPoints={[{x: 0}, {x: -230}]}
            dragWithSpring={{tension: 1000, damping: 0.7}}
            horizontalOnly={true}
          >
            <View style={styles.cover}>
              <Text style={styles.label}>Drag via spring</Text>
            </View>
          </Interactable.View>
        </View>

        <View style={{backgroundColor: "red", marginBottom: 50}}>
          <Interactable.View
            snapPoints={[{x: 0}, {x: -230}]}
            dragWithSpring={{tension: 2000, damping: 0.5}}
            springPoints={[
              {x: 0, tension: 6000, damping: 0.5, influenceArea: {left: 0}},
            ]}
            horizontalOnly={true}
          >
            <View style={styles.cover}>
              <Text style={styles.label}>Drag with spring resistance</Text>
            </View>
          </Interactable.View>
        </View>
      </View>
    );
  }
}
