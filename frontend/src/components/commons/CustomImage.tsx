/* eslint-disable @typescript-eslint/no-explicit-any */
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => (
  <div>
    <LazyLoadImage
      alt={alt}
      src={src}
      className={className}
      {...props}
      effect="blur"
    />
  </div>
);

export default CustomImage;
