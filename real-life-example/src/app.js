import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView
} from 'react-native';

import Documentation from './Documentation';
import RowActions1 from './RowActions1';
import RowActions2 from './RowActions2';
import NowCard from './NowCard';
import TinderCard from './TinderCard';
import NotifPanel from './NotifPanel';
import MapPanel from './MapPanel';
import CollapsibleFilter from './CollapsibleFilter';
import CollapsibleCalendar from './CollapsibleCalendar';
import ChatHeads from './ChatHeads';
import UxInspirations from './UxInspirations';

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExample: undefined
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={this.onMenuPress.bind(this)}>
            <Image style={styles.menuIcon} source={require('../img/icon-menu.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>React Native Interactions</Text>
        </View>

        <View style={styles.body}>
          {this.renderContent()}
        </View>

      </View>
    );
  }

  renderContent() {
    if (this.state.currentExample) {
      const ExampleComponent = this.state.currentExample;
      return <ExampleComponent />;
    }

    return (
      <ScrollView style={styles.menuContainer}>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, Documentation)}>
          <Text style={styles.button2}>Documentation</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, RowActions1)}>
          <Text style={styles.button}>Row Actions (Google Style)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, RowActions2)}>
          <Text style={styles.button}>Row Actions (Apple Style)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, NowCard)}>
          <Text style={styles.button}>Google Now-Style Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, TinderCard)}>
          <Text style={styles.button}>Tinder-Style Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, NotifPanel)}>
          <Text style={styles.button}>Notification Panel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, MapPanel)}>
          <Text style={styles.button}>Apple Maps-Style Panel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, CollapsibleFilter)}>
          <Text style={styles.button}>Collapsible Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, CollapsibleCalendar)}>
          <Text style={styles.button}>Collapsible Calendar (Any.do-Style)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, ChatHeads)}>
          <Text style={styles.button}>Chat Heads</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, UxInspirations)}>
          <Text style={styles.button2}>UX Inspirations</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  onExamplePress(currentExample) {
    this.setState({currentExample});
  }

  onMenuPress() {
    this.setState({currentExample: undefined});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  header: {
    height: 75,
    paddingTop: 14,
    paddingLeft: 20,
    flexDirection: 'row',
    backgroundColor: '#5894f3',
    alignItems: 'center',
    zIndex: 1001
  },
  body: {
    flex: 1,
    zIndex: 1000
  },
  menuContainer: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 40,
    backgroundColor: '#223f6b'
  },
  menuIcon: {
    width: 30,
    height: 30
  },
  headerTitle: {
    marginLeft: 30,
    color: 'white',
    fontSize: 20
  },
  button: {
    color: '#e0e0e0',
    fontSize: 20,
    marginBottom: 24
  },
  button2: {
    color: '#F09B95',
    fontSize: 20,
    marginBottom: 24
  }
});

AppRegistry.registerComponent('example', () => example);
