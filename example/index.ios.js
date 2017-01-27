import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Button,
  View
} from 'react-native';
import ChatHeads from './src/ChatHeads';
import SwipeableCard from './src/SwipeableCard';
import IconDrawer from './src/IconDrawer';
import CollapsingHeader from './src/CollapsingHeader';

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
        <Button title="Chat Heads" onPress={this.onExamplePress.bind(this, ChatHeads)} />
        <Button title="Swipeable Card" onPress={this.onExamplePress.bind(this, SwipeableCard)} />
        <Button title="Icon Drawer" onPress={this.onExamplePress.bind(this, IconDrawer)} />
        <Button title="Collapsing Header" onPress={this.onExamplePress.bind(this, CollapsingHeader)} />
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
  }
});

AppRegistry.registerComponent('example', () => example);
