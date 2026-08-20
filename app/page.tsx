import QuestionnaireForm from "@/components/QuestionnaireForm";
import { PaddleLogoLight } from "@/components/PaddleLogo";

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — dark brand panel */}
      <div className="hidden lg:flex lg:w-[45%] flex-col bg-paddle-warm600 px-12 py-10">
        <PaddleLogoLight className="w-28" />

        <div className="mt-auto pb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paddle-warm200 mb-6">
            Retain · Demo builder
          </p>
          <h1 className="font-serrif text-[4.5rem] leading-[0.95] text-paddle-warm50">
            Stop churn<br />before it<br />starts.
          </h1>
          <p className="mt-8 text-sm leading-relaxed text-paddle-warm200 max-w-xs font-lausanne font-light">
            Build a personalised Retain walkthrough for your prospect in under a minute.
            Payment recovery, in-app notifications, and cancellation flows - all live.
          </p>
        </div>

        <div className="border-t border-paddle-warm200/30 pt-6">
          <p className="font-mono text-[10px] text-paddle-warm200/60 uppercase tracking-widest">
            Powered by Paddle Retain
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col bg-paddle-warm50">
        {/* Mobile logo */}
        <div className="flex items-center gap-3 px-8 pt-8 pb-0 lg:hidden">
          <div className="h-7 w-7 rounded-full bg-paddle-yellow flex items-center justify-center">
            <span className="font-serrif text-sm text-paddle-warm600">p</span>
          </div>
          <span className="font-lausanne font-light text-sm text-paddle-warm600">Retain Demo Builder</span>
        </div>

        <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-16 xl:px-20">
          <div className="max-w-md w-full mx-auto lg:mx-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paddle-warm600/50 mb-4">
              Step 1 of 2
            </p>
            <h2 className="font-serrif text-[2rem] leading-tight text-paddle-warm600 mb-2">
              Your prospect's details
            </h2>
            <p className="text-sm text-paddle-warm600/60 font-lausanne mb-8 leading-relaxed">
              We'll personalise the demo with these details and capture a live screenshot of their site.
            </p>
            <QuestionnaireForm />
          </div>
        </div>
      </div>
    </div>
  );
}
