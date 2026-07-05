import 'react';
import { useParams } from 'react-router-dom';

export const ShowDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Show Details</h2>
      <p>Viewing podcast ID: {id}</p>
    </div>
  );
};