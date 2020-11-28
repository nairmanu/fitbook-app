import { StyleSheet } from "react-native";
import { Style } from "../../styles/style";

export const fabSelectorStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
    mainButton: {
      backgroundColor: Style.themed("primaryButtonBackground"),
    },
    mainButtonIcon: {
      fontSize: 70,
      lineHeight: 63,
      color: Style.themed("addEntryIcon"),
    },
    mainButtonActive: {
      transform: [{ rotate: "45deg" }],
    },
    createResistanceButton: {
      backgroundColor: Style.themed("addResistanceIcon"),
    },
    createWorkoutButton: {
      backgroundColor: Style.themed("addWorkoutIcon"),
    },
    createResistanceIcon: {
      fontSize: 20,
    },
    createWorkoutIcon: {
      fontSize: 20,
    },
  });
