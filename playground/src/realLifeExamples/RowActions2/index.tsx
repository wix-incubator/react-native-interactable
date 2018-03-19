import * as React from "react";
import {
  View,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
  Slider,
} from "react-native";
import Interactable from "react-native-interactable";

import styles, {Screen} from "./styles";

interface RowProps {
  tension: number;
  damping: number;
}
class Row extends React.PureComponent<RowProps> {
  private deltaX = new Animated.Value(0);

  private onButtonPress(name) {
    alert(`Button ${name} pressed`);
  }

  public render() {
    return (
      <View style={{backgroundColor: "#ceced2"}}>
        <View
          style={{position: "absolute", left: 0, right: 0, height: 75}}
          pointerEvents="box-none"
        >
          <Animated.View
            style={[
              styles.trashHolder,
              {
                transform: [
                  {
                    translateX: this.deltaX.interpolate({
                      inputRange: [-155, 0],
                      outputRange: [0, 155],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => this.onButtonPress("trash")}
              style={styles.button}
            >
              <Image
                style={styles.button}
                source={require("../../../img/icon-trash.png")}
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[
              styles.snoozeHolder,
              {
                transform: [
                  {
                    translateX: this.deltaX.interpolate({
                      inputRange: [-155, 0],
                      outputRange: [0, 78],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => this.onButtonPress("snooze")}
              style={styles.button}
            >
              <Image
                style={styles.button}
                source={require("../../../img/icon-clock.png")}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View
          style={{position: "absolute", left: 0, right: 0, height: 75}}
          pointerEvents="box-none"
        >
          <Animated.View
            style={[
              styles.doneHolder,
              {
                transform: [
                  {
                    translateX: this.deltaX.interpolate({
                      inputRange: [0, 78],
                      outputRange: [-78, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => this.onButtonPress("done")}
              style={styles.button}
            >
              <Image
                style={styles.button}
                source={require("../../../img/icon-check.png")}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Interactable.View
          horizontalOnly={true}
          snapPoints={[
            {
              x: 78,
              damping: 1 - this.props.damping,
              tension: this.props.tension,
            },
            {
              x: 0,
              damping: 1 - this.props.damping,
              tension: this.props.tension,
            },
            {
              x: -155,
              damping: 1 - this.props.damping,
              tension: this.props.tension,
            },
          ]}
          animatedValueX={this.deltaX}
        >
          <View
            style={{left: 0, right: 0, height: 75, backgroundColor: "white"}}
          >
            {this.props.children}
          </View>
        </Interactable.View>
      </View>
    );
  }
}
interface State {
  damping: number;
  tension: number;
}
export default class RowActions2 extends React.PureComponent<undefined, State> {
  constructor(props) {
    super(props);
    this.state = {
      damping: 1 - 0.7,
      tension: 300,
    };
  }
  public render() {
    return (
      <View style={styles.container}>
        <Row damping={this.state.damping} tension={this.state.tension}>
          <View style={styles.rowContent}>
            <View style={styles.rowIcon} />
            <View>
              <Text style={styles.rowTitle}>Row Title</Text>
              <Text style={styles.rowSubtitle}>
                Drag the row left and right
              </Text>
            </View>
          </View>
        </Row>
        <Row damping={this.state.damping} tension={this.state.tension}>
          <View style={styles.rowContent}>
            <View style={styles.rowIcon} />
            <View>
              <Text style={styles.rowTitle}>Another Row</Text>
              <Text style={styles.rowSubtitle}>You can drag this row too</Text>
            </View>
          </View>
        </Row>
        <Row damping={this.state.damping} tension={this.state.tension}>
          <View style={styles.rowContent}>
            <View style={styles.rowIcon} />
            <View>
              <Text style={styles.rowTitle}>And A Third</Text>
              <Text style={styles.rowSubtitle}>
                This row can also be swiped
              </Text>
            </View>
          </View>
        </Row>

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
