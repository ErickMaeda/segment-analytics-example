import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
} from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import analytics from '@segment/analytics-react-native';
import Amplitude from '@segment/analytics-react-native-amplitude';

const setupAnalytics = () => {
  analytics
    .setup('ADD_YOUR_KEY_HERE', {
      recordScreenViews: true,
      trackAppLifecycleEvents: true,
      using: [Amplitude],
      android: {
        flushInterval: 60000, // 60 seconds
        collectDeviceId: true,
      },
      ios: {
        trackAdvertising: true,
        trackDeepLinks: true,
      },
    })
    .then(() => console.log('Analytics is ready'))
    .catch((err) => console.error('Something went wrong', err));
};

const App = () => {
  useEffect(() => {
    setupAnalytics();
  }, []);

  const sendEvent = (eventName, eventParams) => {
    analytics.track(eventName, eventParams);
  };

  const sendLoginEvent = () => {
    analytics.identify("a user's id", {
      email: 'jsmith@example.com',
      name: 'John Smith',
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Button title="Event login" onPress={sendLoginEvent} />
            </View>
            <View style={styles.sectionContainer}>
              <Button
                title="Event navigation"
                onPress={() =>
                  sendEvent('navigation', {from: 'login', to: 'register'})
                }
              />
            </View>
            <View style={styles.sectionContainer}>
              <Button
                title="Event step started"
                onPress={() => sendEvent('step_started', {stepId: '1'})}
              />
            </View>
            <View style={styles.sectionContainer}>
              <Button
                title="Event step finished"
                onPress={() => sendEvent('step_finished', {stepId: '1'})}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
