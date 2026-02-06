import React from 'react';
import { ChevronLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { LoginDeprecationNotice } from '../../LoginDeprecationNotice';

type SubComponentProperties = {
  children: React.ReactNode;
};

function Breadcrumbs({ children }: SubComponentProperties) {
  return <div className="mb-2">{children}</div>;
}

function Title({ children }: SubComponentProperties) {
  return <h5 className="mb-6 text-4xl leading-tight">{children}</h5>;
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
  return <div className="flex justify-between pb-2 gap-2">{children}</div>;
}

function BackButton({ fallback = '/' }: { fallback?: string }) {
  const navigate = useNavigate();

  const handleBack = () => {
    const canGoBack = window.history.state?.idx > 0;

    if (canGoBack) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };
  return (
    <Button
      variant="outline"
      className="h-8 w-fit p-2"
      size="icon"
      onClick={handleBack}
    >
      <ChevronLeft />
      <div>Назад</div>
    </Button>
  );
}

type PageLayoutProperties = {
  children: React.ReactNode;
  className?: string;
};

function PageLayout({ children, className }: PageLayoutProperties) {
  return (
    <div className={`p-6 ${className || ''}`}>
      <div className="mb-6">
        <LoginDeprecationNotice />
      </div>
      {children}
    </div>
  );
}

PageLayout.Breadcrumbs = Breadcrumbs;
PageLayout.Title = Title;
PageLayout.Diagrams = Diagrams;
PageLayout.Toolbar = Toolbar;
PageLayout.Filters = Filters;
PageLayout.Sorting = Sorting;
PageLayout.Content = Content;
PageLayout.BackButton = BackButton

export default PageLayout;
