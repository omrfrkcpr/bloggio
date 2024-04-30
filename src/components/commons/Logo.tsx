import React from "react";
import Box from "@mui/material/Box";
import symbol from "../../assets/symbol.png";

interface LogoProps {
  sx?:
    | { [key: string]: string }
    | {
        display?: string | { [key: string]: string };
        mr?: number | string;
      };
  width?: string;
}

const Logo: React.FC<LogoProps> = ({ sx, width }) => {
  return (
    <Box sx={sx}>
      <img src={symbol} alt="Logo" width={width} />
    </Box>
  );
};

export default Logo;
