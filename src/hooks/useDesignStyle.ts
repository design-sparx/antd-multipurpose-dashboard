import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  getDesignTokens,
  SurfaceTokens,
  DesignStyleName,
} from '../theme/design-styles';

interface UseDesignStyleReturn {
  styleName: DesignStyleName;
  tokens: SurfaceTokens;
}

export const useDesignStyle = (): UseDesignStyleReturn => {
  const { activeStyle } = useSelector((state: RootState) => state.designStyle);
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const themeMode = mytheme === 'dark' ? 'dark' : 'light';

  return {
    styleName: activeStyle,
    tokens: getDesignTokens(activeStyle, themeMode),
  };
};
