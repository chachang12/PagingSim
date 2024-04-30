import styles from './style';
import {NavigationBar, Feature} from './components';


const App = () => (

  
  <div className="bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-darkGray via-darkRed to-darkdarkBlue w-full overflow-hidden">

    <div className={`bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-darkGray via-darkRed to-darkdarkBlue ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Feature />
      </div>
    </div>
    <div className='flex justify-center mb-2'>
      <div className={`${styles.boxWidth} font-PierSans-Regular text-white`}>
        Jeffery Filiberto & Carson Chang
      </div>
    </div>
    
  </div>
);

export default App
