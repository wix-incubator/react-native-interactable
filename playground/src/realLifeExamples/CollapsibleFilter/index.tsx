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

const Screen = Dimensions.get("window");

import styles from "./styles";

export default class CollapsibleFilter extends React.PureComponent {
  private deltaY = new Animated.Value(0);
  public render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.filterContainer,
            {
              transform: [
                {
                  translateY: this.deltaY.interpolate({
                    inputRange: [-130, -50],
                    outputRange: [-33, 0],
                    extrapolateRight: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.filterTop,
              {
                opacity: this.deltaY.interpolate({
                  inputRange: [-90, -20],
                  outputRange: [0, 1],
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              },
            ]}
          >
            <TouchableOpacity
              onPress={() =>
                alert("Tip: drag content up to see the filter collapse")
              }
            >
              <Image
                style={styles.filterUp}
                source={require("../../../img/icon-up.png")}
              />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity onPress={() => alert("Anywhere pressed")}>
            <View style={styles.filterField}>
              <Text style={styles.filterFieldText}>Anywhere</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Anytime pressed")}>
            <Animated.View
              style={[
                styles.filterField,
                {
                  opacity: this.deltaY.interpolate({
                    inputRange: [-70, -50],
                    outputRange: [0, 1],
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                },
              ]}
            >
              <Text style={styles.filterFieldText}>Anytime</Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Anything pressed")}>
            <Animated.View
              style={[
                styles.filterField,
                {
                  opacity: this.deltaY.interpolate({
                    inputRange: [-20, 0],
                    outputRange: [0, 1],
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                },
              ]}
            >
              <Text style={styles.filterFieldText}>Anything</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        <Interactable.View
          verticalOnly={true}
          snapPoints={[{y: 0}, {y: -130}]}
          boundaries={{top: -200}}
          animatedValueY={this.deltaY}
        >
          <View style={styles.content}>
            <Text style={styles.panelTitle}>San Francisco Airport</Text>
            <Text style={styles.panelSubtitle}>
              International Airport - 40 miles away
            </Text>
            <Image
              style={styles.photo}
              source={require("../../../img/airport-photo.jpg")}
            />
            <View style={styles.panelButton}>
              <Text style={styles.panelButtonTitle}>Directions</Text>
            </View>
            <View style={styles.panelButton}>
              <Text style={styles.panelButtonTitle}>Search Nearby</Text>
            </View>
          </View>
        </Interactable.View>
      </View>
    );
  }
}
