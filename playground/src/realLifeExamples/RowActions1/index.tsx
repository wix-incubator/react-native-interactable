import * as React from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  Slider,
  Dimensions,
} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

interface RowProps {
  damping: number;
  tension: number;
}
interface RowState {
  isMoving: boolean;
  position: number;
}
class Row extends React.PureComponent<RowProps, RowState> {
  constructor(props) {
    super(props);
    this.state = {isMoving: false, position: 1};
  }

  private deltaX = new Animated.Value(0);
  private interactableElem: any;

  private onSnap = ({nativeEvent}) => {
    const {index} = nativeEvent;
    this.setState({position: index});
  };

  private onRowPress = () => {
    const {isMoving, position} = this.state;
    if (!isMoving && position !== 1) {
      this.interactableElem.snapTo({index: 1});
    }
  };

  private onDrag = ({nativeEvent}) => {
    const {state} = nativeEvent;
    if (state === "start") {
      this.setState({isMoving: true});
    }
  };

  private onStopMoving = () => {
    this.setState({isMoving: false});
  };

  private onButtonPress = name => {
    alert(`Button ${name} pressed`);
  };

  public render() {
    const activeOpacity = this.state.position !== 1 ? 0.5 : 1;
    return (
      <View style={{backgroundColor: "#de6d77"}}>
        <View
          style={{
            position: "absolute",
            right: 0,
            height: 75,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => this.onButtonPress("trash")}
          >
            <Animated.Image
              source={require("../../../img/icon-trash.png")}
              style={[
                styles.buttonImage,
                {
                  opacity: this.deltaX.interpolate({
                    inputRange: [-150, -115],
                    outputRange: [1, 0],
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  transform: [
                    {
                      scale: this.deltaX.interpolate({
                        inputRange: [-150, -115],
                        outputRange: [1, 0.7],
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => this.onButtonPress("snooze")}
          >
            <Animated.Image
              source={require("../../../img/icon-clock.png")}
              style={[
                styles.buttonImage,
                {
                  opacity: this.deltaX.interpolate({
                    inputRange: [-75, -50],
                    outputRange: [1, 0],
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  transform: [
                    {
                      scale: this.deltaX.interpolate({
                        inputRange: [-75, -50],
                        outputRange: [1, 0.7],
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "absolute",
            left: 0,
            height: 75,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => this.onButtonPress("done")}
          >
            <Animated.Image
              source={require("../../../img/icon-check.png")}
              style={[
                styles.buttonImage,
                {
                  opacity: this.deltaX.interpolate({
                    inputRange: [50, 75],
                    outputRange: [0, 1],
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  transform: [
                    {
                      scale: this.deltaX.interpolate({
                        inputRange: [50, 75],
                        outputRange: [0.7, 1],
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            />
          </TouchableOpacity>
        </View>

        <Interactable.View
          ref={el => (this.interactableElem = el)}
          horizontalOnly={true}
          snapPoints={[
            {
              x: 75,
              damping: 1 - this.props.damping,
              tension: this.props.tension,
            },
            {
              x: 0,
              damping: 1 - this.props.damping,
              tension: this.props.tension,
            },
            {
              x: -150,
              damping: 1 - this.props.damping,
              tension: this.props.tension,
            },
          ]}
          onSnap={this.onSnap}
          onDrag={this.onDrag}
          onStop={this.onStopMoving}
          dragToss={0.01}
          animatedValueX={this.deltaX}
        >
          <TouchableHighlight
            onPress={this.onRowPress}
            activeOpacity={activeOpacity}
            underlayColor={"#dddddd"}
          >
            <View
              style={{left: 0, right: 0, height: 75, backgroundColor: "white"}}
            >
              {this.props.children}
            </View>
          </TouchableHighlight>
        </Interactable.View>
      </View>
    );
  }
}

interface State {
  damping: number;
  tension: number;
}
export default class RowActions1 extends React.PureComponent<undefined, State> {
  constructor(props) {
    super(props);
    this.state = {
      damping: 1 - 0.6,
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
