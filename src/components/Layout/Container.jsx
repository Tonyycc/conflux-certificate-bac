import React from "react";

import { Box } from "../Box";

const Container = ({ children, ...props }) => (
  <Box mx="auto" maxWidth="90%" {...props}>
    {children}
  </Box>
);

export default Container;
