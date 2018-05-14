# OnShift Chat Widget

A chat widget designed to be used in both mobile and non-mobile environments.
Utilizing [Sendbird](https://sendbird.com/) and the SDK they provide, this widget will
allow for conversational communication between the various members of a given Engage
community.

## Running in Development Mode

- Clone the repo
- run `npm install`
- run `npm run start-dev`
  - this will start the chat widget on localhost:9000

## Usage
#### Note:
this is still very much in development, but we're trying to keep the documentation up to date

### Build
The widget is transpiled down to ECMAScript 2015, so it should be easily utilized in older projects and work in a variety
of older browsers.
- the widget has been implemented into other projects systems using the [webpack module bundler](https://webpack.js.org/)
- the widget utilizes the JS module system in order to achieve ease of use.

### Incorporation
To incorporate the widget, the following code must be written in a React project

```
    import SendBirdWidget from 'onshift-chat-widget/build/widget.Sendbird.js';`
    let sbWidget = new SendBirdWidget();
```

- in order to initialize the widget, a `div` with an id of `sb_widget` must exist somewhere in the DOM
- create a json object, similar to the below:
```
    var loginData = {
      appId:'XXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXX',
      nickname: 'Nickname Goes Here',
      role: 'Administrator',
      userId: 'Unique ID of user goes here'
    };
```
  - appId: the id of the Sendbird application we are connecting to
  - userId: the id of the user who is connecting to the Sendbird application
  - nickname: the name to be displayed when displaying their name
  - accessToken: some valid access token that

- in order to start the widget, invoke the widget and pass in the loginData json object you created: `sbWidget.startWithConnect(loginData)`

## Running the tests

We are going to use the [jest](https://facebook.github.io/jest/) test running framework, as that seems to be
the framework that newer OnShift components are migrating to. To run the tests, simply run `npm run test`.
