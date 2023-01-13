import { useState } from "react";
// import { Link } from "react-router-dom";
import { SiSpacex } from "react-icons/si";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="absolute flex items-center justify-between px-5 w-full">
        <div>
          <SiSpacex className="text-8xl text-white" />
        </div>
      </header>
    </>
  );
}
