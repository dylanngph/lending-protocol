import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const styles = ({ over }: { over: boolean }) => {
  const theme = useTheme();
  return css`
    color: ${over ? theme.palette.error.slider : theme.palette.success.slider};
    background-color: ${theme.palette.background.black};
    height: 8px;
    padding: 0;
    .MuiSlider-track {
      height: 8px;
    }
    .MuiSlider-rail {
      height: 8px;
      color: ${theme.palette.background.black};
    }
    .MuiSlider-mark {
      width: 4px;
      height: 8px;
      color: ${theme.palette.error.slider};
    }
  `;
};

export default styles;