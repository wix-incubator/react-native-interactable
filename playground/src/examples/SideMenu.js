import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Button, Dimensions } from 'react-native';
import Interactable from 'react-native-interactable';

const Screen = Dimensions.get('window');
const SideMenuWidth = 280;
const RemainingWidth = Screen.width - SideMenuWidth;

export default class SideMenu extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.sideMenuContainer} pointerEvents='box-none'>
          <Interactable.View
            ref='menuInstance'
            horizontalOnly={true}
            snapPoints={[{x: 0}, {x: -SideMenuWidth}]}
            boundaries={{right: RemainingWidth/2}}
            initialPosition={{x: -SideMenuWidth}}>
            <View style={styles.sideMenu}>
              <Text style={styles.sideMenuTitle}>Menu</Text>
              <TouchableOpacity onPress={() => alert('Button 1 pressed')}>
                <Text style={styles.button}>Button 1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('Button 2 pressed')}>
                <Text style={styles.button}>Button 2</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('Button 3 pressed')}>
                <Text style={styles.button}>Button 3</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onClosePress.bind(this)}>
                <Text style={styles.button}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Interactable.View>
        </View>

        <View style={styles.header}>
          <TouchableOpacity onPress={this.onMenuPress.bind(this)}>
            <Image style={styles.menuIcon} source={require('../../assets/icon-menu.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Side Menu Example</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.content}>Some Content Here</Text>
        </View>

      </View>
    );
  }
  onMenuPress() {
    this.refs['menuInstance'].setVelocity({x: 2000});
  }
  onClosePress() {
    this.refs['menuInstance'].setVelocity({x: -2000});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  sideMenuContainer: {
    position: 'absolute',
    top: 0,
    left: -RemainingWidth,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 1002
  },
  sideMenu: {
    left: 0,
    width: Screen.width,
    paddingLeft: RemainingWidth,
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingTop: 20
  },
  sideMenuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  button: {
    color: '#542790',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20
  },
  header: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: '#32B76C',
    alignItems: 'center',
    zIndex: 1001
  },
  body: {
    flex: 1,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center'
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
  content: {
    fontSize: 18
  }
});
