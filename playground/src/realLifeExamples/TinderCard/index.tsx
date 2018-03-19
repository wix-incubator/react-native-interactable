import * as React from "react";
import {View, Dimensions, Image, Text, Animated} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

export default class TinderCard extends React.PureComponent {
  private deltaX = new Animated.Value(0);

  public render() {
    return (
      <View style={styles.container}>
        <Interactable.View
          style={styles.container}
          horizontalOnly={true}
          snapPoints={[{x: 390}, {x: 0, damping: 0.8}, {x: -390}]}
          animatedValueX={this.deltaX}
        >
          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  {
                    rotate: this.deltaX.interpolate({
                      inputRange: [-250, 0, 250],
                      outputRange: ["10deg", "0deg", "-10deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <Image
              style={styles.image}
              source={require("../../../img/tinder-photo.jpg")}
            />

            <Animated.View
              style={[
                styles.overlay,
                {backgroundColor: "#de6d77"},
                {
                  opacity: this.deltaX.interpolate({
                    inputRange: [-120, 0],
                    outputRange: [0.8, 0],
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                },
              ]}
            >
              <Text style={styles.overlayText}>Trash</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.overlay,
                {backgroundColor: "#2f9a5d"},
                {
                  opacity: this.deltaX.interpolate({
                    inputRange: [0, 120],
                    outputRange: [0, 0.8],
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                },
              ]}
            >
              <Text style={styles.overlayText}>Keep</Text>
            </Animated.View>
          </Animated.View>
        </Interactable.View>

        <View style={{marginBottom: 40}}>
          <Text style={styles.text}>Swipe LEFT to trash</Text>
          <Text style={styles.text}>or RIGHT to keep</Text>
        </View>
      </View>
    );
  }
}
