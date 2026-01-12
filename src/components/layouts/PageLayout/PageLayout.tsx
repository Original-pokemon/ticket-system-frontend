import React from 'react';

type SubComponentProperties = {
  children: React.ReactNode;
};

function Breadcrumbs({ children }: SubComponentProperties) {
  return <div className="mb-2">{children}</div>;
}

function Title({ children }: SubComponentProperties) {
  return (
    <h5 className="mb-6 text-4xl leading-tight">
      {children}
    </h5>
  );
}

function Diagrams({ children }: SubComponentProperties) {
  return <div className="mb-2">{children}</div>;
}

function Content({ children }: SubComponentProperties) {
  return <div>{children}</div>;
}

function Filters({ children }: SubComponentProperties) {
  return (
    <>
      {React.Children.map(children, (child) => (
        <div>{child}</div>
      ))}
    </>
  );
}

function Sorting({ children }: SubComponentProperties) {
  return <div className="ml-auto">{children}</div>;
}

function Toolbar({ children }: SubComponentProperties) {
  return (
    <div className="flex justify-between pb-2 gap-2">
      {children}
    </div>
  );
}

type PageLayoutProperties = {
  children: React.ReactNode;
  className?: string;
};

function PageLayout({ children, className }: PageLayoutProperties) {
  return <div className={`p-6 ${className || ''}`}>{children}</div>;
}

PageLayout.Breadcrumbs = Breadcrumbs;
PageLayout.Title = Title;
PageLayout.Diagrams = Diagrams;
PageLayout.Toolbar = Toolbar;
PageLayout.Filters = Filters;
PageLayout.Sorting = Sorting;
PageLayout.Content = Content;

export default PageLayout;
