# (J)Whizzer

## How to test the App Clip

App Clips can not be tested with Expo Go or expo-dev-client. The best two ways to test the App Clip seem to be the following:

### Run in Simulator

Build the development client first by running `expo run:ios` and opening the app in Simulator. After doing this once, you can run `expo run:ios --scheme` and select the App Clip scheme ("...Clip") to open the App Clip. You could also add an extra script to your project’s package.json:

```package.json
"scripts": {
  "clip": "expo run:ios --scheme whizzerClip"
}
```

Now you can simply type "npm run clip" in your terminal to open the App Clip.
