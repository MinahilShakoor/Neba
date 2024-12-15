// bill-calculation.tsx

import * as React from 'react';
import { Button, Typography } from '@mui/material';

const BillCalculation = () => {
  return (
    <div>
      <Typography variant="h4">Calculate Your Bill</Typography>
      <Button variant="contained" color="primary">
        Calculate
      </Button>
    </div>
  );
};

export default BillCalculation;
