"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LeadDrawer({
  lead,
  closeDrawer,
  updateStatus,
  refreshLeads
}) {


  const [notes, setNotes] = useState(lead?.notes || "");


  const [appointmentType, setAppointmentType] = useState(
    lead?.appointment_type || "No Appointment"
  );


  const [appointmentDate, setAppointmentDate] = useState(
    lead?.appointment_date || ""
  );


  const [appointmentTime, setAppointmentTime] = useState(
    lead?.appointment_time?.slice(0, 5) || ""
  );


  const [savingNotes, setSavingNotes] = useState(false);
  const [savingAppointment, setSavingAppointment] = useState(false);

  const [message, setMessage] = useState("");



  if (!lead) return null;





  async function saveNotes() {

    setSavingNotes(true);
    setMessage("");

    const { error } = await supabase
      .from("Leads")
      .update({
        notes: notes,
      })
      .eq("id", lead.id);



    if (error) {

      console.log(error);
      setMessage(error.message);

    } else {

      setMessage("Notes saved!");
      refreshLeads();

    }


    setSavingNotes(false);

  }







  async function saveAppointment() {

    setSavingAppointment(true);
    setMessage("");


    const { error } = await supabase
      .from("Leads")
      .update({

        appointment_type: appointmentType,

        appointment_date: appointmentDate,

        appointment_time: appointmentTime
          ? `${appointmentTime}:00`
          : null,

      })
      .eq("id", lead.id);



    if (error) {

      console.log(error);
      setMessage(error.message);

    } else {

      setMessage("Appointment saved!");
      refreshLeads();

    }


    setSavingAppointment(false);

  }








  return (

    <div className="fixed inset-0 z-50">


      <div
        className="absolute inset-0 bg-black/60"
        onClick={closeDrawer}
      />




      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 p-8 overflow-y-auto">



        <button
          onClick={closeDrawer}
          className="text-gray-400 hover:text-white mb-8"
        >
          ✕ Close
        </button>




        <h2 className="text-3xl font-bold mb-8">
          {lead.first_name} {lead.last_name}
        </h2>






        <div className="space-y-6">





          {/* Contact */}

          <div className="bg-zinc-900 rounded-xl p-4">

            <h3 className="text-yellow-500 mb-3">
              Contact
            </h3>


            <p>
              📧 {lead.email || "No email"}
            </p>


            <p>
              📞 {lead.phone || "No phone"}
            </p>


          </div>









          {/* Vehicle Interest */}

          <div className="bg-zinc-900 rounded-xl p-4">


            <h3 className="text-yellow-500 mb-3">
              Vehicle Interest
            </h3>



            <p>
              🚗 {lead.make_model || "Not provided"}
            </p>


            <p>
              Year:
              <span className="text-gray-400 ml-2">
                {lead.year || "Not provided"}
              </span>
            </p>



            <p>
              Trim / Features:
              <span className="text-gray-400 ml-2">
                {lead.trim || "Not provided"}
              </span>
            </p>



            <p>
              VIN:
              <span className="text-gray-400 ml-2">
                {lead.vin || "Not provided"}
              </span>
            </p>


          </div>









         {/* Purchase Details */}

<div className="bg-zinc-900 rounded-xl p-4">

  <h3 className="text-yellow-500 mb-3">
    Purchase Details
  </h3>


  <p>
    Preferred Payment:
    <span className="text-gray-400 ml-2">
      {lead.payment_method || "Not provided"}
    </span>
  </p>


  <p>
    Budget:
    <span className="text-gray-400 ml-2">
      {lead.budget_min || lead.budget_max
  ? `$${Number(lead.budget_min).toLocaleString()} - $${Number(lead.budget_max).toLocaleString()}`
  : "Not provided"}
    </span>
  </p>


  <p>
    Trade-In:
    <span className="text-gray-400 ml-2">
      {lead.trade_in || "No"}
    </span>
  </p>


  {lead.trade_in === "Yes" && (
    <>
      <p>
        Trade Vehicle:
        <span className="text-gray-400 ml-2">
          {lead.trade_year} {lead.trade_model}
        </span>
      </p>
    </>
  )}


</div>


          {/* Notes */}

          <div className="bg-zinc-900 rounded-xl p-4">


            <h3 className="text-yellow-500 mb-3">
              Follow-Up Notes
            </h3>


            <textarea
              rows="5"
              value={notes}
              onChange={(e)=>setNotes(e.target.value)}
              placeholder="Add notes..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white"
            />


            <button
              onClick={saveNotes}
              className="mt-3 w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold"
            >

              {savingNotes ? "Saving..." : "Save Notes"}

            </button>


          </div>









          {/* Status */}

          <div className="bg-zinc-900 rounded-xl p-4">


            <h3 className="text-yellow-500 mb-3">
              Status
            </h3>


            <select
              value={lead.status || "New Lead"}
              onChange={(e)=>
                updateStatus(
                  lead.id,
                  e.target.value
                )
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3"
            >

              <option>New Lead</option>
              <option>Contacted</option>
              <option>Follow-Up Needed</option>
              <option>Qualified</option>
              <option>Closed</option>
              <option>Lost</option>

            </select>


          </div>









          {/* Appointment */}

          <div className="bg-zinc-900 rounded-xl p-4">


            <h3 className="text-yellow-500 mb-4">
              Appointment
            </h3>



            <select
              value={appointmentType}
              onChange={(e)=>setAppointmentType(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 mb-3"
            >

              <option>No Appointment</option>
              <option>Consultation</option>
              <option>Test Drive</option>
              <option>Follow-Up Call</option>
              <option>Vehicle Delivery</option>

            </select>



            <input
              type="date"
              value={appointmentDate}
              onChange={(e)=>setAppointmentDate(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 mb-3"
            />



            <input
              type="time"
              value={appointmentTime}
              onChange={(e)=>setAppointmentTime(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3"
            />



            <button
              onClick={saveAppointment}
              className="mt-4 w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold"
            >

              {savingAppointment
                ? "Saving..."
                : "Save Appointment"}

            </button>


          </div>








          {message && (

            <p className="text-yellow-500 text-sm">
              {message}
            </p>

          )}




        </div>


      </div>


    </div>

  );

}