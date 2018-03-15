# OnShift Chat Widget

A chat widget designed to be used in both mobile and non-mobile environments. 
Utilizing [Sendbird](https://sendbird.com/) and the SDK they provide, this widget will
allow for conversational communication between the various members of a given Engage 
community.

## Running in Development Mode

- Clone the repo
- run `npm install`
- run `npm run start-dev`
  - this will start the chat widget on localhost:9001

## Usage
####Note:
this is still very much in development, but we're trying to keep the documentation up to date

###Build
The widget is still in it's infancy and there are some warts we inherited from the Sendbird team. In order to bundle the widget
with another project, the following must occur
- the widget has been implemented into other projects systems using the [webpack module bundler](https://webpack.js.org/)
  - therefore, it's assumed that if you're trying to include the widget you're using that bundler
- because the widget uses SASS for it's stying, you must configure the [sass-loader](https://github.com/webpack-contrib/sass-loader)
to load the widget's styling
- the widget must be transpiled via [babel](https://github.com/babel/babel)

###Incorporation
To incorporate the widget, the following code must be written in a React project

```
    import SendBirdWidget from 'onshift-chat-widget/src/js/widget';`
    let sbWidget = new SendBirdWidget()
```

- in order to initialize the widget, a `div` with an id of `sb_widget` must exist somewhere in the DOM
- in order to start the widget, invoke `sbWidget.startWithConnect(appId, userId, userName)` where
  - appId: the id of the Sendbird application we are connecting to
  - userId: the id of the user who is connecting to the Sendbird application
  - userName: the name to be displayed when displaying their name (in SB parlance, this is the nickname)

## Running the tests

There are no tests (yet). _GOOD FOR US._
There isn't even CI. We're a...work in progress.
