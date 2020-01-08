import styles from './index.css';
import {BtButton} from '../components';

export default function() {
  return (
    <div className={styles.normal}>
      <BtButton type={'primary'}>primary</BtButton>
    </div>
  );
}
