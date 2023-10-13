import { Helmet } from 'react-helmet-async';

import { ReadView } from 'src/sections/read-tools/view';

// ----------------------------------------------------------------------

export default function ReadPage() {
  return (
    <>
      <Helmet>
        <title> eFishery | Read Tools </title>
      </Helmet>

      <ReadView />
    </>
  );
}
