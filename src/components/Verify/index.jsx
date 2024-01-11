import { Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import useTouchEvent from "@/hooks/useTouchEvent";
import { reqGet, reqCheck } from "@/api/login";
import { RightOutlined } from "@ant-design/icons";
import { aesEncrypt } from "@/utils/encryption";
import styles from "./index.module.less";

const Verify = (props) => {
  // eslint-disable-next-line react/prop-types
  const { visible, setVisible, handleSuccess } = props;
  const [verifyInfo, setVerifyInfo] = useState({});
  const [transitionLeft, setTransitionLeft] = useState("");
  const [isMove, setIsMove] = useState(false); //是否在滑动
  const [verifyStatus, setVerifyStatus] = useState(""); //判断是否验证成功

  const [dom, setDom] = useState({
    x: 0,
    y: 0,
  });
  const [tooltip, setTooltip] = useState({
    x: 0,
    y: 0,
  });
  const { info, onTouchFn, resetOringin } = useTouchEvent({
    onTouchStart() {
      setTransitionLeft("");
      setIsMove(true);
    },
    onTouchMove() {
      setDom({ x: info.x, y: info.y });
    },
    onTouchEnd() {
      checkVerify();
    },
    limitX: [0, 355], //限制x轴滑动距离
    limitY: [0, 0], //限制y轴滑动距离
  });

  //检查验证图片是否对齐
  const checkVerify = () => {
    const moveLeftDistance = (dom.x * 310) / 400;
    const data = {
      captchaType: "blockPuzzle",
      pointJson: verifyInfo.secretKey
        ? aesEncrypt(
            JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
            verifyInfo.secretKey
          )
        : JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
      token: verifyInfo.backToken,
    };
    reqCheck(data).then((res) => {
      if (res.repCode === "0000") {
        setVerifyStatus("success");
        setTooltip({
          x: 0,
          y: -30,
        });
        const captchaVerification = verifyInfo.secretKey
          ? aesEncrypt(
              verifyInfo.backToken +
                "---" +
                JSON.stringify({
                  x: moveLeftDistance,
                  y: 5.0,
                }),
              verifyInfo.secretKey
            )
          : verifyInfo.backToken +
            "---" +
            JSON.stringify({ x: moveLeftDistance, y: 5.0 });
        setTimeout(() => {
          setVisible(false);
          setVerifyStatus("");
          handleSuccess({ captchaVerification });
        }, 1000);
      } else {
        setVerifyStatus("error");
        setTooltip({
          x: 0,
          y: -30,
        });
        setTimeout(() => {
          resetOringin();
          setTransitionLeft("all .3s linear");
          setDom({ x: 0, y: 0 });
          setIsMove(false);
          getPictrue();
        }, 1000);
      }
    });
  };

  const createUid = () => {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let slider = "slider" + "-" + s.join("");
    let point = "point" + "-" + s.join("");
    // 判断下是否存在 slider
    if (!localStorage.getItem("slider")) {
      localStorage.setItem("slider", slider);
    }
    if (!localStorage.getItem("point")) {
      localStorage.setItem("point", point);
    }
  };
  //请求背景和图片
  const getPictrue = () => {
    const data = {
      captchaType: "blockPuzzle",
      clientUid: localStorage.getItem("slider"),
      ts: Date.now(), // 现在的时间戳
    };
    reqGet(data).then((res) => {
      setVerifyStatus("");
      setTooltip({
        x: 0,
        y: 0,
      });
      if (res.repCode === "0000") {
        setVerifyInfo({
          backImgBase: res.repData.originalImageBase64,
          blockBackImgBase: res.repData.jigsawImageBase64,
          backToken: res.repData.token,
          secretKey: res.repData.secretKey,
        });
      }
      // 判断接口请求次数是否失效
      if (res.repCode === "6201") {
        setVerifyInfo({
          backImgBase: null,
          blockBackImgBase: null,
          backToken: "",
          secretKey: "",
        });
      }
    });
  };
  useEffect(() => {
    if (visible) {
      //生成uid
      createUid();
      getPictrue();
    }else{
        resetOringin();
        setTooltip({x:0,y:0});
        setDom({ x: 0, y: 0 });
        setIsMove(false);
    }
  }, [visible]);

  return (
    <Modal
      width="450px"
      open={visible}
      onCancel={() => {
        setVisible(false);
      }}
      footer={null}
      title="请完成安全验证"
    >
      <div className={styles.verify_box}>
        <div className={styles.verify_img_panel}>
          <img
            src={
              verifyInfo.backImgBase
                ? "data:image/png;base64," + verifyInfo.backImgBase
                : ""
            }
            style={{ width: "100%", height: "100%", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              top: "0px",
              width: "60px",
              height: "100%",
              transform: `translate(${dom.x}px, ${dom.y}px)`,
              transition: transitionLeft,
            }}
          >
            <img
              src={"data:image/png;base64," + verifyInfo.blockBackImgBase}
              alt=""
              style={{ width: "100%", height: "100%", display: "block" }}
            />
          </div>
          <div
            style={{
              height: "30px",
              lineHeight: "30px",
              color: "#fff",
              transform: `translate(0px,${tooltip.y}px)`,
              transition: "all 0.3s linear",
              backgroundColor:
                verifyStatus === "success"
                  ? "rgba(92, 184, 92,.5)"
                  : verifyStatus === "error"
                  ? "rgba(217, 83, 79,.5)"
                  : "",
            }}
          >
            {verifyStatus === "success"
              ? `${(parseInt(info.time) / 1000).toFixed(2)}s 验证成功`
              : "验证失败"}
          </div>
        </div>
        <div className={styles.verify_bar_box}>
          <div
            className={styles.verify_bar_btn}
            style={{
              transform: `translate(${dom.x}px, ${dom.y}px)`,
              transition: transitionLeft,
              backgroundColor: isMove ? "rgb(51,122,183)" : "#fff",
            }}
            {...onTouchFn}
          >
            <RightOutlined />
          </div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "150px",
              display: isMove ? "none" : "block",
            }}
          >
            向右滑动完成验证
          </div>
          <div
            className={styles.moveStyle}
            style={{ width: `${dom.x}px`, transition: transitionLeft }}
          ></div>
        </div>
      </div>
    </Modal>
  );
};
export default Verify;
