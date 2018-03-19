// TODO Finish implementation
import * as React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

const Screen = {
  height: Dimensions.get("window").height - 75,
};

export default class CollapsingHeaderWithScroll extends React.PureComponent {
  private deltaY = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      canScroll: false,
    };
  }

  private onSnap = event => {
    const {id} = event.nativeEvent;
    if (id === "bottom") {
      this.setState({canScroll: true});
      alert("This implementation is still broken, in progress");
    }
  };

  private onScroll = event => {
    const {contentOffset} = event.nativeEvent;
    if (contentOffset.y === 0) {
      this.setState({canScroll: false});
    }
  };

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
          snapPoints={[{y: 0}, {y: -150, id: "bottom"}]}
          boundaries={{top: -150}}
          onSnap={this.onSnap}
          animatedValueY={this.deltaY}
        >
          <ScrollView
            bounces={false}
            canCancelContentTouches={this.state.canScroll}
            onScroll={this.onScroll}
            style={{
              left: 0,
              right: 0,
              height: Screen.height - 100,
              backgroundColor: "#e0e0e0",
            }}
          >
            <View style={styles.placeholder} />
            <View style={styles.placeholder} />
            <View style={styles.placeholder} />
            <View style={styles.placeholder} />
            <View style={styles.placeholder} />
            <View style={styles.placeholder} />
            <View style={styles.placeholder} />
          </ScrollView>
        </Interactable.View>
      </View>
    );
  }
}
