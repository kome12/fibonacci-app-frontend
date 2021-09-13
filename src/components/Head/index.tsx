import React, { useMemo } from "react";
import { Helmet } from "react-helmet";

export const Head: React.FC<{ title?: string }> = ({ title, children }) => {
  const pageTitle = useMemo(
    () => `My Niwa${title ? ` | ${title}` : ""}`,
    [title]
  );

  return (
    <Helmet>
      <title>{pageTitle}</title>
      {children}
    </Helmet>
  );
};
