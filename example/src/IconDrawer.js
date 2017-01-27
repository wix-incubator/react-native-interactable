import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Interactable from 'react-native-interactable';

export default class IconDrawer extends Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={{backgroundColor: 'red'}}>
            <Interactable.View
              horizontalOnly={true}
              snapTo={[
                {x: 0, id: 'closed'},
                {x: -220, id: 'open'}
              ]}
              onSnap={this.onDrawerSnap}
            >
              <View style={{left: 0, right: 0, height: 75, backgroundColor: '#e0e0e0'}} />
            </Interactable.View>
          </View>
      </View>
    );
  }
  onDrawerSnap(event) {
    const snapPointId = event.nativeEvent.id;
    console.log(`drawer state is ${snapPointId}`);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  }
});
