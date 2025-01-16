import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export const Login = () => {
	return (
		<div
			className="w-screen h-screen overflow-y-scroll bg-[#0A0B06] flex flex-col justify-center items-center bg-topography-texture1 gap-10 font-heading"
			style={{
				position: "relative",
				zIndex: 1,
			}}
		>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: "url('src/assets/topography.svg')",
					opacity: 0.3,
					zIndex: -1,
				}}
			/>
      <Toaster />
			<h1 className="font-heading text-[#B1FA63]  text-9xl">
				medium crawler
			</h1>
			<div className="w-[600px] h-[650px] bg-[#142120] flex flex-col justify-start items-center rounded-[30px] text-white drop-shadow-2xl select-none">
				<span className="text-8xl text-[#B1FA63]">sign in</span>
				<form
					action=""
					className="flex flex-col justify-center items-center gap-2"
				>
					<div>
						<label htmlFor="email" className="text-3xl flex">
							email
						</label>
						<input
							type="text"
							className="w-[445px] h-[45px] text-2xl outline-none text-[#0A0B06] focus:ring-4 focus:ring-[#8ac847] duration-150 mt-1"
						/>
					</div>
					<div className="">
						<label htmlFor="password" className="text-3xl flex">
							password
						</label>
						<input
							type="password"
							className="w-[445px] h-[45px] text-2xl outline-none text-[#0A0B06] focus:ring-4 focus:ring-[#8ac847] duration-150 mt-1"
						/>
					</div>
					<button className="w-[445px] h-[50px] bg-[#8ac847] opacity-50 hover:opacity-100 duration-150 text-2xl rounded-2xl mt-4">
						sign in
					</button>
				</form>

				<div className="w-[500px] h-1 bg-[#545b4c] rounded-9xl my-6" />

				<button className="w-[445px] h-[55px] text-2xl rounded-[20px] bg-white text-[#80978F] relative hover:bg-[#0A0B06] hover:text-[#B1FA63] duration-150"> 
					sign in with Google
					<img src="src/assets/google.png" alt="github" className="w-8 h-8 absolute top-3 left-12 opacity-70"/>
				</button>
				<span className="my-2">or</span>
				<button className="w-[445px] h-[55px] text-2xl rounded-[20px] bg-white text-[#80978F] relative hover:bg-[#0A0B06] hover:text-[#B1FA63] duration-150"> 
					sign in with Github
					<img src="src/assets/github.svg" alt="github" className="w-8 h-8 absolute top-3 left-12 opacity-70"/>
				</button>
				<span className="mt-5">
					not a member yet?{" "}
					<Link to="/register" className="text-[#B1FA63]">
						sign up!
					</Link>
				</span>
			</div>
		</div>
	);
};
