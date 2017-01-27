import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import _ from 'lodash';
import Interactable from 'react-native-interactable';

export default class SwipeableCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        {_.times(3, (i) =>
          <Interactable.View
            key={i}
            horizontalOnly={true}
            snapTo={[
              {x: 350},
              {x: 0},
              {x: -350}
            ]}
          >
            <View style={{width: 300, height: 200, backgroundColor: 'red', borderRadius: 8, marginVertical: 6}} />
          </Interactable.View>
        )}
      </View>
    );
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
