import { StyleSheet } from "react-native";
import { Style } from "../../styles/style";

export const addEntryStyles = () =>
  StyleSheet.create({
    container: {
      position: "absolute",
      flex: 1,
      zIndex: 9999,
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      paddingHorizontal: 10,
      backgroundColor: "rgba(0,0,0,0.8)",
    },
    content: {
      display: "flex",
      borderRadius: 15,
      paddingBottom: 30,
      backgroundColor: Style.themed("cardBackground"),
      paddingHorizontal: 15,
      opacity: 1,
    },
    addButton: {
      paddingHorizontal: 10,
      marginTop: 25,
    },
    input: {
      color: Style.themed("primaryText"),
    },
    label: {
      color: Style.themed("secondaryText"),
    },
    closeButton: {
      alignSelf: "flex-end",
    },
  });
