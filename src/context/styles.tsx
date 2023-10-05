import {createContext, useContext} from "react";
import {RowProps} from "antd";

export type StylesContentProps = {
    rowProps: RowProps
}

export const StylesContext = createContext<StylesContentProps | null>(null)

export const useStylesContext = () => useContext(StylesContext)