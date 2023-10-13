import { Helmet } from 'react-helmet-async';

import { InjectorView } from 'src/sections/injector-tools/view';

// ----------------------------------------------------------------------

export default function InjectorPage() {
  return (
    <>
      <Helmet>
        <title> eFishery | Injector Tools </title>
      </Helmet>

      <InjectorView />
    </>
  );
}
