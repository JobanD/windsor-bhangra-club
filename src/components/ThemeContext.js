import { createContext } from "react";
import theme from "../../styles/theme/theme"; // path to your theme file

const ThemeContext = createContext(theme);

export default ThemeContext;
