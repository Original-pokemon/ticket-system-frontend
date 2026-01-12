import React from 'react';

type SingleProps = {
  className?: string;
  children: React.ReactNode;
};

function Single({ className, children }: SingleProps) {
  return (
    <div className={`grid grid-cols-12 gap-2 ${className || ''}`}>
      {children}
    </div>
  );
}

type SingleMainContentProps = {
  children: React.ReactNode;
};

function SingleMainContent({ children }: SingleMainContentProps) {
  return (
    <div className="col-span-12 md:col-span-8">
      <div className="flex flex-col gap-3 border border-border rounded-lg p-2">
        {children}
      </div>
    </div>
  );
}

type SingleSidePanelProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

function SingleSidePanel({ title, children }: SingleSidePanelProps) {
  return (
    <div className="col-span-12 md:col-span-4">
      {title && (
        <div className="text-muted-foreground font-semibold">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

type SingleTitleProps = {
  children: React.ReactNode;
};

function SingleTitle({ children }: SingleTitleProps) {
  return (
    <div className="text-2xl font-bold">
      {children}
    </div>
  );
}

type SingleSectionProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

function SingleSection({ title, children }: SingleSectionProps) {
  return (
    <div>
      {title && (
        <div className="text-lg font-semibold mb-1">
          {title}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}

type SingleItemProps = {
  label: React.ReactNode;
  children: React.ReactNode;
};

function SingleItem({ label, children }: SingleItemProps) {
  return (
    <div className="flex flex-row gap-2 items-center justify-start">
      <div className="text-lg font-semibold">
        {label}:
      </div>
      <div>{children}</div>
    </div>
  );
}

type SingleAttachmentsProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

function SingleAttachments({ title, children }: SingleAttachmentsProps) {
  return (
    <div>
      {title && (
        <div className="text-lg font-semibold mb-1">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

type SingleCommentsProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
};

function SingleComments({ title, children }: SingleCommentsProps) {
  return (
    <div>
      {title && (
        <div className="text-lg font-semibold mb-1">
          {title}
        </div>
      )}
      {children}
    </div>
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
