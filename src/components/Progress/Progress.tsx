import React, { FC } from 'react'
import { ThemeProps } from '../Icon/Icon';

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  style?: React.CSSProperties;
  theme?: ThemeProps
}

const Progress: FC<ProgressProps> = ({percent, strokeHeight = 15, showText = true, style, theme = 'primary'}) => {
  return (
    <div className='progress-bar' style={style}>
      <div className="progress-bar-outer" style={{height: `${strokeHeight}`}}>
        <div className={`progress-bar-inner color-${theme}`} style={{width: `${percent}%`}}>
          {showText && <span className='inner-text'>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

export default Progress