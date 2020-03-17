import * as React from 'react';
import {Button} from 'react-native-paper';
import {View} from 'react-native';

export default function Actuality({navigation}) {
  return (
    <View>
      <Button
        title="Hello from home page"
        mode={'contained'}
        onPress={() => navigation.navigate('Login')}>
        Hello from homepage
      </Button>
    </View>
  );
}
