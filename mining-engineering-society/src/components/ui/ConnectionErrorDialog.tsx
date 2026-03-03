"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ConnectionErrorDialog() {
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  useEffect(() => {
    // Show the dialog shortly after the dashboard loads
    const timer = setTimeout(() => {
      setShowErrorDialog(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
      <DialogContent className="bg-zinc-950 border border-red-900/50 text-slate-300 sm:max-w-lg shadow-2xl shadow-red-900/20">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-red-500 font-mono tracking-tight flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
            Database Connection Error
          </DialogTitle>
          <DialogDescription className="text-slate-400 space-y-4 text-sm">
            <div className="bg-red-950/20 border border-red-900/30 p-3 rounded-md font-mono text-xs text-red-400">
              <span className="font-semibold">FATAL_ERROR:</span>{" "}
              ERR_CONNECTION_TIMED_OUT
              <br />
              <span className="font-semibold">DB_INSTANCE:</span>{" "}
              pool-cluster-aws-ap-south-1
              <br />
              <span className="font-semibold">TIMESTAMP:</span>{" "}
              {new Date().toISOString()}
            </div>

            {/* <div className="leading-relaxed">
              The application encountered a critical runtime exception while
              attempting to establish a connection to the primary database read
              replica. The connection pool was exhausted after multiple retries,
              resulting in a connection timeout.
            </div> */}

            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-md shadow-inner">
              <div className="mb-3 text-slate-300 font-medium border-b border-zinc-800 pb-2">
                Action Required:
              </div>
              <div className="mb-4 text-slate-400 text-sm">
                Please contact the system administrators/coordinators to
                continue registration process:
              </div>
              <ul className="space-y-4 font-mono">
                <li className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 group bg-zinc-950 p-4 rounded border border-zinc-800 hover:border-blue-500/50 transition-colors shadow-sm">
                  <span className="text-white font-bold text-lg flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                    Omm Prakash Mallick
                  </span>
                  <a
                    href="tel:8260995822"
                    className="text-blue-400 font-bold text-lg hover:text-blue-300 hover:underline px-3 py-1 bg-blue-500/10 rounded-md border border-blue-500/20"
                  >
                    8260995822
                  </a>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 group bg-zinc-950 p-4 rounded border border-zinc-800 hover:border-blue-500/50 transition-colors shadow-sm">
                  <span className="text-white font-bold text-lg flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                    Shakti Prasad
                  </span>
                  <a
                    href="tel:8917638088"
                    className="text-blue-400 font-bold text-lg hover:text-blue-300 hover:underline px-3 py-1 bg-blue-500/10 rounded-md border border-blue-500/20"
                  >
                    8917638088
                  </a>
                </li>
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
