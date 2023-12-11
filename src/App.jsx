import globalStyles from './global.module.scss';

import { useRoutes } from './hooks/routes.hook';

function App() {
  const routes = useRoutes();

  return <div className={globalStyles.wrapper}>{routes}</div>;
}

export default App;
