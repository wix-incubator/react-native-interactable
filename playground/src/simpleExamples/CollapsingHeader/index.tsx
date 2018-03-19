import * as React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

export default class CollapsingHeader extends React.PureComponent {
  private deltaY = new Animated.Value(0);
  public render() {
    return (
      <View style={styles.container}>
        <View
          style={{backgroundColor: "red", height: 250, alignItems: "center"}}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: this.deltaY.interpolate({
                    inputRange: [-150, -150, 0, 0],
                    outputRange: [-58, -58, 0, 0],
                  }),
                },
                {
                  scale: this.deltaY.interpolate({
                    inputRange: [-150, -150, 0, 0],
                    outputRange: [0.35, 0.35, 1, 1],
                  }),
                },
              ],
            }}
          >
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: "blue",
                borderRadius: 75,
                marginTop: 50,
              }}
            />
          </Animated.View>
        </View>

        <Interactable.View
          verticalOnly={true}
          snapPoints={[{y: 0}, {y: -150}]}
          boundaries={{top: -150}}
          animatedValueY={this.deltaY}
        >
          <View
            style={{left: 0, right: 0, height: 650, backgroundColor: "#e0e0e0"}}
          />
        </Interactable.View>
      </View>
    );
  }
}
