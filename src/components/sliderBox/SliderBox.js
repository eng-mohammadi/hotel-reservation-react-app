import React, { useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const SliderBox = ({ error, title, images, index, goNext, goPrev }) => {
  const imgRef = useRef(null);

  if (error) {
    return <h1 className="error-title">خطا: {error}</h1>;
  } else if (images.length === 0) {
    return <h2 className="loading-title">در حال بارگذاری ....</h2>;
  } else {
    return (
      <React.Fragment>
        <header className="slider-container">
          <TransitionGroup>
            <CSSTransition
              key={images[index]}
              classNames="slide"
              timeout={500}
              nodeRef={imgRef}
            >
              <img
                ref={imgRef}
                src={images[index]}
                alt={`${title} ${index + 1}`}
                className="slider-image"
              />
            </CSSTransition>
          </TransitionGroup>
          <div className="slider-buttons">
            <button onClick={goPrev} disabled={index <= 0}>
              قبلی
            </button>
            <button onClick={goNext} disabled={index >= images.length - 1}>
              بعدی
            </button>
          </div>
        </header>
      </React.Fragment>
    );
  }
};

export default SliderBox;
