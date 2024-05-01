/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Typography from "@mui/material/Typography";

interface HeaderProps {
  textAlign?: string;
  variant?: string;
  sx?: {
    [key: string]: string | number | Record<string, string | number>;
  };
  href?: string;
  content?: string;
  noWrap?: boolean;
  component?: string;
}

const CustomTypography: React.FC<HeaderProps> = ({
  variant,
  sx,
  href,
  noWrap,
  content,
  textAlign,
  component,
}) => {
  return (
    <Typography
      variant={variant as any}
      noWrap={noWrap}
      component={component as any}
      href={href}
      sx={sx}
      textAlign={textAlign as any}
    >
      {content}
    </Typography>
  );
};

export default CustomTypography;
