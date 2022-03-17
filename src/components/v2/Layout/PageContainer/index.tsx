/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { Footer, IFooterProps } from '../Footer';
import { Toolbar } from '../Toolbar';
import { useStyles } from './styles';

interface IPageContainerProps {
  children: ReactNode;
  currentBlockNumber: IFooterProps['currentBlockNumber'];
}

export const PageContainer = ({ children, currentBlockNumber }: IPageContainerProps) => {
  const styles = useStyles();
  return (
    <Box component="main" css={styles.main}>
      <Toolbar />

      {children}

      <Box component="footer" css={styles.footer}>
        <Footer currentBlockNumber={currentBlockNumber} />
      </Box>
    </Box>
  );
};