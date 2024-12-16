import React from 'react';
import { Box, Grid2 as Grid, Typography, Stack, Paper } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

type SingleProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
};

function Single({ sx, children }: SingleProps) {
  return (
    <Grid container columns={12} columnSpacing={2} justifyContent={"space-between"}>
        {children}
    </Grid>
  );
}

type SingleMainContentProps = {
  children: React.ReactNode;
};

function SingleMainContent({ children }: SingleMainContentProps) {
  return (
    <Grid size={'grow'}>
      <Stack spacing={3} component={Paper} p={2} borderRadius={4}> 
        {children}
      </Stack>
    </Grid>
  );
}

type SingleSidePanelProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

function SingleSidePanel({ title, children }: SingleSidePanelProps) {
  return (
    <Grid columns={{ xs: 12, md: 4 }} >
      {title && (
        <Typography variant="subtitle2" color='text.secondary'>
          {title}
        </Typography>
      )}
      {children}
    </Grid>
  );
}

type SingleTitleProps = {
  children: React.ReactNode;
};

function SingleTitle({ children }: SingleTitleProps) {
  return (
    <Typography variant="h4" >
      {children}
    </Typography>
  );
}

type SingleSectionProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

function SingleSection({ title, children }: SingleSectionProps) {
  return (
    <Box>
      {title && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      <Stack spacing={2}>
        {children}
      </Stack>
    </Box>
  );
}

type SingleItemProps = {
  label: React.ReactNode;
  children: React.ReactNode;
};

function SingleItem({ label, children }: SingleItemProps) {
  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"} justifyContent={"flex-start"} >
      <Typography variant="h6" >
        {label}:
      </Typography>

      <Box>{children}</Box>
    </Stack>
  );
}

type SingleAttachmentsProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

function SingleAttachments({ title, children }: SingleAttachmentsProps) {
  return (
    <Box>
      {title && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
}

type SingleCommentsProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

function SingleComments({ title, children }: SingleCommentsProps) {
  return (
    <Box>
      {title && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
}

Single.MainContent = SingleMainContent;
Single.SidePanel = SingleSidePanel;
Single.Title = SingleTitle;
Single.Section = SingleSection;
Single.Item = SingleItem;
Single.Attachments = SingleAttachments;
Single.Comments = SingleComments;

export default Single;
