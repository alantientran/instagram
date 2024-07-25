const Loader = () => (
  <div className="flex-center w-full">
    <img
      src="/assets/icons/loader.svg"
      alt="loader"
      width={24}
      height={24}
      className="animate-spin"
    />
  </div>
);

export default Loader;

/* note that this is an arrow function with implicit return  const function = () => ()
   rather than explicit return arrow function const function = () => { return () }
*/
