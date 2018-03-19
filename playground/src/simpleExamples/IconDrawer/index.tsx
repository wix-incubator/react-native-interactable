import * as React from "react";
import {StyleSheet, View, Animated} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

export default class IconDrawer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  private deltaX = new Animated.Value(0);

  private onDrawerSnap(event) {
    const snapPointId = event.nativeEvent.id;
    console.log(`drawer state is ${snapPointId}`);
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: "red"}}>
          <View
            style={{
              position: "absolute",
              right: 0,
              height: 75,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Animated.View
              style={[
                styles.button,
                {
                  opacity: this.deltaX.interpolate({
                    inputRange: [-230, -230, -180, -180],
                    outputRange: [1, 1, 0, 0],
                  }),
                  transform: [
                    {
                      scale: this.deltaX.interpolate({
                        inputRange: [-230, -230, -180, -180],
                        outputRange: [1, 1, 0.8, 0.8],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.button,
                {
                  opacity: this.deltaX.interpolate({
                    inputRange: [-165, -165, -115, -115],
                    outputRange: [1, 1, 0, 0],
                  }),
                  transform: [
                    {
                      scale: this.deltaX.interpolate({
                        inputRange: [-165, -165, -115, -115],
                        outputRange: [1, 1, 0.8, 0.8],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.button,
                {
                  opacity: this.deltaX.interpolate({
                    inputRange: [-100, -100, -50, -50],
                    outputRange: [1, 1, 0, 0],
                  }),
                  transform: [
                    {
                      scale: this.deltaX.interpolate({
                        inputRange: [-100, -100, -50, -50],
                        outputRange: [1, 1, 0.8, 0.8],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>

          <Interactable.View
            horizontalOnly={true}
            snapPoints={[{x: 0, id: "closed"}, {x: -230, id: "open"}]}
            onSnap={this.onDrawerSnap}
            animatedValueX={this.deltaX}
          >
            <View
              style={{
                left: 0,
                right: 0,
                height: 75,
                backgroundColor: "#e0e0e0",
              }}
            />
          </Interactable.View>
        </View>
      </View>
    );
  }
}
