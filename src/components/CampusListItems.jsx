import React from 'react';
import { CampusCard } from '../components';

const CampusListItems = (props) => {
  const { allCampuses } = props;

  return (
    <div>
      {allCampuses.map((campus) => {
        return (
          <div key={campus.id}>
            <CampusCard
              id={campus.id}
              name={campus.name}
              imageUrl={campus.imageUrl}
              address={campus.address}
              description={campus.description}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CampusListItems;