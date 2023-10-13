import { Helmet } from 'react-helmet-async';

import { HistoryView } from 'src/sections/history-inject/view';

// ----------------------------------------------------------------------

export default function InjectorTools() {
  return (
    <>
      <Helmet>
        <title> eFishery | History Inject </title>
      </Helmet>

      <HistoryView />
    </>
  );
}
