import React from "react";
import { Text } from "react-native";
import { Card, CardItem } from "native-base";

import styles from "./CurrentSession.style";

const CurrentSession: React.FC = () => {
  return (
    <Card>
      <CardItem header>
        <Text>NativeBase</Text>
      </CardItem>
      <CardItem>
        <Text>Bench press</Text>
      </CardItem>
      <CardItem>
        <Text>Incline press</Text>
      </CardItem>
      <CardItem>
        <Text>Plank</Text>
      </CardItem>
    </Card>
  );
};

export default CurrentSession;
