import React from 'react';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

type SubComponentProperties = {
  children: React.ReactNode;
};

function Breadcrumbs({ children }: SubComponentProperties) {
  return <Box mb={2}>{children}</Box>;
}

function Title({ children }: SubComponentProperties) {
  return (
    <Typography variant="h5" sx={{ mb: 2 }}>
      {children}
    </Typography>
  );
}

function Diagrams({ children }: SubComponentProperties) {
  return <Box mb={2}>{children}</Box>;
}

function Content({ children }: SubComponentProperties) {
  return <Box>{children}</Box>;
}

function Filters({ children }: SubComponentProperties) {
  return (
    <>
      {React.Children.map(children, (child) => (
        <Grid>{child}</Grid>
      ))}
    </>
  );
}

function Sorting({ children }: SubComponentProperties) {
  return <Grid offset="auto">{children}</Grid>;
}

function Toolbar({ children }: SubComponentProperties) {
  return (
    <Grid container justifyContent="space-between" pb={2} spacing={2}>
      {children}
    </Grid>
  );
}

type PageLayoutProperties = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

function PageLayout({ children, sx }: PageLayoutProperties) {
  return <Box sx={{ p: 2, ...sx }}>{children}</Box>;
}

PageLayout.Breadcrumbs = Breadcrumbs;
PageLayout.Title = Title;
PageLayout.Diagrams = Diagrams;
PageLayout.Toolbar = Toolbar;
PageLayout.Filters = Filters;
PageLayout.Sorting = Sorting;
PageLayout.Content = Content;

export default PageLayout;
