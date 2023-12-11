import { useRef } from "react";
const MIN_DISTANCE = 10;
function getDirection(x, y) {
    if (x > y && x > MIN_DISTANCE) {
        return 'horizontal';
    }
    if (y > x && y > MIN_DISTANCE) {
        return 'vertical';
    }
    return '';
}
const useTouch = () => {
    const state = useRef({
        preX: 0, //开始拖拽时 div  相对于 原始位置的x值 
        preY: 0, //开始拖拽时 div  相对于 原始位置的y值 
        x: 0,  //拖拽时 一直变化的  相对于原始位置的x值
        y: 0,  //拖拽时 一直变化的  相对于原始位置的y值
        startX: 0,
        startY: 0,
        deltaX: 0,
        deltaY: 0,
        offsetX: 0,
        offsetY: 0,
        direction: '', //当前移动的方向
        time: 0, //移动的时间
    });
    /** 触摸开始时间 */
    const startTime = useRef(0);

    const setState = (options) => {
        Object.keys(options).forEach((key) => {
            state.current[key] = options[key];
        });
    };

    const reset = () => {
        setState({
            deltaX: 0,
            deltaY: 0,
            offsetX: 0,
            offsetY: 0,
            direction: '',
        });
    };

    const changeEvent = (event) => {
        // changedTouches 是 touchEnd 的值
        return (
            event?.touches?.[0] || event?.changedTouches?.[0] || event
        );
    };

    const start = (event) => {
        reset();
        const touch = changeEvent(event);
        setState({
            startX: touch.clientX,
            startY: touch.clientY,
            preX: state.current.x,
            preY: state.current.y,
        });
        startTime.current = Date.now();
    };

    const move = (event, limitX, limitY) => {
        const touch = changeEvent(event);
        // Fix: Safari back will set clientX to negative number
        const { preX, preY, startX, startY, direction } = state.current;
        const deltaX = touch.clientX < 0 ? 0 : touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const offsetX = Math.abs(deltaX);
        const offsetY = Math.abs(deltaY);
        const time = Date.now() - startTime.current;
        let CurrentX = preX + deltaX;
        let CurrentY = preY + deltaY;
        if (limitX && limitX.length === 2) {
            if ((preX + deltaX) < (limitX[0])) {
                CurrentX = 0;
            } else if ((preX + deltaX) > (limitX[1])) {
                CurrentX = limitX[1];
            }
        }
        if (limitY && limitY.length === 2) {
            if ((preY + deltaY) < (limitY[0])) {
                CurrentY = 0;
            } else if ((preY + deltaY) > (limitY[1])) {
                CurrentY = limitY[1];
            }
        }
        setState({
            x: CurrentX,
            y: CurrentY,
            deltaX,
            deltaY,
            offsetX,
            offsetY,
            time,
            direction: !direction ? getDirection(offsetX, offsetY) : '',
        });
    };

    //恢复原始位置初始值 （为了使滑块回到最初位置）
    const resetOringin = () => {
        setState({
            preX: 0,
            preY: 0,
            x: 0,
            y: 0,
            startX: 0,
            startY: 0,
            deltaX: 0,
            deltaY: 0,
            offsetX: 0,
            offsetY: 0,
            direction: '',
            time: 0,
        });
    }

    return {
        info: state.current,
        move,
        start,
        reset,
        resetOringin
    };

}

function useLatest(value) {
    const ref = useRef(value);
    ref.current = value;
    return ref;
}

//用于dom 拖拽
export default function useTouchEvent(options = {}) {
    const touch = useTouch();
    const optionsRef = useLatest(options);

    const onTouchStart = (e) => {
        if (options.isDisable?.all || options.isDisable?.onTouchStart) return;
        onStopEvent(e);
        touch.start(e);
        document.addEventListener('mousemove', onTouchMove, true);
        document.addEventListener('mouseup', onTouchEnd, true);
        optionsRef.current.onTouchStart?.(e);
    };
    const onTouchMove = (e) => {
        if (options.isDisable?.all || options.isDisable?.onTouchMove) return;
        onStopEvent(e);
        if (optionsRef.current.limitX || optionsRef.current.limitY) {
            touch.move(e, optionsRef.current.limitX, optionsRef.current.limitY);
        } else {
            touch.move(e);
        }
        optionsRef.current.onTouchMove?.(e, touch.info);
    };
    const onTouchEnd = (e) => {
        if (options.isDisable?.all || options.isDisable?.onTouchEnd) return;
        onStopEvent(e);
        if (optionsRef.current.limitX || optionsRef.current.limitY) {
            touch.move(e, optionsRef.current.limitX, optionsRef.current.limitY);
        } else {
            touch.move(e);
        }

        document.removeEventListener('mousemove', onTouchMove, true);
        document.removeEventListener('mouseup', onTouchEnd, true);

        optionsRef.current.onTouchEnd?.(e);
    };
    const onStopEvent = (e) => {
        if (options.isStopEvent || options.isStopPropagation) {
            e.stopPropagation();
        }
        if (options.isStopEvent || options.isPreventDefault) {
            e.preventDefault();
        }
    };

    return {
        ...touch,
        onTouchFn: onTouchMouse({
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            isOnMouseUp: options.isOnMouseUp,
            isOnTouchCancel: options.isOnTouchCancel,
        }),
    };
}

/** 处理鼠标或手指触摸事件 */
export const onTouchMouse = ({
    onTouchStart,
    onTouchEnd,
    isOnMouseUp,
}) => {
    return {
        onMouseDown: onTouchStart,
        ...(isOnMouseUp ? { onMouseUp: onTouchEnd } : null),
    };
};