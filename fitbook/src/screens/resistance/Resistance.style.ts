import { StyleSheet } from "react-native";
import { Style } from "../../styles/style";

export const resistanceStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Style.themed("pageBackground"),
    },
    header: {
      backgroundColor: Style.themed("primaryHeader"),
    },
    headerText: {
      color: Style.themed("headerText"),
    },
  });
