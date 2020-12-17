import { StyleSheet } from "react-native";
import { Style } from "../../styles/style";

export const profileStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Style.themed("pageBackground"),
    },
  });
