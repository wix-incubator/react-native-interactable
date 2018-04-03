import React, { Component } from 'react';
import { StyleSheet, View, WebView, ActivityIndicator } from 'react-native';

const injectedJs =
  '[].forEach.call(document.querySelectorAll("img"),function(e){e.parentNode.removeChild(e);});' +
  '[].forEach.call(document.querySelectorAll("div.breadcrumb"),function(e){e.parentNode.removeChild(e);});' +
  '[].forEach.call(document.querySelectorAll("div.reponav-wrapper"),function(e){e.parentNode.removeChild(e);});' +
  '[].forEach.call(document.querySelectorAll("footer"),function(e){e.parentNode.removeChild(e);});' +
  '[].forEach.call(document.querySelectorAll("button.header-button"),function(e){e.parentNode.removeChild(e);});';

export default class UxInspirations extends Component {
  render() {
    return (
      <WebView
        style={styles.container}
        source={{uri: 'https://github.com/wix/react-native-interactable/blob/master/UX-INSPIRATIONS.md'}}
        renderLoading={this.renderLoading}
        startInLoadingState={true}
        injectedJavaScript={injectedJs}
      />
    );
  }
  renderLoading() {
    return (
      <ActivityIndicator
        style={styles.container}
        animating={true}
        size='large'
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
