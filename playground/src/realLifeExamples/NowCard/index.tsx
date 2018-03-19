import * as React from "react";
import {View, Dimensions, Image, Text, Animated, Slider} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

interface State {
  damping: number;
  tension: number;
}
export default class NowCard extends React.PureComponent<undefined, State> {
  constructor(props) {
    super(props);

    this.state = {
      damping: 1 - 0.7,
      tension: 300,
    };
  }

  private deltaX = new Animated.Value(0);

  public render() {
    return (
      <View style={styles.container}>
        <Interactable.View
          horizontalOnly={true}
          snapPoints={[
            {x: 360},
            {
              x: 0,
              damping: 1 - this.state.damping,
              tension: this.state.tension,
            },
            {x: -360},
          ]}
          animatedValueX={this.deltaX}
        >
          <Animated.View
            style={[
              styles.card,
              {
                opacity: this.deltaX.interpolate({
                  inputRange: [-300, 0, 300],
                  outputRange: [0, 1, 0],
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              },
            ]}
          >
            <Text style={styles.header}>Info for you</Text>
            <Image
              style={styles.image}
              source={require("../../../img/card-photo.jpg")}
            />
            <Text style={styles.title}>Card Title</Text>
            <Text style={styles.body}>
              This is the card body, it can be long
            </Text>
          </Animated.View>
        </Interactable.View>

        <View style={styles.playground}>
          <Text style={styles.playgroundLabel}>Change spring damping:</Text>
          <Slider
            key="damping"
            style={styles.slider}
            value={this.state.damping}
            minimumValue={0.1}
            maximumValue={0.6}
            minimumTrackTintColor={"#007AFF"}
            maximumTrackTintColor={"white"}
            thumbTintColor={"white"}
            onSlidingComplete={value => this.setState({damping: value})}
          />
          <Text style={styles.playgroundLabel}>Change spring tension:</Text>
          <Slider
            key="tension"
            style={styles.slider}
            value={this.state.tension}
            minimumValue={0.0}
            maximumValue={1000.0}
            minimumTrackTintColor={"#007AFF"}
            maximumTrackTintColor={"white"}
            thumbTintColor={"white"}
            onSlidingComplete={value => this.setState({tension: value})}
          />
        </View>
      </View>
    );
  }
}
