import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import ChatHeads from './ChatHeads';
import RowActions1 from './RowActions1';
import RowActions2 from './RowActions2';
import NowCard from './NowCard';
import TinderCard from './TinderCard';

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExample: undefined
    }
  }

  render() {
    if (this.state.currentExample) {
      const ExampleComponent = this.state.currentExample;
      return <ExampleComponent />;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, ChatHeads)}>
          <Text style={styles.button}>Chat Heads</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, RowActions1)}>
          <Text style={styles.button}>Row Actions 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, RowActions2)}>
          <Text style={styles.button}>Row Actions 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, NowCard)}>
          <Text style={styles.button}>Now Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, TinderCard)}>
          <Text style={styles.button}>Tinder Card</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onExamplePress(currentExample) {
    this.setState({currentExample});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    color: 'blue',
    fontSize: 24,
    marginBottom: 24
  }
});

AppRegistry.registerComponent('example', () => example);
