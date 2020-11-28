import { Colors } from "./colors";

const Themes = {
  light: new Map<string, Colors>([
    ["labelText", Colors.GRAY],
    ["formValue", Colors.BLACK],
    ["activeLink", Colors.BLUE],
    ["textInputBorder", Colors.GRAY],
    ["toggleFalseState", Colors.GRAY_DRAKER],
    ["toggleTrueState", Colors.GRAY_LIGHTER],
    ["pageBackground", Colors.GRAY_LIGHTER],
    ["cardBackground", Colors.WHITE],
    ["primaryText", Colors.BLACK],
    ["secondaryText", Colors.GRAY_DRAKER],
    ["primaryHeader", Colors.THEME_BLUE],
    ["headerText", Colors.WHITE],
    ["primaryButtonBackground", Colors.THEME_BLUE],
    ["addEntryIcon", Colors.BLACK],
    ["addResistanceIcon", Colors.THEME_BLUE],
    ["addWorkoutIcon", Colors.THEME_BLUE],
    ["modalBackground", Colors.BLACK_TRUE],
    ["exitButton", Colors.RED],
  ]),
  dark: new Map<string, Colors>([
    ["labelText", Colors.GRAY],
    ["formValue", Colors.WHITE],
    ["activeLink", Colors.BLUE],
    ["textInputBorder", Colors.GRAY],
    ["toggleFalseState", Colors.GRAY_LIGHTER],
    ["toggleTrueState", Colors.GRAY_DRAKER],
    ["pageBackground", Colors.GRAY_DRAKER],
    ["cardBackground", Colors.BLACK],
    ["primaryText", Colors.WHITE],
    ["secondaryText", Colors.GRAY_LIGHTER],
    ["primaryHeader", Colors.THEME_BLUE],
    ["headerText", Colors.WHITE],
    ["primaryButtonBackground", Colors.THEME_BLUE],
    ["addEntryIcon", Colors.WHITE],
    ["addResistanceIcon", Colors.THEME_BLUE],
    ["addWorkoutIcon", Colors.THEME_BLUE],
    ["modalBackground", Colors.BLACK_TRUE],
    ["exitButton", Colors.RED],
  ]),
};

export default Themes;
