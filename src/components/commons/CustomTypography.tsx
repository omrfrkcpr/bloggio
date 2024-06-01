/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Typography from "@mui/material/Typography";

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

const MemoizedCustomTypography = React.memo(CustomTypography);

export default MemoizedCustomTypography;
