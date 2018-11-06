import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  AppRegistry,
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';

// Basic Examples
import ChatHeads from './examples/ChatHeads';
import SwipeableCard from './examples/SwipeableCard';
import IconDrawer from './examples/IconDrawer';
import CollapsingHeader from './examples/CollapsingHeader';
import MoreDrawers from './examples/MoreDrawers';
import MoreChatHeads from './examples/MoreChatHeads';
import HandleTouches from './examples/HandleTouches';
import TouchesInside from './examples/TouchesInside';
import TouchesInsideStatic from './examples/TouchesInsideStatic';
import HandleRelayout from './examples/HandleRelayout';
import SideMenu from './examples/SideMenu';
import SnapTo from './examples/SnapTo';
import ChangePosition from './examples/ChangePosition';
import AlertAreas from './examples/AlertAreas';
import CollapsingHeaderWithScroll from './examples/CollapsingHeaderWithScroll';

// Real life Examples
import Documentation from './real-life-examples/Documentation';
import RowActions1 from './real-life-examples/RowActions1';
import RowActions2 from './real-life-examples/RowActions2';
import NowCard from './real-life-examples/NowCard';
import TinderCard from './real-life-examples/TinderCard';
import NotifPanel from './real-life-examples/NotifPanel';
import MapPanel from './real-life-examples/MapPanel';
import CollapsibleFilter from './real-life-examples/CollapsibleFilter';
import CollapsibleCalendar from './real-life-examples/CollapsibleCalendar';
import RealChatHeads from './real-life-examples/RealChatHeads';
import UxInspirations from './real-life-examples/UxInspirations';


const {height, width} = Dimensions.get('window');
const isIphoneX = (Platform.OS === 'ios') && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812);

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExample: undefined
    }
  }

  render() {
    return (
      <View style={styles.container} testID={'Overview'}>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={this.onMenuPress.bind(this)}>
            <Image style={styles.menuIcon} source={require('../assets/icon-menu.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>React Native Interactable</Text>
        </SafeAreaView>
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

        <Text style={styles.seperatorText}>Basic Examples</Text>
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
        <TouchableOpacity onPress={this.onExamplePress.bind(this, TouchesInside)}>
          <Text style={styles.button}>Touches Inside (interactive)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, TouchesInsideStatic)}>
          <Text style={styles.button}>Touches Inside (static)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, HandleRelayout)}>
          <Text style={styles.button}>Handle Relayout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, SideMenu)}>
          <Text style={styles.button}>Side Menu (imperative cmd)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, SnapTo)}>
          <Text style={styles.button}>Snap To (imperative cmd)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, ChangePosition)}>
          <Text style={styles.button}>Change Position (imperative cmd)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, AlertAreas)}>
          <Text style={styles.button}>Alert Areas and Drag Event</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, CollapsingHeaderWithScroll)}>
          <Text style={styles.button}>Collapsing Header with Scroll</Text>
        </TouchableOpacity>
        
        <Text style={[styles.seperatorText, {marginTop: 20}]}>Real Life Examples</Text>
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
        <TouchableOpacity onPress={this.onExamplePress.bind(this, RealChatHeads)}>
          <Text style={styles.button}>Real Chat Heads</Text>
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
    height: isIphoneX ? 100 : (Platform.OS === 'ios') ? 70 : 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: '#459FED',
    alignItems: 'center',
    alignContent: 'center',
    zIndex: 1001
  },
  body: {
    flex: 1,
    zIndex: 1000
  },
  menuContainer: {
    flex: 1,
    padding: 24
  },
  menuIcon: {
    width: 30,
    height: 30
  },
  headerTitle: {
    marginLeft: 24,
    color: 'white',
    fontSize: 20
  },
  seperatorText: {
    color: 'black',
    marginBottom: 20,
    borderBottomWidth: 1,
    fontSize: 20,
    fontWeight: '800'
  },
  button: {
    color: 'black',
    fontSize: 20,
    marginBottom: 24
  },
  button2: {
    color: '#F2564D',
    fontSize: 20,
    marginBottom: 48
  }
});

AppRegistry.registerComponent('example', () => example);
