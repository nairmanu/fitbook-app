import React from "react";
import { View, Header, Left, Body, Right, Title } from "native-base";

import { headerStyles } from "./Header.style";

interface CurrentSessionProps {
  isDarkMode: boolean;
}

const CurrentSession: React.FC<CurrentSessionProps> = ({ isDarkMode }) => {
  const [styles, setStyles] = React.useState(headerStyles());

  React.useEffect(() => {
    setStyles(headerStyles());
  }, [isDarkMode, setStyles]);

  return (
    <View style={styles.container}>
      <Header style={styles.header}>
        <Body>
          <Title style={styles.headerTitle}>Fitbook</Title>
        </Body>
      </Header>
    </View>
  );
};

export default CurrentSession;
