import * as React from "react";
import {
  View,
  Dimensions,
  Image,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import Interactable from "react-native-interactable";

import styles, {Screen} from "./styles";

export default class MapPanel extends React.PureComponent {
  private deltaY = new Animated.Value(Screen.height - 100);

  public render() {
    return (
      <View style={styles.container}>
        <Image style={styles.map} source={require("../../../img/map-bg.jpg")} />

        <View style={styles.panelContainer} pointerEvents={"box-none"}>
          <Animated.View
            pointerEvents={"box-none"}
            style={[
              styles.panelContainer,
              {
                backgroundColor: "black",
                opacity: this.deltaY.interpolate({
                  inputRange: [0, Screen.height - 100],
                  outputRange: [0.5, 0],
                  extrapolateRight: "clamp",
                }),
              },
            ]}
          />
          <Interactable.View
            verticalOnly={true}
            snapPoints={[
              {y: 40},
              {y: Screen.height - 300},
              {y: Screen.height - 100},
            ]}
            boundaries={{top: -300}}
            initialPosition={{y: Screen.height - 100}}
            animatedValueY={this.deltaY}
          >
            <View style={styles.panel}>
              <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
              </View>
              <Text style={styles.panelTitle}>San Francisco Airport</Text>
              <Text style={styles.panelSubtitle}>
                International Airport - 40 miles away
              </Text>
              <View style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>Directions</Text>
              </View>
              <View style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>Search Nearby</Text>
              </View>
              <Image
                style={styles.photo}
                source={require("../../../img/airport-photo.jpg")}
              />
            </View>
          </Interactable.View>
        </View>
      </View>
    );
  }
}
