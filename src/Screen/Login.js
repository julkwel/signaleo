import * as React from 'react';
import {Button} from 'react-native-paper';
import {View} from 'react-native';

export default function Login({navigation}) {
  return (
    <View>
      <Button
        title="Go to homePage"
        mode={'contained'}
        onPress={() => navigation.navigate('Home')}>
        Hello from login page
      </Button>
    </View>
  );
}
