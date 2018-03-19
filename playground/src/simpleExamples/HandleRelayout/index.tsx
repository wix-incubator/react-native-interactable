import * as React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

interface State {
  collapsed: boolean;
}

export default class HandleRelayout extends React.PureComponent<
  undefined,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  private onChangeLayoutPress = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  public render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onChangeLayoutPress}>
          <View
            style={[
              styles.card,
              {
                justifyContent: "center",
                backgroundColor: "green",
                height: this.state.collapsed ? 80 : 180,
              },
            ]}
          >
            <Text style={styles.label}>
              Tap to {this.state.collapsed ? "expand" : "collapse"}
            </Text>
          </View>
        </TouchableOpacity>

        <Interactable.View
          horizontalOnly={true}
          snapPoints={[{x: 230}, {x: 0}, {x: -230}]}
        >
          <View style={styles.card} />
        </Interactable.View>
      </View>
    );
  }
}
