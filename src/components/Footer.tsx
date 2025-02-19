import { NextJSLogo } from "@/res/logos/NextJSLogo";
import { OpenAILogo } from "@/res/logos/OpenAILogo";
import { StripeLogo } from "@/res/logos/StripeLogo";
import { TierLogo } from "@/res/logos/TierLogo";
import { VercelLogo } from "@/res/logos/VercelLogo";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 pb-24">
      
      {/* <a href={`mailto:info@projectxlabs.co `}  className="text-md md:text-2xl  ">info@projectxlabs.co</a> */}
      {/* href="mailto:email@example.com?subject='Hello from Abstract!'&body='Just popped in to say hello' */}
      {/* <span className="h6 text-slate-11">Powered By</span> */}
      {/* Logos */}
      {/* <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <TierLogo />
        <OpenAILogo />
        <NextJSLogo />
        <VercelLogo />
        <StripeLogo />
      </div> */}
    </footer>
  );
}
