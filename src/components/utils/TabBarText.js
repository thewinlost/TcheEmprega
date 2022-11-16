import React from "react";
import { Text, themeColor, useTheme } from "react-native-rapi-ui";
export default (props) => {
  const { isDarkmode } = useTheme();
  return (
    <Text
      fontWeight="bold"
      style={{
        marginBottom: 5,
        color: props.focused
          ? isDarkmode
            ? themeColor.white100
            : themeColor.primary
          : "rgb(13, 64, 35)",
        fontSize: 10,
      }}
    >
      {props.title}
    </Text>
  );
};
