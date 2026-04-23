import SignInForm from "@/app/components/auth/signInForm"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Media Manager</h1>
          <p className="text-zinc-500 mt-2">Sign in to your account</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-8 shadow-xl border border-zinc-800">
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
