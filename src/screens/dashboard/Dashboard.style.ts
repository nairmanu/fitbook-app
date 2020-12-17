import { StyleSheet } from "react-native";
import { Style } from "../../styles/style";

export const dashboardStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: Style.themed("pageBackground"),
    },
  });
