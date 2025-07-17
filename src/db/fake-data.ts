/**
 * Represents the "swimlanes" of the process.
 * Each lane typically corresponds to a department, team, or actor.
 */
export const INITIAL_LANES = [
  { id: "lane-customer", name: "Customer" },
  { id: "lane-insurer-desk", name: "Insurer (Service Desk)" },
  { id: "lane-logistics", name: "Logistics (Carrier)" },
  { id: "lane-claims-adj", name: "Claims Adjustment" },
  { id: "lane-finance", name: "Finance Dept." },
];

/**
 * Represents the step cards within the process.
 * - laneId: Which lane the step belongs to.
 * - columnIndex: The visual column, defining the sequence.
 * - description: More details about the step's action.
 * - technologies: Tools or systems used to perform the step.
 */
export const INITIAL_STEPS = [
  // Column 0: Process Initiation
  {
    id: "step-1",
    laneId: "lane-customer",
    columnIndex: 0,
    title: "Report Claim",
    description:
      "Customer submits the initial claim notice via the online portal.",
    order: 1,
    time: "30 min",
    color: "#007bff", // Blue: Communication
    technologies: ["Web Portal", "Email"],
  },
  // Column 1: Claim Opening
  {
    id: "step-2",
    laneId: "lane-insurer-desk",
    columnIndex: 1,
    title: "Open Claim File",
    description:
      "Service Desk receives the notice and creates a new case in the CRM.",
    order: 2,
    time: "2 hours",
    color: "#28a745", // Green: Value-add
    technologies: ["CRM", "Email"],
  },
  // Column 2: Information Gathering (parallel activities)
  {
    id: "step-3",
    laneId: "lane-insurer-desk",
    columnIndex: 2,
    title: "Request Documentation",
    description:
      "Send a standardized email to the customer with a list of required documents.",
    order: 3,
    time: "15 min",
    color: "#007bff", // Blue: Communication
    technologies: ["CRM", "Email Template"],
  },
  {
    id: "step-4",
    laneId: "lane-logistics",
    columnIndex: 2,
    title: "Generate Damage Report",
    description:
      "The carrier inspects the damaged cargo and creates an official report.",
    order: 4,
    time: "2 days",
    color: "#ffc107", // Yellow: Internal Process/Wait
    technologies: ["Mobile App", "Document Scanner"],
  },
  // Column 3: Document Analysis
  {
    id: "step-5",
    laneId: "lane-insurer-desk",
    columnIndex: 3,
    title: "Review Submitted Documents",
    description:
      "Check if all documents (invoice, photos, report) are received and valid.",
    order: 5,
    time: "1 day",
    color: "#28a745", // Green: Value-add
    technologies: ["Document Mgmt System", "CRM"],
  },
  // Column 4: Technical Analysis
  {
    id: "step-6",
    laneId: "lane-claims-adj",
    columnIndex: 4,
    title: "Technical Claim Analysis",
    description:
      "The claims adjuster reviews all evidence to determine coverage and liability.",
    order: 6,
    time: "3 days",
    color: "#28a745", // Green: Value-add
    technologies: ["Claims Software", "ERP"],
  },
  // Column 5: Decision
  {
    id: "step-7",
    laneId: "lane-claims-adj",
    columnIndex: 5,
    title: "Issue Decision (Approved)",
    description: "Based on the analysis, the claim is approved for payment.",
    order: 7,
    time: "4 hours",
    color: "#17a2b8", // Cyan: Decision Point
    technologies: ["Claims Software"],
  },
  // Column 6: Payment Approval
  {
    id: "step-8",
    laneId: "lane-insurer-desk",
    columnIndex: 6,
    title: "Approve Indemnity Payment",
    description:
      "A manager provides final approval for the payment amount in the system.",
    order: 8,
    time: "1 hour",
    color: "#17a2b8", // Cyan: Decision Point
    technologies: ["ERP", "Digital Signature"],
  },
  // Column 7: Payment Execution
  {
    id: "step-9",
    laneId: "lane-finance",
    columnIndex: 7,
    title: "Process Payment",
    description:
      "The finance department issues the payment to the customer via bank transfer.",
    order: 9,
    time: "2 days",
    color: "#28a745", // Green: Value-add
    technologies: ["ERP", "Banking System"],
  },
  // Column 8: Finalization
  {
    id: "step-10",
    laneId: "lane-customer",
    columnIndex: 8,
    title: "Confirm Receipt of Payment",
    description:
      "Customer receives the payment and the claim is marked as closed.",
    order: 10,
    time: "5 min",
    color: "#6c757d", // Gray: Finalization
    technologies: ["Email", "Web Portal"],
  },
];

/**
 * Represents the connections (arrows) between steps.
 * Shows the process flow and wait times between steps.
 */
export const INITIAL_CONNECTIONS = [
  { start: "step-1", end: "step-2", label: "Handoff" },
  { start: "step-2", end: "step-3", label: "Initiates collection" },
  { start: "step-3", end: "step-5", label: "Wait for Docs (2d)", lineStyle: 'dashed'}, // aq q define se a linha vai se tracejada ou nn
  { start: "step-4", end: "step-5", label: "Wait for Report (2d)", lineStyle: 'dashed'},
  { start: "step-5", end: "step-6", label: "To Technical Analysis" },
  { start: "step-6", end: "step-7", label: "Analysis Complete" },
  { start: "step-7", end: "step-8", label: "Decision Sent" },
  { start: "step-8", end: "step-9", label: "Payment Order" },
  { start: "step-9", end: "step-10", label: "Payment Sent" },
];
 