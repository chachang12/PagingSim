import styles from './style';
import {NavigationBar, Feature} from './components';


const App = () => (
  <div className="bg-teal w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth} py-6 justify-center`}>
        <NavigationBar />
      </div>
    </div>

    <div className={`bg-teal ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Feature />
      </div>
    </div>

  </div>
);

export default App
