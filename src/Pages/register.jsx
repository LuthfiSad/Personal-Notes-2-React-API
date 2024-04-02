import AuthRegister from "../components/Layout/AuthLayout"
import FormRegister from "../components/Fragments/FormRegister"

export default function RegisterPage() {
  return (
    <AuthRegister type="register">
      <FormRegister />
    </AuthRegister>
  )
}
