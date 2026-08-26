"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Consultation() {

  const [payment, setPayment] = useState("");
  const [tradeIn, setTradeIn] = useState("");
  const [submitting, setSubmitting] = useState(false);


  const [formData, setFormData] = useState({

    first_name: "",
    last_name: "",
    phone: "",
    email: "",

    make_model: "",
    year: "",
    trim: "",
    stock_number: "",
    factory_order: "",

    trade_year: "",
    trade_model: "",

    budget_min: "",
    budget_max: "",

    notes: "",

  });



  function formatPhone(value) {

    const numbers = value.replace(/\D/g, "");

    if (!numbers) return "";

    if (numbers.length <= 3) {
      return `(${numbers}`;
    }

    if (numbers.length <= 6) {
      return `(${numbers.slice(0,3)}) ${numbers.slice(3)}`;
    }

    return `(${numbers.slice(0,3)}) ${numbers.slice(3,6)}-${numbers.slice(6,10)}`;

  }



  function formatCurrency(value) {

    const numbers = value.replace(/\D/g, "");

    if (!numbers) return "";

    return "$" + Number(numbers).toLocaleString();

  }




  async function handleSubmit(e) {

    e.preventDefault();


    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.phone
    ) {

      alert(
        "Please fill in First Name, Last Name, and Phone Number."
      );

      return;

    }



    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {

      alert(
        "Please enter a valid email address."
      );

      return;

    }



    setSubmitting(true);



    const { error } = await supabase
      .from("Leads")
      .insert([

        {

          ...formData,

          payment_method: payment,

          trade_in: tradeIn,


          budget_min:
            formData.budget_min
            ? Number(formData.budget_min.replace(/\D/g,""))
            : null,


          budget_max:
            formData.budget_max
            ? Number(formData.budget_max.replace(/\D/g,""))
            : null,


        }

      ]);



    if (error) {

      console.log(
        "SUPABASE ERROR:",
        error.message
      );

      alert(error.message);


    } else {

      alert(
        "Your consultation request has been submitted!"
      );


      setFormData({

        first_name: "",
        last_name: "",
        phone: "",
        email: "",

        make_model: "",
        year: "",
        trim: "",
        stock_number: "",
        factory_order: "",

        trade_year: "",
        trade_model: "",

        budget_min: "",
        budget_max: "",

        notes: "",

      });


      setPayment("");
      setTradeIn("");

    }


    setSubmitting(false);

  }



  return (

        <section
      id="consultation"
      className="bg-zinc-950 text-white py-24 px-6"
    >

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">


        {/* LEFT SIDE */}

        <div className="space-y-8">


          <div>

            <p className="text-yellow-500 uppercase tracking-[0.3em] text-sm mb-4">

              Personalized Luxury Experience

            </p>


            <h2 className="text-4xl md:text-5xl font-semibold mb-6">

              Let’s Find Your Perfect Vehicle

            </h2>


            <p className="text-gray-400 text-lg leading-relaxed">

              From finding your next vehicle to evaluating your current one,
              Dunia offers personalized guidance for purchases, trade-ins,
              appraisals, lease buyouts, and more.

            </p>

          </div>




          <div className="relative overflow-hidden rounded-3xl">


            <img

              src="https://images.unsplash.com/photo-1736746419802-b608fa1ea070?q=80&w=2232&auto=format&fit=crop"

              alt="Luxury vehicle"

              className="w-full h-[420px] object-cover"

            />


            <div className="absolute inset-0 bg-black/20" />

          </div>


        </div>






        {/* RIGHT SIDE FORM */}


        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl">


          <h3 className="text-2xl font-semibold mb-8">

            Schedule Your Consultation

          </h3>



          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >



            <h4 className="text-yellow-500">

              Buyer Information

            </h4>




            <div className="grid md:grid-cols-2 gap-4">


              <input

                required

                placeholder="First Name"

                className="input-style"

                value={formData.first_name}

                onChange={(e)=>

                  setFormData({

                    ...formData,

                    first_name:e.target.value

                  })

                }

              />





              <input

                required

                placeholder="Last Name"

                className="input-style"

                value={formData.last_name}

                onChange={(e)=>

                  setFormData({

                    ...formData,

                    last_name:e.target.value

                  })

                }

              />


            </div>





            <input

              required

              placeholder="Phone Number"

              className="input-style"

              value={formData.phone}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  phone:formatPhone(e.target.value)

                })

              }

            />






            <input

              type="email"

              placeholder="Email Address (Optional)"

              className="input-style"

              value={formData.email}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  email:e.target.value

                })

              }

            />







            <h4 className="text-yellow-500 pt-4">

              Vehicle Interest

            </h4>



            <p className="text-sm text-gray-400 mb-4">

              Browse the Land Rover Novi inventory, then tell Dunia which vehicle you are interested in.

            </p>





            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


              <a

                href="https://www.landrovernovi.com/new-inventory/index.htm"

                target="_blank"

                rel="noopener noreferrer"

                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl py-4 text-center transition"

              >

                Browse New Inventory

              </a>




              <a

                href="https://www.landrovernovi.com/used-inventory/index.htm"

                target="_blank"

                rel="noopener noreferrer"

                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl py-4 text-center transition"

              >

                Browse Pre-Owned

              </a>


            </div>






            <div
              id="vehicleInterest"
              className="space-y-4 pt-4"
            >



              <p className="text-sm text-gray-400">

                Found a vehicle you love?

              </p>





              <input

                placeholder="Vehicle Make & Model"

                className="input-style"

                value={formData.make_model || ""}

                onChange={(e)=>

                  setFormData({

                    ...formData,

                    make_model:e.target.value

                  })

                }

              />





              <input

                placeholder="Vehicle Year"

                className="input-style"

                value={formData.year || ""}

                onChange={(e)=>

                  setFormData({

                    ...formData,

                    year:e.target.value

                  })

                }

              />





              <input

                placeholder="Trim (Optional)"

                className="input-style"

                value={formData.trim || ""}

                onChange={(e)=>

                  setFormData({

                    ...formData,

                    trim:e.target.value

                  })

                }

              />





              <input

                placeholder="Stock Number (Optional)"

                className="input-style"

                value={formData.stock_number || ""}

                onChange={(e)=>

                  setFormData({

                    ...formData,

                    stock_number:e.target.value

                  })

                }

              />



            </div>

                        


            <p className="text-sm text-gray-400 mt-4">

              Interested in placing a factory order?

            </p>




            <div className="flex gap-3 flex-wrap">


              {["Yes","No"].map((item)=>(


                <button

                  key={item}

                  type="button"

                  onClick={()=>

                    setFormData({

                      ...formData,

                      factory_order:item

                    })

                  }


                  className={`px-5 py-3 rounded-xl border transition ${
                    
                    formData.factory_order === item

                    ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"

                    : "border-zinc-700 hover:border-yellow-500"

                  }`}

                >

                  {item}

                </button>


              ))}


            </div>








            <h4 className="text-yellow-500 pt-4">

              Purchase Details

            </h4>

  <h4 className="text-yellow-500 pt-4">

              Budget

            </h4>



            <p className="text-sm text-gray-400">

              Preferred Payment Method

            </p>





            <div className="flex gap-3 flex-wrap">


              {["Cash","Financing","Lease"].map((item)=>(


                <button

                  key={item}

                  type="button"

                  onClick={()=>setPayment(item)}

                  className={`px-5 py-3 rounded-xl border transition cursor-pointer ${
                    
                    payment === item

                    ? "border-yellow-500 text-yellow-500 bg-yellow-500/10"

                    : "border-zinc-700 text-gray-300 hover:border-yellow-500"

                  }`}

                >

                  {item}

                </button>


              ))}


            </div>







            <p className="text-sm text-gray-400 mt-4">

              Trade-In Vehicle

            </p>






            <div className="flex gap-3 flex-wrap">


              {["Yes","No"].map((item)=>(


                <button

                  key={item}

                  type="button"

                  onClick={()=>setTradeIn(item)}

                  className={`px-5 py-3 rounded-xl border transition cursor-pointer ${
                    
                    tradeIn === item

                    ? "border-yellow-500 text-yellow-500 bg-yellow-500/10"

                    : "border-zinc-700 text-gray-300 hover:border-yellow-500"

                  }`}

                >

                  {item}

                </button>


              ))}


            </div>







            {tradeIn === "Yes" && (

              <>


                <input

                  placeholder="Trade-In Year"

                  className="input-style"

                  value={formData.trade_year || ""}

                  onChange={(e)=>

                    setFormData({

                      ...formData,

                      trade_year:e.target.value

                    })

                  }

                />





                <input

                  placeholder="Trade-In Make & Model"

                  className="input-style"

                  value={formData.trade_model || ""}

                  onChange={(e)=>

                    setFormData({

                      ...formData,

                      trade_model:e.target.value

                    })

                  }

                />


              </>

            )}









            <div className="grid grid-cols-2 gap-4">



              <input

                type="text"

                placeholder="Minimum Budget"

                className="input-style"

                value={formData.budget_min || ""}

                onChange={(e)=>

                  setFormData({

                    ...formData,

                    budget_min:formatCurrency(e.target.value)

                  })

                }

              />






              <input

                type="text"

                placeholder="Maximum Budget"

                className="input-style"

                value={formData.budget_max || ""}

                onChange={(e)=>

                  setFormData({

                    ...formData,

                    budget_max:formatCurrency(e.target.value)

                  })

                }

              />



            </div>








            <h4 className="text-yellow-500 pt-4">

              Additional Notes

            </h4>





            <textarea

              rows="5"

              placeholder="Questions, special requests, or appointment scheduling details"

              className="input-style"

              value={formData.notes || ""}

              onChange={(e)=>

                setFormData({

                  ...formData,

                  notes:e.target.value

                })

              }

            />









            <label className="flex gap-3 text-sm text-gray-400">


              <input

                type="checkbox"

                required

              />


              <span>

                I agree to be contacted regarding my inquiry.

              </span>


            </label>









            <button

              type="submit"

              disabled={submitting}

              className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-black font-semibold py-4 rounded-xl transition"

            >

              {submitting

                ? "Submitting..."

                : "Schedule My Consultation"}


            </button>





          </form>


        </div>


      </div>


    </section>

  );

}