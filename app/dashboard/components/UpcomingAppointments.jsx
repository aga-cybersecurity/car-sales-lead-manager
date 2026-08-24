"use client";

export default function UpcomingAppointments({ leads, openLead }) {

  const appointments = leads
    .filter(
      (lead) =>
        lead.appointment_date &&
        lead.appointment_time &&
        lead.appointment_type &&
        lead.appointment_type !== "No Appointment"
    )
    .sort(
      (a, b) =>
        new Date(
          `${a.appointment_date}T${a.appointment_time}`
        ) -
        new Date(
          `${b.appointment_date}T${b.appointment_time}`
        )
    );


  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-10">

      <h2 className="text-2xl font-semibold mb-6">
        Upcoming Appointments
      </h2>


      {appointments.length === 0 ? (

        <p className="text-gray-400">
          No appointments scheduled.
        </p>

      ) : (


        <div className="space-y-4">

          {appointments.map((lead) => (

            <button

              key={lead.id}

              onClick={() => openLead(lead)}

              className="w-full text-left bg-zinc-800 hover:bg-zinc-700 rounded-xl p-5 transition"

            >

              <div className="flex justify-between items-start">


                <div>

                  <h3 className="text-lg font-semibold">
                    {lead.first_name} {lead.last_name}
                  </h3>


                  <p className="text-yellow-500">
                    {lead.appointment_type}
                  </p>


                  <p className="text-gray-400 mt-2">
                    🚗 {lead.year} {lead.make_model}
                  </p>

                </div>



                <div className="text-right text-sm text-gray-300">

                  <p>
                    📅 {lead.appointment_date}
                  </p>

                  <p>
                    ⏰ {lead.appointment_time?.slice(0,5)}
                  </p>

                </div>


              </div>


            </button>

          ))}

        </div>

      )}

    </div>
  );
}