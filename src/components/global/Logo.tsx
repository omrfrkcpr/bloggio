import React from "react";
import Box from "@mui/material/Box";
import symbol from "../../assets/symbol.png";
import CustomImage from "../commons/CustomImage";

const Logo: React.FC<LogoProps> = ({ sx, width }) => {
  return (
    <Box sx={sx}>
      <CustomImage src={symbol} alt="Logo" width={width} />
    </Box>
  );
};

const MemoizedLogo = React.memo(Logo);

export default MemoizedLogo;
