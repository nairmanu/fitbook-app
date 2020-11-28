import { StyleSheet } from "react-native";
import { Style } from "../../styles/style";

export const fabSelectorStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
    mainButton: {
      borderRadius: 50,
      width: 58,
      height: 57,
      padding: 1,
      backgroundColor: Style.themed("primaryButtonBackground"),
    },
    mainButtonIcon: {
      fontSize: 65,
      lineHeight: 64,
      color: Style.themed("addEntryIcon"),
    },
    mainButtonActive: {
      transform: [{ rotate: "45deg" }],
    },
    createResistanceButton: {
      backgroundColor: "transparent",
    },
    createWorkoutButton: {
      backgroundColor: "transparent",
    },
    createResistanceIcon: {
      fontSize: 30,
      color: Style.themed("addResistanceIcon"),
    },
    createWorkoutIcon: {
      fontSize: 30,
      color: Style.themed("addWorkoutIcon"),
    },
  });
