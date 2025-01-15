export const Login = () => {
  return (
    <div className="w-screen h-screen overflow-y-scroll bg-[#0A0B06] flex flex-col justify-center items-center bg-topography-texture gap-10 font-heading">
      <h1 className="font-heading text-[#B1FA63] text-white text-9xl">
        medium crawler
      </h1>
      <div className="w-[600px] h-[700px] bg-[#142120] flex flex-col justify-start items-center rounded-[30px] text-white">
        <span className="text-8xl">Login</span>
        <form action="" className="flex flex-col justify-center items-center gap-2">
          <div>
            <label htmlFor="email" className="text-3xl flex">
              email
            </label>
            <input
              type="text"
              className="w-[445px] h-[55px] text-2xl border-none text-[#0A0B06]"
            />
          </div>
          <div className="">
            <label htmlFor="password" className="text-3xl flex">
              password
            </label>
            <input
              type="password"
              className="w-[445px] h-[55px] text-2xl border-none text-[#0A0B06]"
            />
          </div>
          <button className="w-[445px] h-[55px] text-2xl rounded-[20px] bg-white text-[#80978F]">
            Log in with Google
          </button>
          <button className="w-[445px] h-[55px] text-2xl rounded-[20px] bg-white text-[#80978F]">
            Log in with Github
          </button>
          <button className="w-[500px] h-[80px] bg-[#8ac847] text-4xl">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
