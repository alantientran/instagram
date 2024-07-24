import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        // if user is authenticated, redirect to home page
        <Navigate to="/" />
      ) : (
        <>
          {/* justify-center centers horizontally and items-center centers 
          vertically. flex-col makes components stack vertically. py-10 is 
          'padding 10 units top and bottom*/}
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <img
            src="/assets/images/profile.png"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
