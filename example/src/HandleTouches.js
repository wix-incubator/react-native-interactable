import React, { Component } from 'react';
import { StyleSheet, View, ListView, TouchableOpacity } from 'react-native';
import Interactable from 'react-native-interactable';

export default class HandleTouches extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8']),
    };
  }
  render() {
    return (
      <ListView
        contentContainerStyle={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
  renderRow(data) {
    return (
      <TouchableOpacity onPress={this.onCardPress}>
        <Interactable.View
          horizontalOnly={true}
          snapTo={[{x: 360},{x: 0},{x: -360}]}>
          <View style={styles.card} />
        </Interactable.View>
      </TouchableOpacity>
    );
  }
  onCardPress() {
    alert('Card was pressed');
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white'
  },
  card : {
    width: 300,
    height: 180,
    backgroundColor: 'red',
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 0.5
  }
});
