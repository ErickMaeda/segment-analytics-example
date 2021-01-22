# segment-analytics-example

## Setup

### Create Segment Project
- Create a project in [Segment](https://app.segment.com/)
- Add React Native as a source
- Create an API Key in `https://app.segment.com/{project}/sources/react_native/settings/keys` (Please replace `{project}` with your project name)

### Project Setup
- `yarn`
- `cd ios && pod install`
- Enter in `App.js` and replace **ADD_YOUR_KEY_HERE** with your own `writeKey` provided by create segment step

## Run
- `yarn ios`
- `yarn android`
