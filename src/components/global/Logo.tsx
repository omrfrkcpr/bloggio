import React from "react";
import Box from "@mui/material/Box";
import symbol from "../../assets/symbol.png";
import CustomImage from "../../utils/CustomImage";

const Logo: React.FC<LogoProps> = ({ sx, width, alt }) => {
  return (
    <Box sx={sx}>
      <CustomImage src={symbol} alt={alt || ""} width={width} />
    </Box>
  );
};

const MemoizedLogo = React.memo(Logo);

export default MemoizedLogo;
