import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';

const TooltipInfo  = ({ message }) => (
  <OverlayTrigger
    overlay={(
      <Tooltip>
        {message}
      </Tooltip>
    )}
  >
    <FaInfoCircle />
  </OverlayTrigger>
);

export default TooltipInfo;