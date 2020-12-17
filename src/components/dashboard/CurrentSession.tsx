import React from "react";
import { View, Card, CardItem, Text } from "native-base";

import { currentSessionStyles } from "./CurrentSession.style";

interface CurrentSessionProps {
  isDarkMode: boolean;
}

const CurrentSession: React.FC<CurrentSessionProps> = ({ isDarkMode }) => {
  const [styles, setStyles] = React.useState(currentSessionStyles());

  React.useEffect(() => {
    setStyles(currentSessionStyles());
  }, [isDarkMode, setStyles]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <CardItem header bordered style={styles.cardHeader}>
          <Text style={styles.cardHeader}>Current session</Text>
        </CardItem>
        <CardItem bordered style={styles.cardLineItem}>
          <Text style={styles.cardText}>Bench press</Text>
        </CardItem>
        <CardItem bordered style={styles.cardLineItem}>
          <Text style={styles.cardText}>Incline press</Text>
        </CardItem>
        <CardItem bordered style={styles.cardLineItem}>
          <Text style={styles.cardText}>Plank</Text>
        </CardItem>
      </Card>
    </View>
  );
};

export default CurrentSession;
