"use client";

import { useState } from "react";

export default function LeadsTable({
  leads,
  deletedLeads = [],
  updateStatus,
  setSelectedLead,
  deleteLead,
  restoreLead,
}) {
  const [showDeleted, setShowDeleted] = useState(false);

  function handleDelete(id) {
    if (typeof deleteLead !== "function") {
      console.error(
        "DELETE ERROR: deleteLead was not passed to LeadsTable."
      );
      return;
    }

    deleteLead(id);
  }

  function handleRestore(id) {
    if (typeof restoreLead !== "function") {
      console.error(
        "RESTORE ERROR: restoreLead was not passed to LeadsTable."
      );
      return;
    }

    restoreLead(id);
  }

  function getClientName(lead) {
    return (
      `${lead.first_name || ""} ${lead.last_name || ""}`.trim() ||
      "Unnamed Client"
    );
  }

  function getVehicle(lead) {
    return (
      `${lead.year || ""} ${lead.make_model || ""} ${lead.trim || ""}`
        .replace(/\s+/g, " ")
        .trim() || "Not specified"
    );
  }

  const displayedLeads = showDeleted ? deletedLeads : leads;

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      {/* HEADER */}
      <div className="border-b border-zinc-800 px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {showDeleted ? "Deleted Leads" : "Client Leads"}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {showDeleted
                ? "Restore leads that were previously deleted."
                : "View and manage your client inquiries."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowDeleted(!showDeleted)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
          >
            {showDeleted
              ? "← Back to Leads"
              : `Deleted Leads (${deletedLeads.length})`}
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {displayedLeads.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-400">
            {showDeleted
              ? "No deleted leads."
              : "No leads found."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            {/* TABLE HEADER */}
            <thead className="border-b border-zinc-800 bg-zinc-950">
              <tr>
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Client
                </th>

                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Contact
                </th>

                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Vehicle
                </th>

                {!showDeleted && (
                  <>
                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                      Appointment
                    </th>
                  </>
                )}

                {showDeleted && (
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-500">
                    Deleted
                  </th>
                )}

                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-zinc-800">
              {displayedLeads.map((lead) => {
                const clientName = getClientName(lead);
                const vehicle = getVehicle(lead);

                const appointment =
                  lead.appointment_type &&
                  lead.appointment_type !== "No Appointment"
                    ? lead.appointment_type
                    : "None";

                const status = lead.status || "New Lead";

                return (
                  <tr
                    key={lead.id}
                    className="transition hover:bg-zinc-800/50"
                  >
                    {/* CLIENT */}
                    <td className="px-6 py-5">
                      <button
                        type="button"
                        onClick={() => setSelectedLead(lead)}
                        className="text-left"
                      >
                        <p className="font-medium text-white transition hover:text-yellow-500">
                          {clientName}
                        </p>
                      </button>
                    </td>

                    {/* CONTACT */}
                    <td className="px-6 py-5">
                      <p className="text-sm text-gray-300">
                        {lead.email || "No email"}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {lead.phone || "No phone"}
                      </p>
                    </td>

                    {/* VEHICLE */}
                    <td className="px-6 py-5">
                      <p className="max-w-[220px] text-sm text-gray-300">
                        {vehicle}
                      </p>

                      {lead.stock_number && (
                        <p className="mt-1 text-xs text-gray-500">
                          Stock #{lead.stock_number}
                        </p>
                      )}
                    </td>

                    {/* ACTIVE STATUS */}
                    {!showDeleted && (
                      <td className="px-6 py-5">
                        <select
                          value={status}
                          onChange={(e) =>
                            updateStatus(
                              lead.id,
                              e.target.value
                            )
                          }
                          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-yellow-600"
                        >
                          <option value="New Lead">
                            New Lead
                          </option>

                          <option value="Contacted">
                            Contacted
                          </option>

                          <option value="Follow-Up Needed">
                            Follow-Up Needed
                          </option>

                          <option value="Qualified">
                            Qualified
                          </option>

                          <option value="Closed">
                            Closed
                          </option>

                          <option value="Lost">
                            Lost
                          </option>
                        </select>
                      </td>
                    )}

                    {/* ACTIVE APPOINTMENT */}
                    {!showDeleted && (
                      <td className="px-6 py-5">
                        <div>
                          <p className="text-sm text-gray-300">
                            {appointment}
                          </p>

                          {lead.appointment_date && (
                            <p className="mt-1 text-xs text-gray-500">
                              {lead.appointment_date}
                            </p>
                          )}

                          {lead.appointment_time && (
                            <p className="text-xs text-gray-500">
                              {lead.appointment_time}
                            </p>
                          )}
                        </div>
                      </td>
                    )}

                    {/* DELETED DATE */}
                    {showDeleted && (
                      <td className="px-6 py-5">
                        <p className="text-sm text-gray-300">
                          {lead.deleted_at
                            ? new Date(
                                lead.deleted_at
                              ).toLocaleDateString()
                            : "Unknown"}
                        </p>
                      </td>
                    )}

                    {/* ACTIONS */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        {/* VIEW */}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedLead(lead)
                          }
                          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-medium text-white transition hover:bg-zinc-700"
                        >
                          View
                        </button>

                        {/* RESTORE */}
                        {showDeleted ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleRestore(lead.id)
                            }
                            className="rounded-lg border border-green-900/60 bg-green-950/40 px-3 py-2 text-xs font-medium text-green-400 transition hover:border-green-700 hover:bg-green-900/40 hover:text-green-300"
                          >
                            Restore
                          </button>
                        ) : (
                          /* DELETE */
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(lead.id)
                            }
                            className="rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-xs font-medium text-red-400 transition hover:border-red-700 hover:bg-red-900/40 hover:text-red-300"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}