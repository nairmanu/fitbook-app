import { StyleSheet } from "react-native";
import { Style } from "../../styles/style";

export const resistanceListStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      //   justifyContent: "center",
      //   alignItems: "center",
    },
    list: {
      //   borderRadius: 18,
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
    listText: {
      width: "100%",
      color: Style.themed("primaryText"),
    },
    type: {
      marginRight: 5,
    },
  });
