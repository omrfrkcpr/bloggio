/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Typography from "@mui/material/Typography";

interface HeaderProps {
  textAlign?: string;
  variant?: string;
  sx?: {
    [key: string]: string | number | Record<string, string | number>;
  };
  content?: string;
  noWrap?: boolean;
}

const CustomTypography: React.FC<HeaderProps> = ({
  variant,
  sx,

  noWrap,
  content,
  textAlign,
}) => {
  return (
    <Typography
      variant={variant as any}
      noWrap={noWrap}
      sx={sx}
      textAlign={textAlign as any}
    >
      {content}
    </Typography>
  );
};

export default CustomTypography;
