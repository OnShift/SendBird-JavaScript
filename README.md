# SendBird JavaScript Widget Sample
This is a chat widget built using using the [SendBird SDK](https://github.com/smilefam/SendBird-SDK-JavaScript).  

## Setup
1. The `body` must have a `div` element whose id is `sb_widget`.
  
```html
<body>
  <div id="sb_widget"></div>
</body>
```

2. Import the [`SendBird SDK`](https://github.com/smilefam/SendBird-SDK-JavaScript).  
3. Import the `widget.SendBird.js` file.
```javascript
<script src="SendBird.min.js"></script>
<script src="build/widget.SendBird.js"></script>
```


## Customizing the widget
If you refresh your browser window, you need to reconnect to SendBird. To retain connection on browser refresh, you must implement an appropriate `event handler`. 

If you wish to issue an `access_token` for your user, modify the `connect function` in `src/sendbird.js`.  

> Require that you have Node installed.
1. Install npm

        npm install

2. Modify files.

        npm run start-dev
        
3. Start sample.

        npm start


## Advanced  
### Connect other APP or Channel  
If you want to connect other application, you need to change variable `appId` in `index.html`.

```html
...

  <script src="SendBird.min.js"></script>
  <script src="build/widget.SendBird.js"></script>
  <script>
    var appId = '<APP_ID>';
    sbWidget.start(appId);
  </script>

</html>
```

### Start with User connect  
If you want to start this sample with user connect, you can using `startWithConnect()`.  

```html
...

  <script src="SendBird.min.js"></script>
  <script src="build/widget.SendBird.js"></script>
  <script>
    var appId = '<APP_ID>';
    var userId = '<USER_ID>';
    var nickname = '<NICKNAME>';
    sbWidget.startWithConnect(appId, userId, nickname, function() {
      // do something...
    });
  </script>

</html>
```

### Show Channel  
If you want to open chat, you can using `showChannel()`.  

```javascript
...
var channelUrl = '<CHANNEL_URL>';
sbWidget.showChannel(channelUrl);
...
```
