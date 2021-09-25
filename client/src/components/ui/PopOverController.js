  
import React, { useState, useEffect, useRef } from 'react';
import { usePopper } from 'react-popper';

function PopOverController({
  className,
  innerClassName,
  zIndex,
  overlay,
  children,
  portal = true,
}) {

  const [visible, setVisibility] = useState(false);

  const referenceRef = useRef(null);
  const popperRef = useRef(null);
  // const [arrowRef, setArrowRef] = useState(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      modifiers: [
        { 
          name: "eventListeners", 
          enabled: visible 
        },
        // {
        //   name: 'arrow',
        //   options: {
        //     element: arrowRef,
        //   },
        // },
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ],
      placement: 'bottom',
    }
  );

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        referenceRef.current?.contains(event.target) ||
        popperRef.current?.contains(event.target)
      ) {
        return;
      }
      setVisibility(false);
    };
    // listen for clicks and close dropdown on body
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const body = (
    <div
      // className={`absolute ${className}`}
      ref={popperRef}
      {...attributes.popper}
      // style={{ zIndex: zIndex || 5, position: 'absolute', top: '2.25rem', right: '0.75rem' }}
      style={styles.popper}
    >
      <div
        style={styles.offset}
        className={`${visible ? "" : "hidden"} ${innerClassName}`}
      >
        {/* <div ref={setArrowRef} style={styles.arrow} id="arrow" /> */}
        {visible ? overlay(() => setVisibility(false)) : null}
      </div>
    </div>
  );

  return (
    <>
      <button
        style={{ display: "flex", color: 'transparent' }}
        ref={referenceRef}
        onClick={() => setVisibility(!visible)}
      >
        {children}
      </button>
      {/* {portal ? createPortal(body, document.querySelector("#popover-root")) : body} */}
      {body}
    </>
  );
}

export default PopOverController;
