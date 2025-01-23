/* eslint-disable react/prop-types */
import { Tooltip, Zoom } from "@mui/material";

const Title = ({ placement, title, enterDelay, leaveDelay, children }) => {
  return (
    <Tooltip
      title={title}
      arrow
      slots={{
        transition: Zoom,
      }}
      placement={placement}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
    >
      {children}
    </Tooltip>
  );
};

export default Title;
