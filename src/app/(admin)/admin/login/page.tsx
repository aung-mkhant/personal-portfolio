import AuthForm from "@/components/AuthForm"

export default async function AdminLoginRoute() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="mt-12 mb-6 font-young-serif text-3xl">
        You Shall Not Pass!
      </h2>
      <AuthForm className=""></AuthForm>
    </div>
  )
}
