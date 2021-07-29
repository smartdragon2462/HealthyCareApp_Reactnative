import React from "react";
import { View, StyleSheet } from "react-native";
import generateGradient from "./generator";
import LinearGradient from 'react-native-linear-gradient';

export { generateGradient };

export default ({ gradient, children, style }) => {
  // Avoid breaking this when people are not using expo :)
  // find a better solution to expose either expo-linear-gradient or
  // react-native-linear-gradient.


  const generated = generateGradient(gradient, { width: style.width, height: style.height});

  if (generated.length > 1) {
    return (
      <View style={[style, { position: "relative" }]}>
        {
          generated.map((obj, i) => (
            <LinearGradient style={[StyleSheet.absoluteFill]} {...obj} key={i} />
          // <LinearGradient style={{ width: '100%'}} colors={['#0066ff', '#0250c7']}>
          //   <View style={{width:"100%", height:50, backgroundColor:"red"}}></View>
          // </LinearGradient>
          ))
        }
        {children || null}
      </View>
    );
  }

  return (
    <LinearGradient style={style} {...generated[0]}>
      {children || null}
    </LinearGradient>
  );
};
