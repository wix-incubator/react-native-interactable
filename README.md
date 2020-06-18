<img src="http://i.imgur.com/ErA2GQo.gif" width=200 />&nbsp;&nbsp;&nbsp;&nbsp;
<img src="http://i.imgur.com/pH6oB5D.gif" width=200 />&nbsp;&nbsp;&nbsp;&nbsp;
<img src="http://i.imgur.com/J5l2Qvq.gif" width=200 />&nbsp;&nbsp;&nbsp;&nbsp;
<img src="http://i.imgur.com/dWFYZBG.gif" width=200 />

# Interactable
> react-native-interactable

<br>

[![NPM Version](https://img.shields.io/npm/v/react-native-interactable.svg?style=flat)](https://www.npmjs.com/package/react-native-interactable)
[![Build Status](https://img.shields.io/jenkins/s/http/jenkins-oss.wixpress.com:8080/job/multi-react-native-interactable-master.svg)](https://jenkins-oss.wixpress.com/job/multi-react-native-interactable-master/)
[![NPM Downloads](https://img.shields.io/npm/dm/react-native-interactable.svg?style=flat)](https://www.npmjs.com/package/react-native-interactable)

### LOOKING FOR A MAINTAINER

We love this project, but currently we don’t have enough time to work on it. So we are looking for a maintainer. If you have enough time and knowledge and want to become one - please let us know (levv@wix.com, sergeyi@wix.com)

<br>

### Description

* [Installation](#installation)
* [Example](#example)
* [Usage](#usage)
* [Implementation Details](#implementation-details)

<br>
This is an experimental implementation of a declarative API for handling fluid user interactions with views at 60 FPS in React Native. Here are some example use-cases for views that users can interact with:

* **Swipeable card** (a la Google Now) springing into place unless swiped away with enough force
* **Drawer** snapping between closed and open with buttons appearing gradually as it's being dragged
* **Collapsible header** that snaps to a smaller size as the content below is being scrolled
* **Chat heads** (a la Facebook Messenger) that can be dragged around but snap to corners of the screen

All of these use-cases have views that continuously interact with the user's gestures. These interactions are normally physical in nature, having properties like springiness, friction, elasticity and damping. In order to feel natural on a touch device they need to run at 60 FPS.

### Why is this challenging?

The async nature of the React Native bridge incurs an inherent performance penalty. This traditionally prevents JavaScript code from running at high framerates. One of the most noticeable challenges is animations in JavaScript, which aren't guaranteed to run at 60 FPS.

Modern animation libraries for React Native, like [Animated](https://facebook.github.io/react-native/docs/animated.html), tackle this challenge with a declarative approach. In order to minimize passes over the bridge, animations are only declared in JavaScript but executed by a native driver on the other side - in 60 FPS.

Fluid user interactions take this a step further than animations. Interactions require UI to continuously react to the user's gestures. This library is designed to support complex physical interactions with ease, using a full-fledged physics engine to drive the interaction on the native side.

### Why is it named interactable?

First off, we are aware that *interactable* isn't a real word. The correct form is *interactive* but this has connotation that isn't necessarily related to physical interactions. Similar to `Animated.View`, we wanted to have `Interactable.View` - meaning a view you can interact with. And hey, [Unity](https://docs.unity3d.com/ScriptReference/UI.Selectable-interactable.html) did it too.

<br>

## Installation

**Requires RN 0.40 and above.**

* Install the package from npm

```
npm install react-native-interactable --save
```

* Link the native library to your project

```
react-native link react-native-interactable
```

Note: instead of linking automatically you can also link manually according to these [instructions](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#manual-linking)

```
node_modules/react-native-interactable/ios/Interactable.xcodeproj
```

**Manually link via Cocoa Pods (iOS)**

* Add the following to your `Podfile` and run `pod update`:

```
pod 'Interactable', :path => '../node_modules/react-native-interactable'
```

<br>

## Example

<br><br>The [playground](https://github.com/wix/react-native-interactable/tree/master/playground) project has few use-cases implemented like: *swipeable card*, *drawer*, *collapsible header* and *chat heads* under the "Basic examples" section. It's simplistic but easy to learn from.
<br><br>Under the "Real life example" you'll find more complex demonstrations. They're harder to learn from, but they're cool to watch. More info about the [UX inspirations](https://github.com/wix/react-native-interactable/blob/master/UX-INSPIRATIONS.md) for the demo app.

* **Build and run the example project**
To see the library in action, clone the repo and run the playground from the root folder:<br>
```
  npm start
  npm run ios
```
<br><br>*Note: It's recommended to experience it on a [real device](http://facebook.github.io/react-native/docs/running-on-device.html) and not on a simulator. The simulator has poor performance so the framerate isn't like the real thing.*
<br><br>


## Usage

The core of this library is the `Interactable.View` component, used to wrap views you want to interact with:

```jsx
import Interactable from 'react-native-interactable';

<Interactable.View
  horizontalOnly={true}
  snapPoints={[{x: 0}, {x: -200}]}
  onSnap={this.onDrawerSnap}>

  // the view that you wrap here will now support interactions

</Interactable.View>
```
<br>

### `Interactable.View` Props

[Click here for the full reference for all props](https://github.com/wix/react-native-interactable/blob/master/PROPS.md)

* [`snapPoints`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#snappoints-array-of-points) - a list of points the view will snap to after being dragged by the user

```jsx
snapPoints={[{x: 0}, {x: -200}]}
```

* [`springPoints`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#springpoints-array-of-points) - connect the view's center to a group of constant springs

```jsx
springPoints={[{x: 0, tension: 6000, damping: 0.5, influenceArea: {left: 0}}]}
```

* [`gravityPoints`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#gravitypoints-array-of-points) - attract/repel the view's center with a group of constant gravity wells

```jsx
gravityPoints={[{x: 0, y: 0, strength: 8000, falloff: 40, damping: 0.5}]}
```

* [`frictionAreas`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#frictionareas-array-of-areas) - add friction to the view's movement with a group of friction regions

```jsx
frictionAreas={[{damping: 0.5, influenceArea: {top: 0}}]}
```

* [`alertAreas`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#alertareas-array-of-areas) - send alert event when the view's center enters/leaves any region within the group

```jsx
alertAreas={[{id: 'myArea', influenceArea: {top: 0}}]}
```

* [`horizontalOnly`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#horizontalonly-boolean) - whether the view should be locked to horizontal movement only

```jsx
horizontalOnly={true}
```

* [`startOnFront`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#startOnFront-boolean) - [ANDROID ONLY] whether the view should call `bringToFront`

```jsx
startOnFront
```

* [`verticalOnly`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#verticalonly-boolean) - whether the view should be locked to vertical movement only

```jsx
verticalOnly={true}
```

* [`boundaries`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#boundaries-object) - limits to movement relative to the view's center (after initial layout)

```jsx
boundaries={{left: -100, right: 100, bounce: 0.5}}
```

* [`onSnap`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#onsnap-function) - a function called whenever the view finishes snapping to a `snapPoints` point (after dragging)

```jsx
onSnap={this.onDrawerSnap}
```

* [`onSnapStart`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#onsnapstart-function) - a function called whenever the view starts snapping to a `snapPoints` point (after dragging)

```jsx
onSnapStart={this.onDrawerSnapStart}
```

* [`onStop`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#onstop-function) - a function called whenever the interaction stops (views freeze momentarily)

```jsx
onStop={this.onStopInteraction}
```

* [`onDrag`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#ondrag-function) - a function called whenever the user starts or stops dragging the view

```jsx
onDrag={this.onDragEvent}
```

* [`onAlert`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#onalert-function) - a function called whenever the view's center enters/leaves an alert area

```jsx
onAlert={this.onAlertEvent}
```

* [`dragEnabled`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#dragenabled-boolean) - whether the user can drag the view or not

```jsx
dragEnabled={true}
```

* [`dragWithSpring`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#dragwithspring-object) - specify to make dragging behavior of the view occur using a spring

```jsx
dragWithSpring={{tension: 2000, damping: 0.5}}
```

* [`dragToss`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#dragtoss-number) - time in seconds the view is allowed to be tossed before snapping to a point

```jsx
dragToss={0.1}
```

* [`animatedValueX`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#animatedvaluex-animatedvalue) - [`Animated.Value`](https://facebook.github.io/react-native/docs/animated.html#animatedvalue) that will contain the delta from the center as the view moves (x axis)

```jsx
animatedValueX={this._deltaX}
```

* [`animatedValueY`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#animatedvaluey-animatedvalue) - [`Animated.Value`](https://facebook.github.io/react-native/docs/animated.html#animatedvalue) that will contain the delta from the center as the view moves (y axis)

```jsx
animatedValueY={this._deltaY}
```

* [`animatedNativeDriver`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#animatednativedriver-boolean) - whether integration with [Animated](https://facebook.github.io/react-native/docs/animated.html) should use native driver

```jsx
animatedNativeDriver={false}
```

* [`initialPosition`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#initialposition-point) - used to initialize the view's position to a position different than it's original center

```jsx
initialPosition={{x: -140, y: -280}}
```

<br>

### `Interactable.View` Methods

##### `setVelocity(params)` - used to imperatively set the view's velocity in order to move it around

```jsx
instance.setVelocity({x: 2000});
```

Takes a single argument, which is a params object containing:
 * `x` - The horizontal velocity. Optional.
 * `y` - The vertical velocity. Optional.

 ##### `snapTo(params)` - used to imperatively cause the view to snap to one of its snap points

 ```jsx
 instance.snapTo({index: 2});
 ```

 Takes a single argument, which is a params object containing:
  * `index` - The index of the snap point in the `snapPoints` array. Optional.

##### `changePosition(params)` - used to imperatively set the view's position

```jsx
instance.changePosition({x: 120, y: 40});
```

Takes a single argument, which is a params object containing:
 * `x` - The x coordinate.
 * `y` - The y coordinate.

<br>

##### `bringToFront()` - bring view to front (Android Only)

```jsx
instance.bringToFront();
```

## Animating other views according to `Interactable.View` position

This library is integrated with the [Animated](https://facebook.github.io/react-native/docs/animated.html) library in order to support performant animations of other views according to the movement of the `Interactable.View`.

Consider the following use-cases:

* Buttons that appear using a fade & scale animation under a drawer as it's being dragged ([example](https://github.com/wix/react-native-interactable/blob/b72eff0649b48dd50548593e5ecfe4c42b026a02/example/src/IconDrawer.js#L44))
* Image in a collapsible header that scales as it's snapped between states ([example](https://github.com/wix/react-native-interactable/blob/b72eff0649b48dd50548593e5ecfe4c42b026a02/example/src/CollapsingHeader.js#L15))

In these use-cases, we have views different from the one the user is interacting with, that animate according to the interactive view's position. Since [Animated](https://facebook.github.io/react-native/docs/animated.html) library uses [`Animated.Value`](https://facebook.github.io/react-native/docs/animated.html#animatedvalue) to animate view properties, we support setting the value of an `Animated.Value` instance according to position of the interactable view. The `Animated.Value` will contain the delta between the `Interactable.View` original center and new center. This can be done separately on the X axis and Y axis.

After setting this up, use [Animated](https://facebook.github.io/react-native/docs/animated.html) to declaratively define [interpolations](https://facebook.github.io/react-native/docs/animated.html#interpolate) of the `Animated.Value` to various animatable view properties like opacity, scale, rotation, translateX and translateY:

```jsx
this._deltaY = new Animated.Value(0);

<Animated.View style={{
  transform: [{
    scale: this._deltaY.interpolate({
      inputRange: [-150, -150, 0, 0],
      outputRange: [0.3, 0.3, 1, 1]
    })
  }]
}}>
  ...
</Animated.View>

<Interactable.View
  verticalOnly={true}
  snapPoints={[{y: 0}, {y: -150}]}
  animatedValueY={this._deltaY}
>
  ...
</Interactable.View>
```

<br>

## Implementation Details

Originally, the iOS implementation relied on [UIKit Dynamics](https://developer.apple.com/reference/uikit/uidynamicanimator) - a powerful native animation engine for physical interactions. A physics engine is required in order to make the interaction life-like. Consider the action of tossing a view connected via a spring to a snap point. A simple native [spring animation](https://developer.apple.com/reference/uikit/uiview/1622594-animatewithduration) will not be enough to take the initial velocity vector into account.

At some point, UIKit Dynamics was dropped in favor of a home-brewed physics implementation in order to provide more control over the behaviors. This also paved the way for the Android port since there's no parallel to UIKit Dynamics for Android. The home-brewed physics engine was straightforward to port from Objective-C to Java and is now part of this library.

## Contributing

If you are interested in the project, have feedback or want to contribute don't hesitate to contact me. I'm particularly interested in ideas on how to expand the declarative API for more use-cases and suggestions on how to improve performance. PRs are always welcome.

## License

MIT
