import QuestionnaireForm from "@/components/QuestionnaireForm";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-gmailblue">
          Retain demo builder
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
          Set up this prospect&apos;s walkthrough
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ll personalize the Payment Recovery, In-App, and Cancellation Flow
          demos with these details and grab a live screenshot of their landing page.
        </p>
      </div>
      <QuestionnaireForm />
    </main>
  );
}
