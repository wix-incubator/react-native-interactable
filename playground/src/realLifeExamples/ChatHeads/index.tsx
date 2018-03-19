import * as React from "react";
import {View, Image, Animated, Dimensions} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

const widthFactor = Dimensions.get("window").width / 375;
const heightFactor = (Dimensions.get("window").height - 75) / 667;

const showSecondFace = true;
export default class ChatHeads extends React.PureComponent {
  private deltaX = new Animated.Value(0);
  private deltaY = new Animated.Value(0);
  private face1Scale = new Animated.Value(1);
  private face2Scale = new Animated.Value(1);

  private onStopInteraction(event, scaleValue) {
    const x = event.nativeEvent.x;
    const y = event.nativeEvent.y;
    if (x > -10 && x < 10 && y < 210 * heightFactor && y > 190 * heightFactor) {
      Animated.timing(scaleValue, {toValue: 0, duration: 300}).start();
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.frame}>
          <Animated.Image
            source={require("../../../img/chatheads-delete.png")}
            style={[
              styles.marker,
              {top: 200 * heightFactor},
              {
                opacity: this.deltaY.interpolate({
                  inputRange: [-10 * heightFactor, 50 * heightFactor],
                  outputRange: [0, 1],
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: [
                  {
                    translateX: this.deltaX.interpolate({
                      inputRange: [-140 * widthFactor, 140 * widthFactor],
                      outputRange: [-10, 10],
                    }),
                  },
                  {
                    translateY: this.deltaY.interpolate({
                      inputRange: [
                        -30 * heightFactor,
                        50 * heightFactor,
                        270 * heightFactor,
                      ],
                      outputRange: [50 * heightFactor, -10, 10],
                      extrapolateLeft: "clamp",
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
        <View style={styles.frame} pointerEvents="box-none">
          <Interactable.View
            snapPoints={[
              {x: -140 * widthFactor, y: 0},
              {x: -140 * widthFactor, y: -140 * heightFactor},
              {x: -140 * widthFactor, y: 140 * heightFactor},
              {x: -140 * widthFactor, y: -270 * heightFactor},
              {x: -140 * widthFactor, y: 270 * heightFactor},
              {x: 140 * widthFactor, y: 0},
              {x: 140 * widthFactor, y: 140 * heightFactor},
              {x: 140 * widthFactor, y: -140 * heightFactor},
              {x: 140 * widthFactor, y: -270 * heightFactor},
              {x: 140 * widthFactor, y: 270 * heightFactor},
            ]}
            dragWithSpring={{tension: 2000, damping: 0.5}}
            gravityPoints={[
              {
                x: 0,
                y: 200 * heightFactor,
                strength: 8000,
                falloff: 40,
                damping: 0.5,
                haptics: true,
              },
            ]}
            onStop={event => this.onStopInteraction(event, this.face1Scale)}
            animatedValueX={this.deltaX}
            animatedValueY={this.deltaY}
            initialPosition={{x: -140 * widthFactor, y: -270 * heightFactor}}
          >
            <Animated.View
              style={[
                styles.head,
                {
                  transform: [
                    {
                      scale: this.face1Scale,
                    },
                  ],
                },
              ]}
            >
              <Image
                style={styles.image}
                source={require("../../../img/chatheads-face1.jpg")}
              />
            </Animated.View>
          </Interactable.View>
        </View>

        {!showSecondFace ? (
          false
        ) : (
          <View style={styles.frame} pointerEvents="box-none">
            <Interactable.View
              snapPoints={[
                {x: -140 * widthFactor, y: 20 * heightFactor},
                {x: -140 * widthFactor, y: -120 * heightFactor},
                {x: -140 * widthFactor, y: 160 * heightFactor},
                {x: -140 * widthFactor, y: -250 * heightFactor},
                {x: -140 * widthFactor, y: 290 * heightFactor},
                {x: 140 * widthFactor, y: 20 * heightFactor},
                {x: 140 * widthFactor, y: 160 * heightFactor},
                {x: 140 * widthFactor, y: -120 * heightFactor},
                {x: 140 * widthFactor, y: -250 * heightFactor},
                {x: 140 * widthFactor, y: 290 * heightFactor},
              ]}
              dragWithSpring={{tension: 2000, damping: 0.5}}
              gravityPoints={[
                {
                  x: 0,
                  y: 200 * heightFactor,
                  strength: 8000,
                  falloff: 40,
                  damping: 0.5,
                  haptics: true,
                },
              ]}
              onStop={event => this.onStopInteraction(event, this.face2Scale)}
              animatedValueX={this.deltaX}
              animatedValueY={this.deltaY}
              initialPosition={{x: 140 * widthFactor, y: -250 * heightFactor}}
            >
              <Animated.View
                style={[
                  styles.head,
                  {
                    transform: [
                      {
                        scale: this.face2Scale,
                      },
                    ],
                  },
                ]}
              >
                <Image
                  style={styles.image}
                  source={require("../../../img/chatheads-face2.jpg")}
                />
              </Animated.View>
            </Interactable.View>
          </View>
        )}
      </View>
    );
  }
}
