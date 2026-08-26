"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddLeadDrawer({ closeDrawer, refreshLeads }) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [payment, setPayment] = useState("");
  const [tradeIn, setTradeIn] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",

    make_model: "",
    year: "",
    trim: "",
    stock_number: "",
    vin: "",

    factory_order: "",

    trade_year: "",
    trade_model: "",
    trade_miles: "",
    trade_vin: "",

    budget_min: "",
    budget_max: "",

    notes: "",

    lead_source: "Walk-In",
  });

  function formatPhone(value) {
    const numbers = value.replace(/\D/g, "");

    if (!numbers) return "";

    if (numbers.length <= 3) {
      return `(${numbers}`;
    }

    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    }

    return `(${numbers.slice(0, 3)}) ${numbers.slice(
      3,
      6
    )}-${numbers.slice(6, 10)}`;
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
      setMessage(
        "Please enter First Name, Last Name, and Phone Number."
      );
      return;
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setSaving(true);
    setMessage("");

    const mileage =
      formData.trade_miles &&
      formData.trade_miles
        .toString()
        .replace(/,/g, "")
        .trim() !== ""
        ? Number(
            formData.trade_miles
              .toString()
              .replace(/,/g, "")
              .trim()
          )
        : null;

    const budgetMin = formData.budget_min
      ? Number(formData.budget_min.replace(/\D/g, ""))
      : null;

    const budgetMax = formData.budget_max
      ? Number(formData.budget_max.replace(/\D/g, ""))
      : null;

    const leadData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      email: formData.email || null,

      make_model: formData.make_model || null,
      year: formData.year || null,
      trim: formData.trim || null,
      stock_number: formData.stock_number || null,
      vin: formData.vin || null,

      factory_order: formData.factory_order || null,

      payment_method: payment || null,

      trade_in: tradeIn || null,
      trade_year: formData.trade_year || null,
      trade_model: formData.trade_model || null,
      trade_miles: mileage,
      trade_vin: formData.trade_vin || null,

      budget_min: budgetMin,
      budget_max: budgetMax,

      notes: formData.notes || null,

      lead_source: formData.lead_source || "Walk-In",

      status: "New Lead",
    };

    console.log("MANUAL LEAD:", leadData);

    const { error } = await supabase
      .from("Leads")
      .insert([leadData]);

    if (error) {
      console.error("SUPABASE ERROR:", error);
      setMessage(error.message);
      setSaving(false);
      return;
    }

    await refreshLeads();

    closeDrawer();
    setSaving(false);
  }

  function updateField(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <div className="fixed inset-0 z-[60]">

      {/* BACKDROP */}

      <div
        className="absolute inset-0 bg-black/70"
        onClick={closeDrawer}
      />

      {/* DRAWER */}

      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-zinc-950 border-l border-zinc-800 overflow-y-auto">

        <div className="p-8">

          {/* HEADER */}

          <div className="flex items-center justify-between mb-8">

            <div>
              <p className="text-yellow-500 text-sm uppercase tracking-widest">
                Dashboard
              </p>

              <h2 className="text-3xl font-bold text-white mt-1">
                Add New Lead
              </h2>

              <p className="text-gray-400 text-sm mt-2">
                Add a customer who contacted Dunia directly.
              </p>
            </div>

            <button
              type="button"
              onClick={closeDrawer}
              className="text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* CUSTOMER */}

            <div className="bg-zinc-900 rounded-2xl p-5">

              <h3 className="text-yellow-500 font-semibold mb-4">
                Customer Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  required
                  placeholder="First Name"
                  className="input-style"
                  value={formData.first_name}
                  onChange={(e) =>
                    updateField(
                      "first_name",
                      e.target.value
                    )
                  }
                />

                <input
                  required
                  placeholder="Last Name"
                  className="input-style"
                  value={formData.last_name}
                  onChange={(e) =>
                    updateField(
                      "last_name",
                      e.target.value
                    )
                  }
                />

              </div>

              <input
                required
                placeholder="Phone Number"
                className="input-style mt-4"
                value={formData.phone}
                onChange={(e) =>
                  updateField(
                    "phone",
                    formatPhone(e.target.value)
                  )
                }
              />

              <input
                type="email"
                placeholder="Email Address"
                className="input-style mt-4"
                value={formData.email}
                onChange={(e) =>
                  updateField(
                    "email",
                    e.target.value
                  )
                }
              />

            </div>


            {/* LEAD SOURCE */}

            <div className="bg-zinc-900 rounded-2xl p-5">

              <h3 className="text-yellow-500 font-semibold mb-4">
                Lead Source
              </h3>

              <select
                value={formData.lead_source}
                onChange={(e) =>
                  updateField(
                    "lead_source",
                    e.target.value
                  )
                }
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white"
              >
                <option>Walk-In</option>
                <option>Phone Call</option>
                <option>Referral</option>
                <option>Social Media</option>
                <option>Other</option>
              </select>

            </div>


            {/* VEHICLE */}

            <div className="bg-zinc-900 rounded-2xl p-5">

              <h3 className="text-yellow-500 font-semibold mb-4">
                Vehicle Interest
              </h3>

              <div className="space-y-4">

                <input
                  placeholder="Vehicle Make & Model"
                  className="input-style"
                  value={formData.make_model}
                  onChange={(e) =>
                    updateField(
                      "make_model",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Vehicle Year"
                  className="input-style"
                  value={formData.year}
                  onChange={(e) =>
                    updateField(
                      "year",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Trim"
                  className="input-style"
                  value={formData.trim}
                  onChange={(e) =>
                    updateField(
                      "trim",
                      e.target.value
                    )
                  }
                />

                <input
                  placeholder="Stock Number"
                  className="input-style"
                  value={formData.stock_number}
                  onChange={(e) =>
                    updateField(
                      "stock_number",
                      e.target.value
                    )
                  }
                />

                <input
                  maxLength={17}
                  placeholder="Vehicle VIN"
                  className="input-style"
                  value={formData.vin}
                  onChange={(e) =>
                    updateField(
                      "vin",
                      e.target.value
                        .toUpperCase()
                        .replace(
                          /[^A-Z0-9]/g,
                          ""
                        )
                    )
                  }
                />

              </div>

            </div>


            {/* FACTORY ORDER */}

            <div className="bg-zinc-900 rounded-2xl p-5">

              <h3 className="text-yellow-500 font-semibold mb-4">
                Factory Order
              </h3>

              <div className="flex gap-3">

                {["Yes", "No"].map((item) => (

                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      updateField(
                        "factory_order",
                        item
                      )
                    }
                    className={`px-5 py-3 rounded-xl border ${
                      formData.factory_order === item
                        ? "border-yellow-500 text-yellow-500 bg-yellow-500/10"
                        : "border-zinc-700 text-gray-300"
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>


            {/* PURCHASE */}

            <div className="bg-zinc-900 rounded-2xl p-5">

              <h3 className="text-yellow-500 font-semibold mb-4">
                Purchase Details
              </h3>

              <p className="text-sm text-gray-400 mb-3">
                Payment Method
              </p>

              <div className="flex gap-3 flex-wrap">

                {[
                  "Cash",
                  "Financing",
                  "Lease",
                ].map((item) => (

                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setPayment(item)
                    }
                    className={`px-5 py-3 rounded-xl border ${
                      payment === item
                        ? "border-yellow-500 text-yellow-500 bg-yellow-500/10"
                        : "border-zinc-700 text-gray-300"
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>


            {/* TRADE IN */}

            <div className="bg-zinc-900 rounded-2xl p-5">

              <h3 className="text-yellow-500 font-semibold mb-4">
                Trade-In
              </h3>

              <div className="flex gap-3 mb-4">

                {["Yes", "No"].map((item) => (

                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setTradeIn(item)
                    }
                    className={`px-5 py-3 rounded-xl border ${
                      tradeIn === item
                        ? "border-yellow-500 text-yellow-500 bg-yellow-500/10"
                        : "border-zinc-700 text-gray-300"
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

              {tradeIn === "Yes" && (

                <div className="space-y-4">

                  <input
                    placeholder="Trade-In Year"
                    className="input-style"
                    value={formData.trade_year}
                    onChange={(e) =>
                      updateField(
                        "trade_year",
                        e.target.value
                      )
                    }
                  />

                  <input
                    placeholder="Trade-In Make & Model"
                    className="input-style"
                    value={formData.trade_model}
                    onChange={(e) =>
                      updateField(
                        "trade_model",
                        e.target.value
                      )
                    }
                  />

                  <input
                    inputMode="numeric"
                    placeholder="Trade-In Mileage"
                    className="input-style"
                    value={formData.trade_miles}
                    onChange={(e) => {

                      const numbers =
                        e.target.value.replace(
                          /\D/g,
                          ""
                        );

                      updateField(
                        "trade_miles",
                        numbers
                          ? Number(
                              numbers
                            ).toLocaleString()
                          : ""
                      );
                    }}
                  />

                  <input
                    maxLength={17}
                    placeholder="Trade-In VIN"
                    className="input-style"
                    value={formData.trade_vin}
                    onChange={(e) =>
                      updateField(
                        "trade_vin",
                        e.target.value
                          .toUpperCase()
                          .replace(
                            /[^A-Z0-9]/g,
                            ""
                          )
                      )
                    }
                  />

                </div>

              )}

            </div>


            {/* BUDGET */}

            <div className="bg-zinc-900 rounded-2xl p-5">

              <h3 className="text-yellow-500 font-semibold mb-4">
                Budget
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  placeholder="Minimum Budget"
                  className="input-style"
                  value={formData.budget_min}
                  onChange={(e) =>
                    updateField(
                      "budget_min",
                      formatCurrency(
                        e.target.value
                      )
                    )
                  }
                />

                <input
                  placeholder="Maximum Budget"
                  className="input-style"
                  value={formData.budget_max}
                  onChange={(e) =>
                    updateField(
                      "budget_max",
                      formatCurrency(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

            </div>


            {/* NOTES */}

            <div className="bg-zinc-900 rounded-2xl p-5">

              <h3 className="text-yellow-500 font-semibold mb-4">
                Additional Notes
              </h3>

              <textarea
                rows="5"
                placeholder="Add any important customer details..."
                className="input-style"
                value={formData.notes}
                onChange={(e) =>
                  updateField(
                    "notes",
                    e.target.value
                  )
                }
              />

            </div>


            {/* ERROR */}

            {message && (
              <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-xl p-4">
                {message}
              </div>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-black font-semibold py-4 rounded-xl transition"
            >
              {saving
                ? "Adding Lead..."
                : "Add Lead"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}