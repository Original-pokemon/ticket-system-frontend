import { ReactElement } from 'react';
import { CardHeader } from '@mui/material';

export type DataListItemHeaderPropertiesType = {
  title?: ReactElement;
  subTitle?: ReactElement;
  avatar?: ReactElement;
  action?: ReactElement;
};

function DataListItemHeader({
  title,
  subTitle,
  avatar,
  action,
}: DataListItemHeaderPropertiesType) {
  return (
    <CardHeader
      avatar={avatar}
      action={action && action}
      title={title}
      subheader={subTitle}
    />
  );
}

DataListItemHeader.defaultProps = {
  title: undefined,
  subTitle: undefined,
  avatar: undefined,
  action: undefined,
};

export { DataListItemHeader };
