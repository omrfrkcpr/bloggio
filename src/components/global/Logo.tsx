import React from "react";
import Box from "@mui/material/Box";
import CustomImage from "../../utils/CustomImage";
import setups from "../../helpers/setup";

const Logo: React.FC<LogoProps> = ({ sx, width, alt, onClick }) => {
  return (
    <Box sx={sx} onClick={onClick}>
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
