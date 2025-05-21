import styles from './ImageStack.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

function ImageStack({ images, onOpenSetPrimaryImg })
{
  return (
    <div className={cx('wrapper')} onClick={() => onOpenSetPrimaryImg(images)}>
      <div className={cx('img-area', { single: images.length <=1 })} style={{ backgroundImage:`url(${images[0].url})` }}> 
      </div>
    </div>
  )
}

export default ImageStack