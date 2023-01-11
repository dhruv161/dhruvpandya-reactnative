import React from 'react';
import {Pressable, Text} from 'react-native';
import styles from './style';

const Button = ({title, ...props}) => {
  return (
    <Pressable style={styles.button} {...props}>
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
};

export default Button;
