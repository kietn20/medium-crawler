import { useState } from "react";
import { useSearchModalStore } from "../store/searchModal";

export const Slot = () => {
	const showSearchModal = useSearchModalStore((state) => state.showSearchModal);
	const setShowSearchModal = useSearchModalStore((state) => state.setShowSearchModal);

	return (
		<div
			className="w-[165px] h-[280px] border border-[#B1FA63] rounded-[30px] flex items-center justify-center text-[#B1FA63] text-9xl font-heading opacity-35 cursor-pointer"
			style={{
				borderStyle: "dashed",
				borderWidth: "2px",
			}}
			onClick={() => setShowSearchModal(!showSearchModal)}
		>
			<div className="mb-10">+</div>
		</div>
	);
};
