import { useContext, useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import FloatingInput from "../components/inputs/FloatingInput";
import MainNav from "../components/navbar/MainNav";
import { CartContext } from "../contexts/CartContext";
import FormButton from "../components/buttons/FormButton";
import { initFlowbite } from "flowbite";
import axios from "axios";
import AuthModal from "../components/modal/AuthModal";

export default function() {
  const cart = useContext(CartContext)
  const [formProp, setFormProp] = useState({firstName: '', lastName: '', email: '', street: '', city: '', state: '', zip: ''})
  const [msg, setMsg] = useState("")

  function handleFormChange(e) {
    const {id, value} = e.target
    setFormProp(prev => {
      return {
        ...prev,
        [id]: value
      }
    })
  }

  setTimeout(() => {
    initFlowbite()
  }, 500)

  async function submitForm(e) {
    e.preventDefault()
    axios.post("http://localhost:5001/clientOrder", {
      user: `${formProp.firstName} ${formProp.lastName}`,
      email: formProp.email
    })
    .then(res => setMsg(res.data.message))
    .catch(err => console.log(err))
  }


    return (
        <div className="min-h-screen">
            <MainNav />
            <div className="my-5 flex flex-col sm:flex-row px-5 justify-between items-start container mx-auto">
              <div className="pb-12 w-full sm:w-3/5">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Choose an adress where you can receive product.</p>

                <form onSubmit={submitForm} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                    <div className="grid grid-cols-2 gap-x-5">
                      <FloatingInput type="text" label="First name" id="firstName" value={formProp.firstName} handleChange={handleFormChange}/>

                      <FloatingInput type="text" label="Last name" id="lastName" value={formProp.lastName} handleChange={handleFormChange}/>
                    </div>

                    <FloatingInput type="email" label="Email adress" id="email" value={formProp.email} handleChange={handleFormChange}/>

                    <FloatingInput type="text" label="Street adress" id="street" value={formProp.street} handleChange={handleFormChange}/>

                    <div className="grid grid-cols-3 gap-x-3">
                      <FloatingInput type="text" label="City" id="city" value={formProp.city} handleChange={handleFormChange}/>

                      <FloatingInput type="text" label="State/Province" id="state" value={formProp.state} handleChange={handleFormChange}/>

                      <FloatingInput type="text" label="Zip code" id="zip" value={formProp.zip} handleChange={handleFormChange}/>
                    </div>
                    <div className="flex justify-center mt-8">
                      <FormButton button="Confirm" />
                    </div>
                </form>
              </div>
              <ul role="list" className="divide-y divide-gray-100 w-full sm:w-1/3">
                {cart.state.map(item => {
                  return (
                    <li className="flex justify-between py-5">
                      <div className="flex min-w-0">
                        <div className="w-20 h-12">
                          <img className="object-contain oject-center" src={item.img} alt="" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.color}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end ">
                        <p className="text-sm leading-6 text-gray-900">{item.price} $</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">qty {item.quantity}</p>
                      </div>
                    </li>
                  )
                })}
            </ul>
        </div>
            <Footer />
            {msg && <AuthModal msg={msg} closeModal={() => setMsg("")} />}
        </div>
    )
}