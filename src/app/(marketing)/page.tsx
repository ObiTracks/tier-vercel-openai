import Link from "next/link";
import { clsx } from "clsx";

import { BgPattern } from "@/components/ui/Bgpattern";
import { MatrixIcon } from "@/res/icons/MatrixIcon";
import { ProjectXIcon } from "@/res/icons/ProjectXIcon";
import { ProjectXIconOutline } from "@/res/icons/ProjectXIconOutline";
import { ProjectXLogo } from "@/res/logos/ProjectXLogo";

import { EmailNotify, UseCaseChip, UseCaseList } from "./components"; // import the client component

export default function IndexPage() {
  return (
    <>
      {/* <div className="hidden md:block"> */}
      <BgPattern />
      {/* </div> */}
      {/* <header className="py-4 bg-gray-900 text-white text-center leading-snug">

      </header> */}
      <div className="mt-10 flex flex-col items-center gap-6 px-5 sm:px-4 md:mt-20 md:gap-12 md:px-8 xl:mt-24">
        <div className="flex w-fit flex-row items-center justify-center gap-2 rounded-full border border-gray-600 px-3 py-1">
          <ProjectXIconOutline className={clsx("m-0 h-5 w-5 p-0")} />
          {/* <span className="hidden md:block flex justify-center">
            
          </span> */}
          <p className="hidden gap-2  px-4 text-center text-2xs font-semibold  uppercase tracking-[2px] text-slate-12 sm:flex sm:text-sm md:px-0">
            Build products in minutes, not days.
          </p>
          {/* <p className=" hidden md:block text-lg md:text-xl lg:text-xl font-bold md:font-semibold text-center px-4 md:px-0 text-slate-12">
            Build products in minutes, not days.
          </p> */}
        </div>

        <span className="flex justify-center sm:hidden">
          <ProjectXIcon className={clsx("mb-4 h-6 w-6")} />
        </span>

        <h2 className="xl:h2 w-full text-center text-[2.8rem] font-bold leading-[3rem] tracking-tighter md:w-[902px] md:px-0 md:text-7xl md:leading-tight lg:text-8xl">
          Turn{" "}
          <span className="text-blue">
            conversation into <span className="text-purple">codebase.</span>
          </span>
          {/* <span className="sm:hidden ">with <span className="lg:hidden purple-gradient-text">AI Agents</span></span> */}
        </h2>

        <p className="mt-4 hidden  w-full text-center text-sm font-light leading-snug text-slate-11 sm:block sm:text-base md:w-[600px] md:px-0 md:text-lg lg:text-xl xl:text-lg">
          Experience <span className="font-medium text-slate-12 opacity-100">fully automated,</span>{" "}
          iterative, and{" "}
          <span className="font-medium text-slate-12"> rapid software development,</span> powered by
          collaborative AI agents.{" "}
          <span className="font-medium text-white">All with you in the loop.</span>
        </p>

        <p className="mt-4 w-full px-6 text-center text-sm font-light leading-relaxed text-slate-11 sm:hidden sm:text-base md:w-[600px] md:text-lg lg:text-xl xl:text-lg">
          Build products in minutes, not days. Experience{" "}
          <span className="font-medium text-slate-12 opacity-90"> fully automated,</span> iterative,
          and <span className="font-medium text-white">rapid software development,</span> powered by
          collaborative AI agents.{" "}
          <span className="font-medium text-white"> All with you in the loop.</span>
        </p>
      </div>

      <section className="flex-col items-center py-12 2xl:my-10">
        <EmailNotify />
      </section>

      <section className="flex flex-col items-center md:my-32">
        <h3 className="tracking-tight px-4 text-center text-lg md:px-0 md:text-xl">
          How do you see yourself using agents to build?
        </h3>
        <div className="mt-4 flex items-center justify-center gap-4 md:px-[10%]">
          {/* <UseCaseChip initialValue={0} useCaseText="Lorem ipsum dolor sit amet" /> */}
          <UseCaseList />
          {/* Use multiple <UseCaseChip /> components for other chips */}
        </div>
      </section>
      <div className="my-52 flex flex-col items-center gap-4">
        <span className="flex flex-row items-center justify-center gap-3 text-lg font-light text-gray-500">
          {"Never send a human to do a machine's job..."}
          <MatrixIcon />
        </span>

        {/* <p className="body">Get your <span className="font-semibold">free account today</span></p> */}
        {/* <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <button className="block bg-blue-500 text-white px-4 py-2 rounded-md">Sign Up</button>
        </div> */}
        {/* <p className="caption text-slate-11">No credit card required</p> */}
      </div>
    </>
  );
}
