import { StyleSheet } from "react-native";
import { Style } from "../../styles/style";

export const currentSessionStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    card: {
      borderRadius: 18,
      backgroundColor: Style.themed("cardBackground"),
    },
    cardHeader: {
      borderTopEndRadius: 18,
      borderTopStartRadius: 18,
      fontSize: 18,
      color: Style.themed("headerText"),
      backgroundColor: Style.themed("primaryHeader"),
    },
    cardLineItem: {
      borderRadius: 18,
      backgroundColor: Style.themed("cardBackground"),
    },
    cardText: {
      width: "100%",
      color: Style.themed("primaryText"),
    },
  });
