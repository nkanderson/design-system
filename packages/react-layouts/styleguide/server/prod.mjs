import express from 'express';

import app from './index.mjs';
import paths from '../../config/paths';

const port = process.env.PORT || 3000;

app.use(express.static(paths.styleguideDist())).listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
