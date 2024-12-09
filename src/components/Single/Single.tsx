import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

interface SingleProps {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}

function Single({ sx, children }: SingleProps) {
  return (
    <Box sx={{ p: 2, backgroundColor: '#fff', borderRadius: 2, ...sx }}>
      <Grid container spacing={2}>
        {children}
      </Grid>
    </Box>
  );
}

// Подкомпоненты

interface SingleTitleProps {
  children: React.ReactNode;
}

function SingleTitle({ children }: SingleTitleProps) {
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {children}
      </Typography>
    </Grid>
  );
}

interface SingleSectionProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

function SingleSection({ title, children }: SingleSectionProps) {
  return (
    <Grid item xs={12} md={8}>
      {title && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      {children}
    </Grid>
  );
}

interface SingleItemProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

function SingleItem({ label, value }: SingleItemProps) {
  return (
    <Box sx={{ display: 'flex', mb: 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 1 }}>
        {label}:
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
}

interface SingleAttachmentsProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

function SingleAttachments({ title, children }: SingleAttachmentsProps) {
  return (
    <Grid item xs={12} md={8}>
      {title && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      {children}
    </Grid>
  );
}

interface SingleCommentsProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

function SingleComments({ title, children }: SingleCommentsProps) {
  return (
    <Grid item xs={12} md={8}>
      {title && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      {children}
    </Grid>
  );
}

interface SingleSidePanelProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

function SingleSidePanel({ title, children }: SingleSidePanelProps) {
  return (
    <Grid item xs={12} md={4}>
      {title && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      {children}
    </Grid>
  );
}

// Привязываем подкомпоненты к основному компоненту
Single.Title = SingleTitle;
Single.Section = SingleSection;
Single.Item = SingleItem;
Single.Attachments = SingleAttachments;
Single.Comments = SingleComments;
Single.SidePanel = SingleSidePanel;

export default Single;
