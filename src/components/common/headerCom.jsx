import styles from '../../assets/css/header.less'

export default function HeaderCom(props) {
  function cancelLeft(e) {
    !!props.callbackLeft && props.callbackLeft(e)
  }
  const iconLeft = props.iconLeft || 'icon-yuyinguanbi';//设置左侧icon
  return (
    <div className={styles['headerCom']}>
      <div onClick={(e)=>{cancelLeft(e)}} className={styles['headerComLeft']}>
        <span className={`iconfont ${iconLeft} ${styles['headerComLeftIcon']}`}></span>
      </div>
      <div className={styles['headerComCenter']}>{props.titleText}</div>
      <div className={styles['headerComRight']}></div>
    </div>
  )
}