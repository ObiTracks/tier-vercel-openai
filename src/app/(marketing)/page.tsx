import Link from "next/link";
import { BgPattern } from "@/components/ui/Bgpattern";
import { EmailNotify, UseCaseChip, UseCaseList } from "./components"; // import the client component



export default function IndexPage() {
  return (
    <>
      <BgPattern />
      {/* <header className="py-4 bg-gray-900 text-white text-center leading-snug">

      </header> */}
      <div className="mt-32 flex flex-col items-center gap-6">
        {/* <h2 className="md:sans h2 w-full px-4 text-center md:w-[802px] md:px-0 leading-snug">
          Turn <span className="text-crimson-9">conversation into codebase </span> with AI agents
        </h2> */}
        {/* <p className="body-xl font-bold">Build products in minutes, not days.</p>

        <h2 className="text-4xl md:text-5xl lg:text-7xl xl:h2 font-bold tracking-tighter w-full px-4 text-center md:w-[802px] md:px-0 leading-tight sm:leading-3">
          Turn <span className="text-crimson-9">conversation into codebase </span> with AI agents
        </h2>

        <p className="text-lg px-4 font-regular text-center text-slate-11 md:w-[572px] md:px-0 leading-snug">
          <span className="text-white font-bold">Fully automated,</span> procedural, and <span className="text-white font-bold">rapid software development,</span> powered by collaborative AI agents. All <span className="text-white font-bold">with you in the loop.</span>
        </p> */}

        <p className="body-xl sm:text-xl md:text-xl lg:text-xl xl:body-xl font-bold text-center w-full px-4 md:px-0 md:w-[750px]">
          Build products in minutes, not days.
        </p>

        <h2 className="text-4xl md:text-5xl lg:text-7xl xl:h2 font-bold tracking-tighter w-full px-4 text-center md:w-[802px] md:px-0 leading-tight sm:leading-3">
          Turn <span className="text-blue">conversation into codebase </span> with <span className="text-blue">AI agents</span>
        </h2>

        <p className=" w-full mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-lg font-light text-center text-slate-11 md:w-[600px] md:px-0 leading-snug">
          <span className="text-white opacity-100 font-semibold">Fully automated,</span> iterative, and <span className="text-white font-bold">rapid software development,</span> powered by collaborative AI agents. <span className="text-white font-bold"> All with you in the loop.</span>
        </p>


        <EmailNotify />
      </div>
      <section className="flex-col items-center mt-8">
        <h3 className="text-center text-xl">How do you see yourself using agents to build?</h3>
        <p className="text-center">Choose your top 3</p>
        <div className="mt-4 flex gap-4 justify-center items-center">
          {/* <UseCaseChip initialValue={0} useCaseText="Lorem ipsum dolor sit amet" /> */}
          <UseCaseList />
          {/* Use multiple <UseCaseChip /> components for other chips */}
        </div>
      </section>
      <div className="mb-40 mt-20 flex flex-col items-center gap-4">
        <p className="body">Get your <span className="font-semibold">free account today</span></p>
        {/* <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <button className="block bg-blue-500 text-white px-4 py-2 rounded-md">Sign Up</button>
        </div> */}
        <p className="caption text-slate-11">No credit card required</p>
      </div>
    </>
  );
}
