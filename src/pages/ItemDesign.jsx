import React from 'react';
import { Global, css } from '@emotion/react';

const globalStyles = css`
  body {
    background-color: #14213d;
    margin: 0; 
  }
`;

const App = () => {
  return (
    <>
      <Global styles={globalStyles} />
      {/* Your application components go here */}
    </>
  );
};

export default App;
