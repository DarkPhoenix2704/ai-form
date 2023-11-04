import { Button } from '@nextui-org/react';

const Login = () => {
  const googlelogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center w-full h-[100vh] border-none bg-[#F5F7FA]">
        <div className="border-none w-[450px] flex flex-col items-center bg-white m-8 py-8 px-8 rounded-md bg-transparent shadow-sm drop-shadow-sm">
          <h1 className="text-3xl font-bold">Login</h1>
          <Button size="sm" className="w-72 mt-2" onClick={googlelogin}>
            <div className="flex w-full items-center justify-center gap-2 flex-row">
              Login
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
