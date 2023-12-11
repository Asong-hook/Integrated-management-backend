import { Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import styles from './index.module.less'

const Verify = (props) => {
  // eslint-disable-next-line react/prop-types
  const { visible, setVisible } = props;
  const [backImgBase, setBackImgBase] = useState("");

  const createUid = () => {
    let s = []
      let hexDigits = '0123456789abcdef'
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'

      let slider = 'slider' + '-' + s.join('')
      let point = 'point' + '-' + s.join('')
      // 判断下是否存在 slider
      if (!localStorage.getItem('slider')) {
        localStorage.setItem('slider', slider)
      }
      if (!localStorage.getItem('point')) {
        localStorage.setItem('point', point)
      }
  }
  //请求背景和图片
  const getPictrue = async () => {

  }
  useEffect(()=>{
    if(visible){
        //生成uid
        createUid();
        getPictrue();
    }
  },[visible])

  return (
    <Modal
      width="430px"
      open={visible}
      onCancel={() => {
        setVisible(false);
      }}
      footer={null}
      title="请完成安全验证"
    >
        <div className={styles.verify_box}>
            <div className={styles.verify_img_panel}>
                <img src={ backImgBase ? ('data:image/png;base64,'+ backImgBase) : ''}/>
            </div>
        </div>
    </Modal>
  );
};
export default Verify;
