import * as React from "react";
import {StyleSheet, View, ListView, TouchableOpacity, Text} from "react-native";
import Interactable from "react-native-interactable";

import styles from "./styles";

export default class HandleTouches extends React.PureComponent {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        "card1",
        "card2",
        "card3",
        "card4",
        "card5",
        "card6",
        "card7",
        "card8",
      ]),
    };
  }

  private renderRow = data => {
    return (
      <Interactable.View
        horizontalOnly={true}
        snapPoints={[{x: 360}, {x: 0}, {x: -360}]}
      >
        <TouchableOpacity style={styles.card} onPress={this.onCardPress}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onButtonPress.bind(this, "A")}
          >
            <Text style={{textAlign: "center"}}>Button A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onButtonPress.bind(this, "B")}
          >
            <Text style={{textAlign: "center"}}>Button B</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Interactable.View>
    );
  };

  private onCardPress = () => {
    alert("Card was pressed");
  };

  private onButtonPress = type => {
    alert(`Button ${type} was pressed`);
  };
  public render() {
    return (
      <ListView
        contentContainerStyle={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}
