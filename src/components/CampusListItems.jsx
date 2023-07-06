import React from 'react';
import { CampusCard } from '../components';
import { useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid'

const CampusListItems = (props) => {
  const { allCampuses } = props;
    const isMediumScreen = useMediaQuery('(max-width: 900px)');
  const isSmallScreen = useMediaQuery('(max-width: 700px')

  return (
     <Grid container spacing={2} sx={{ padding:'5px' }}>
      {allCampuses.map((campus) => {
        return (
          <Grid item xs={isSmallScreen ? 12 : isMediumScreen ? 6 : 4} key={campus.id} sx={{marginBottom: '50px'}}>
          
            <CampusCard
              id={campus.id}
              name={campus.name}
              imageUrl={campus.imageUrl}
              address={campus.address}
              description={campus.description}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CampusListItems;