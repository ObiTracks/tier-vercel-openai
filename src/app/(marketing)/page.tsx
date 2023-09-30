import Link from "next/link";
import { clsx } from "clsx";
import { BgPattern } from "@/components/ui/Bgpattern";
import { EmailNotify, UseCaseChip, UseCaseList } from "./components"; // import the client component
import { ProjectXIcon } from "@/res/icons/ProjectXIcon";
import { ProjectXIconOutline } from "@/res/icons/ProjectXIconOutline";
import { MatrixIcon } from "@/res/icons/MatrixIcon";
import { ProjectXLogo } from "@/res/logos/ProjectXLogo";



export default function IndexPage() {
  return (
    <>
      {/* <div className="hidden md:block"> */}
      <BgPattern />
      {/* </div> */}
      {/* <header className="py-4 bg-gray-900 text-white text-center leading-snug">

      </header> */}
      <div className="sm:px-4 md:px-8 mt-10 md:mt-20 xl:mt-24 flex flex-col items-center gap-6 md:gap-12 px-5 sm:px-0">
        <div className="px-3 py-1 flex flex-row w-fit gap-2 items-center justify-center border border-gray-600 rounded-full">
        <ProjectXIconOutline
              className={clsx(
                "h-5 w-5 p-0 m-0",
              )}
            />
          {/* <span className="hidden md:block flex justify-center">
            
          </span> */}
          <p className="hidden sm:block  text-2xs sm:text-sm tracking-[2px] uppercase flex gap-2 font-semibold text-center px-4 md:px-0 text-slate-12">
            Build products in minutes, not days.
          </p>
          {/* <p className=" hidden md:block text-lg md:text-xl lg:text-xl font-bold md:font-semibold text-center px-4 md:px-0 text-slate-12">
            Build products in minutes, not days.
          </p> */}
        </div>



        <span className="sm:hidden flex justify-center">
          <ProjectXIcon
            className={clsx(
              "h-6 w-6 mb-4",
            )}
          />
        </span>

        <h2 className="text-[2.8rem] md:text-7xl lg:text-8xl xl:h2 font-bold tracking-tighter text-center md:w-[902px] w-full md:px-0 leading-[3rem] md:leading-tight">
          Turn <span className="text-blue">conversation into <span className="text-purple">codebase.</span></span>
          {/* <span className="sm:hidden ">with <span className="lg:hidden purple-gradient-text">AI Agents</span></span> */}
        </h2>

        <p className="hidden sm:block  w-full mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-lg font-light text-center text-slate-11 md:w-[600px] md:px-0 leading-snug">
          Experience <span className="text-slate-12 opacity-100 font-medium">fully automated,</span> iterative, and <span className="text-slate-12 font-medium"> rapid software development,</span> powered by collaborative AI agents. <span className="text-white font-medium">All with you in the loop.</span>
        </p>

        <p className="sm:hidden w-full mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-lg font-light text-center text-slate-11 md:w-[600px] px-6 leading-relaxed">
          Build products in minutes, not days. Experience <span className="text-slate-12 opacity-90 font-medium"> fully automated,</span> iterative, and <span className="text-white font-medium">rapid software development,</span> powered by collaborative AI agents. <span className="text-white font-medium"> All with you in the loop.</span>
        </p>

      </div>

      <section className="flex-col items-center py-12 2xl:my-10">
        <EmailNotify />
      </section>

      <section className="flex flex-col items-center md:my-32">
        <h3 className="text-center px-4 md:px-0 text-lg md:text-xl tracking-tight">How do you see yourself using agents to build?</h3>
        <div className="md:px-[10%] mt-4 flex gap-4 justify-center items-center">
          {/* <UseCaseChip initialValue={0} useCaseText="Lorem ipsum dolor sit amet" /> */}
          <UseCaseList />
          {/* Use multiple <UseCaseChip /> components for other chips */}
        </div>
      </section>
      <div className="my-52 flex flex-col items-center gap-4">

        <span className="flex flex-row gap-3 items-center justify-center text-lg font-light text-gray-500">Never send a human to do a machine's job... <MatrixIcon />
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
