import React from "react";
import { View, List, ListItem, Text } from "native-base";

import { resistanceListStyles } from "./ResistanceList.style";
import { ResistanceModel } from '../../domainlogic/models/ResistanceModel';

interface ResistanceListProps {
  isDarkMode: boolean;
  resistances: ResistanceModel[];
}

const ResistanceList: React.FC<ResistanceListProps> = ({ isDarkMode, resistances }) => {
  const [styles, setStyles] = React.useState(resistanceListStyles());

  React.useEffect(() => {
    setStyles(resistanceListStyles());
  }, [isDarkMode, setStyles]);

  return (
    <View style={styles.container}>
      <List style={styles.list}>
        {resistances.map((resistance, index) =>
          <ListItem key={index} >
            <Text style={styles.type}>{resistance.type}</Text>
            <Text style={styles.type}>{resistance.reps}</Text>
            <Text>{resistance.createdDate}</Text>
          </ListItem>
        )}
      </List>
    </View>
  );
};

export default ResistanceList;
