import FormLogin from "../components/Fragments/FormLogin"
import AuthLogin from "../components/Layout/AuthLayout"

export default function LoginPage() {
  return (
    <AuthLogin type="login">
      <FormLogin />
    </AuthLogin>
  )
}
