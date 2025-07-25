import React from "react";
import { FaGithub, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const SocialLoginButtons = ({
  onGoogleLogin = () => {},
  onGithubLogin = () => {},
  onFacebookLogin = () => {},
}) => {
  const buttons = [
    {
      Icon: FaGithub,
      onClick: onGithubLogin,
    },
    {
      Icon: FcGoogle,
      onClick: onGoogleLogin,
    },
    {
      Icon: FaFacebook,
      onClick: onFacebookLogin,
    },
  ];

  return (
    <div className="flex justify-around gap-2">
      {buttons.map(({ Icon, onClick }, idx) => (
        <button
          key={idx}
          type="button"
          onClick={onClick}
          className="btn bg-none border-[#e5e5e5] flex-1"
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
};

export default SocialLoginButtons;
