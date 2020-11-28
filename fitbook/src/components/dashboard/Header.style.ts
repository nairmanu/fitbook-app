import { StyleSheet } from "react-native";
import { Style } from "../../styles/style";

export const headerStyles = () =>
  StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: Style.themed("primaryHeader"),
      color: Style.themed("headerText"),
      marginBottom: 20,
    },
    header: {
      backgroundColor: Style.themed("primaryHeader"),
      color: Style.themed("headerText"),
    },
    headerTitle: {
      color: Style.themed("headerText"),
      fontSize: 36,
    },
  });
