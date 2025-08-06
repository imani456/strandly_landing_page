import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface DataProcessingRecordsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DataProcessingRecords = ({ open, onOpenChange }: DataProcessingRecordsProps) => {
  const { t } = useTranslation();

  const processingRecords = [
    {
      id: "waitlist-collection",
      purpose: "Waitlist Management",
      legalBasis: "Consent",
      dataCategories: ["Name", "Email", "Phone", "User Type"],
      retentionPeriod: "2 years",
      dataSubjects: "Waitlist subscribers",
      recipients: "Internal team, Supabase (data processor)",
      transfers: "EU to US (Supabase) - Standard Contractual Clauses",
      automatedDecisionMaking: "No",
      profiling: "No"
    },
    {
      id: "website-analytics",
      purpose: "Website Analytics",
      legalBasis: "Consent",
      dataCategories: ["IP Address", "Browser Info", "Usage Data"],
      retentionPeriod: "26 months",
      dataSubjects: "Website visitors",
      recipients: "Google Analytics",
      transfers: "EU to US (Google) - Standard Contractual Clauses",
      automatedDecisionMaking: "No",
      profiling: "No"
    },
    {
      id: "customer-support",
      purpose: "Customer Support",
      legalBasis: "Legitimate Interest",
      dataCategories: ["Name", "Email", "Chat History"],
      retentionPeriod: "1 year",
      dataSubjects: "Support users",
      recipients: "Tawk.to (chat provider)",
      transfers: "EU to US (Tawk.to) - Standard Contractual Clauses",
      automatedDecisionMaking: "No",
      profiling: "No"
    },
    {
      id: "essential-cookies",
      purpose: "Essential Website Functionality",
      legalBasis: "Legitimate Interest",
      dataCategories: ["Session Data", "Preferences"],
      retentionPeriod: "Session duration",
      dataSubjects: "Website visitors",
      recipients: "Internal systems",
      transfers: "No international transfers",
      automatedDecisionMaking: "No",
      profiling: "No"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl bg-warm-white border-soft-caramel/20 max-h-[80vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="font-display text-3xl text-cocoa-brown">
            Data Processing Records
          </DialogTitle>
          <p className="font-body text-cocoa-brown/80 leading-relaxed">
            This document provides transparency about how we process personal data in compliance with GDPR Article 30.
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {processingRecords.map((record) => (
            <div key={record.id} className="bg-white/50 rounded-xl p-6 shadow-soft">
              <h3 className="font-display text-xl font-semibold text-cocoa-brown mb-4">
                {record.purpose}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-cocoa-brown">Legal Basis:</span>
                    <span className="ml-2 text-cocoa-brown/80">{record.legalBasis}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-cocoa-brown">Data Categories:</span>
                    <span className="ml-2 text-cocoa-brown/80">{record.dataCategories.join(", ")}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-cocoa-brown">Retention Period:</span>
                    <span className="ml-2 text-cocoa-brown/80">{record.retentionPeriod}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-cocoa-brown">Data Subjects:</span>
                    <span className="ml-2 text-cocoa-brown/80">{record.dataSubjects}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-cocoa-brown">Recipients:</span>
                    <span className="ml-2 text-cocoa-brown/80">{record.recipients}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-cocoa-brown">International Transfers:</span>
                    <span className="ml-2 text-cocoa-brown/80">{record.transfers}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-cocoa-brown">Automated Decisions:</span>
                    <span className="ml-2 text-cocoa-brown/80">{record.automatedDecisionMaking}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-cocoa-brown">Profiling:</span>
                    <span className="ml-2 text-cocoa-brown/80">{record.profiling}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-cocoa-brown/60 font-body">
          <p>
            Last updated: August 1, 2025
          </p>
          <p className="mt-2">
            For questions about our data processing activities, contact our Data Protection Officer at{" "}
            <a href="mailto:dpo@strandly.co" className="text-cocoa-brown underline hover:text-brown-custom">
              dpo@strandly.co
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataProcessingRecords; 