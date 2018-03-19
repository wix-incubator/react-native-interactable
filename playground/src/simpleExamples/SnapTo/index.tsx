import * as React from "react";
import {StyleSheet, View, Button} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

interface State {
  snapToIndex: number;
}

export default class SnapTo extends React.PureComponent<undefined, State> {
  constructor(props) {
    super(props);
    this.state = {
      snapToIndex: 0,
    };
  }

  private headInstanceRef: any;

  private onButtonPress = () => {
    this.headInstanceRef.snapTo({index: this.state.snapToIndex});
    this.setState({
      snapToIndex: (this.state.snapToIndex + 1) % 10,
    });
  };

  public render() {
    return (
      <View style={styles.container}>
        <Interactable.View
          ref={ref => (this.headInstanceRef = ref)}
          snapPoints={[
            {x: -140, y: -250},
            {x: 140, y: -250},
            {x: -140, y: -120},
            {x: 140, y: -120},
            {x: -140, y: 0},
            {x: 140, y: 0},
            {x: -140, y: 120},
            {x: 140, y: 120},
            {x: -140, y: 250},
            {x: 140, y: 250},
          ]}
          initialPosition={{x: 140, y: 250}}
        >
          <View
            style={{
              width: 70,
              height: 70,
              backgroundColor: "red",
              borderRadius: 35,
            }}
          />
        </Interactable.View>
        <View style={styles.button}>
          <Button title="Snap To Next" onPress={this.onButtonPress} />
        </View>
      </View>
    );
  }
}
