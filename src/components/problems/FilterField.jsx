import { Autocomplete, Grid, TextField } from '@mui/material';
import { useState } from 'react';

const OPTIONS = {
  field: [
    { label: 'CS' },
    { label: 'ECE' },
    { label: 'EE' },
    { label: 'ME' },
    { label: 'MNC' },
    { label: 'EP' },
  ],
  subject: [
    { label: 'Computer Networks' },
    { label: 'DSA' },
    { label: 'DBMS' },
    { label: 'Distributed Systems' },
    { label: 'Microprocessor' },
    { label: 'Classical Mechanics' },
    { label: 'Quantum Mechanics' },
    { label: 'Statistical Mechanics' },
  ],
  difficulty: [{ label: 'easy' }, { label: 'medium' }, { label: 'hard' }],
};

const FilterField = ({ type, selectedField }) => {
  const [filterValue, setFilterValue] = useState(selectedField);

  return (
    <Grid item xs>
      <Autocomplete
        isOptionEqualToValue={(option, val) => option.value === val.value}
        id={`${type}-select`}
        options={OPTIONS[type]}
        value={filterValue}
        onChange={(e, newfilterValue) => setFilterValue(newfilterValue)}
        renderInput={params => <TextField {...params} label={type} />}
      />
    </Grid>
  );
};

export default FilterField;
