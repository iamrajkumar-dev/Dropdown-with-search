import React, { useRef, useEffect, useState } from "react";

const Tooltip = () => {
  const ButtonRef = useRef(null);
  const TooltipRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (isShow && ButtonRef.current && TooltipRef.current) {
      const buttonRect = ButtonRef.current.getBoundingClientRect();
      const tooltipRect = TooltipRef.current.getBoundingClientRect();
      console.log(buttonRect, tooltipRect);

      const newTop = {
        top: buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2,
        left: buttonRect.top - tooltipRect.height - 10,
      };

      if (newTop.top < 0) {
        setPosition({
          top: buttonRect.bottom + 10,
          left: buttonRect.left + buttonRect.width / 2,
        });
      } else {
        setPosition(newTop);
      }
    }
  }, [isShow]);

  const showTooltip = () => {
    setIsShow(true);
  };
  const hideTooltip = () => {
    setIsShow(false);
  };

  return (
    <div>
      <h1>Tooltip</h1>
      <button
        style={{ margin: 20, padding: 20 }}
        ref={ButtonRef}
        onMouseOver={showTooltip}
        onMouseLeave={hideTooltip}
      >
        Hover me
      </button>
      {isShow && (
        <div
          className="tooltip"
          ref={TooltipRef}
          style={{
            margin: 10,
            padding: 10,
            backgroundColor: "gray",
            borderRadius: 5,
            position: "fixed",
            top: position.top,
            left: position.left,
          }}
        >
          I am Raj hsdgfjs jdfgjd
        </div>
      )}
    </div>
  );
};

export default Tooltip;
