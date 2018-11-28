import React from 'react';
import { ScaleLoader } from 'react-spinners';

const Loader = ({
  as: Com,
  loading = true,
  size = 5,
  sizeUnit = 'px',
  color = '#fff',
  height = 20,
  ...options
}) => {
  const LoaderComponent = Com || ScaleLoader;
  return (
    <LoaderComponent
      height={height}
      loading={loading}
      size={size}
      sizeUnit={sizeUnit}
      color={color}
      {...options}
    />
  );
};

export default Loader;

/** USE WITH ANOTHER LOADER */
/**
 * import { AnotherLoader } from 'react-spinners';
 * 
 * <Loader as={AnotherLoader} {...loader options here} />
 */


/** https://www.npmjs.com/package/react-spinners */