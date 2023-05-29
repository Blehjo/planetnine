import styles from '../../styles/components/button.less';


const Button = ({ text, icon, active, onClick }) => (
  <div className={active ? styles.active : styles.button} onClick={onClick}>
    <div className={styles.icon}>
      <i className={`ion-${icon}`} />
    </div>
    <div className={styles.text}>
      {text}
    </div>
  </div>
);


export default Button;
