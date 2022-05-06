import React, {createContext, FunctionComponent, useContext} from 'react';

export type Theme = typeof theme;

export const theme = {
  // 文字色
  color_text_base: '#444444', // 基本
  color_text_base_inverse: '#FFFFFF', // 基本_反色
  color_text_secondary: '#8C919C', // 辅助色
  color_text_placeholder: 'rgba(68,68,68,0.5)', // 文本框提示

  // 背景色
  fill_base: '#FFFFFF', // 组件默认背景
  fill_body: '#F2F2F2', // 页面背景

  // 全局/品牌色
  brand_primary: '#AC73FF',
  brand_secondary: '#ACA8FF',
  brand_error: '#f4333c',

  // shadow
  color_shadow: 'rgba(0, 0, 0, 0.05)',

  // border radius
  border_radius_m: 10,

  // 间距
  // 水平间距
  h_spacing_s: 8,
  h_spacing_m: 17,
  h_spacing_xl: 32,
  h_spacing_xxl: 52,

  // tabs
  tabs_color: '#BBBBBB',

  // button
  primary_button_fill: '#ACA8FF',
  secondary_button_fill: '#FFFFFF',

  // splash
  splash_fill: '#9DE5FF',

  // indicator
  indicator_fill: '#F2F8F8',
};

const ThemeContext = createContext<Theme>(theme);

export function useTheme() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  theme: Theme;
}
const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
export default ThemeProvider;
