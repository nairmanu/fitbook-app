import React from "react";
import { View, Fab, Button, Icon } from "native-base";

import { fabSelectorStyles } from "./FabSelector.style";

interface FabSelectorProps {
  isDarkMode: boolean;
  showCreateResistance: () => void;
  showCreateWorkout: (value: boolean) => void;
}

const FabSelector: React.FC<FabSelectorProps> = ({ isDarkMode, showCreateResistance, showCreateWorkout }) => {
  const [styles, setStyles] = React.useState(fabSelectorStyles());
  const [active, setActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    setStyles(fabSelectorStyles());
  }, [isDarkMode, setStyles]);

  let mainButtonIconStyle = { ...styles.mainButtonIcon };

  if (active) {
    mainButtonIconStyle = { ...styles.mainButtonIcon, ...styles.mainButtonActive };
  }

  return (
    <View style={styles.container}>
      <Fab
        active={active}
        direction="left"
        position="bottomRight"
        style={styles.mainButton}
        onPress={() => setActive(!active)}
      >
        <Icon name="md-add-outline" style={mainButtonIconStyle} />
        <Button style={styles.createResistanceButton} onPress={() => {
          showCreateResistance();
          setActive(!active);
        }}>
          <Icon name="md-disc-sharp" style={styles.createResistanceIcon} />
        </Button>
        <Button style={styles.createWorkoutButton} onPress={() => {
          setActive(!active);
          showCreateWorkout(true);
        }}>
          <Icon name="md-body-sharp" style={styles.createWorkoutIcon} />
        </Button>
      </Fab>
    </View>
  );
};

export default FabSelector;
