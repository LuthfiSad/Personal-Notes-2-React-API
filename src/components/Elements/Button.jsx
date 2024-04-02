import { useInfo } from "../../context"
import PropTypes from "prop-types";

export default function Button({ type="button", children, className="text-white bg-blue-600", width="px-2 py-1", onclick=() => {}, isLoading=false }) {
  const { locale } = useInfo();
  if (isLoading) {
    return <button type={type} disabled className={`border cursor-not-allowed text-sm select-none rounded bg-slate-400 ${width}`}>{locale === 'in' ? "Memuat" : "Loading"}...</button>
  }
  return <button type={type} onClick={onclick} className={`border text-sm select-none rounded ${width} ${className}`}>{children}</button>
}

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  onclick: PropTypes.func,
  isLoading: PropTypes.bool
};
