import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import Interactable from 'react-native-interactable';

export default class HandleTouches extends Component {
  
  render() {
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8']}
        keyExtractor={item => item}
        renderItem={this.renderRow}
      />
    );
  }
  renderRow = (data) => {
    return (
      <Interactable.View
        horizontalOnly={true}
        snapPoints={[{x: 360},{x: 0},{x: -360}]}>
        <TouchableOpacity style={styles.card} onPress={this.onCardPress}>
          <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this, 'A')}>
            <Text style={{textAlign: 'center'}}>Button A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this, 'B')}>
            <Text style={{textAlign: 'center'}}>Button B</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Interactable.View>
    );
  }
  onCardPress() {
    alert('Card was pressed');
  }
  onButtonPress(type) {
    alert(`Button ${type} was pressed`);
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white'
  },
  card: {
    width: 300,
    height: 180,
    backgroundColor: '#32B76C',
    borderRadius: 8,
    marginVertical: 6
  },
  button: {
    width: 80,
    height: 40,
    marginLeft: 30,
    marginTop: 30,
    justifyContent: 'center',
    backgroundColor: '#b5d9f8'
  }
});
