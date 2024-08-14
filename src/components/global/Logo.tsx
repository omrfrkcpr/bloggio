import React from "react";
import Box from "@mui/material/Box";
import CustomImage from "../../utils/CustomImage";
import setups from "../../helper/setup";

const Logo: React.FC<LogoProps> = ({ sx, width, alt }) => {
  return (
    <Box sx={sx}>
      <CustomImage
        src={`${setups.AWS_S3_BASE_URL}symbol.png`}
        alt={alt || ""}
        width={width}
      />
    </Box>
  );
};

const MemoizedLogo = React.memo(Logo);

export default MemoizedLogo;
