import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import ChatHeads from './ChatHeads';
import SwipeableCard from './SwipeableCard';
import IconDrawer from './IconDrawer';
import CollapsingHeader from './CollapsingHeader';
import MoreDrawers from './MoreDrawers';
import MoreChatHeads from './MoreChatHeads';
import HandleTouches from './HandleTouches';
import HandleRelayout from './HandleRelayout';
import SideMenu from './SideMenu';

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
        <TouchableOpacity onPress={this.onExamplePress.bind(this, ChatHeads)}>
          <Text style={styles.button}>Chat Heads</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, SwipeableCard)}>
          <Text style={styles.button}>Swipeable Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, IconDrawer)}>
          <Text style={styles.button}>Icon Drawer (row actions)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, CollapsingHeader)}>
          <Text style={styles.button}>Collapsing Header</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, MoreDrawers)}>
          <Text style={styles.button}>More Drawers (row actions)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, MoreChatHeads)}>
          <Text style={styles.button}>More Chat Heads</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, HandleTouches)}>
          <Text style={styles.button}>Handle Touches</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, HandleRelayout)}>
          <Text style={styles.button}>Handle Relayout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, SideMenu)}>
          <Text style={styles.button}>Side Menu (imperative cmds)</Text>
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
    paddingTop: 22,
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
