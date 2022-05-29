import classes from "./MoviesForm.module.css";
import React, { useRef } from "react";

const MoviesForm = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    props.onAddMovies(movie)
  };

  return (
    <form className={classes["form-container"]} onSubmit={submitHandler}>
      <div>
        <label>Title</label>
        <input type="text" ref={titleRef} />
      </div>
      <div className={classes.openingText}>
        <label>Openeing Text</label>
        <textarea type="text" ref={openingTextRef} />
      </div>
      <div>
        <label>Release Date</label>
        <input type="text" ref={releaseDateRef} />
      </div>
      <br></br>
      <button className={classes.movieBtn}>Add Movie</button>
    </form>
  );
};
export default React.memo(MoviesForm);
