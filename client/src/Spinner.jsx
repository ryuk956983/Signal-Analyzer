import React,{useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const OverlaySpinner = () => {
    useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-[#ffffff80]  flex items-center justify-center z-50">
          <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>   </div>
  );
};

export default OverlaySpinner;
