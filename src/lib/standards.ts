export type Standard = {
  id: string;
  code: string;
  title: string;
  category: string;
  rules: string[];
};

export const standards: Standard[] = [
  {
    id: "is-13252",
    code: "IS 13252",
    title: "Information Technology Equipment - Safety",
    category: "Mobile Charger",
    rules: [
      "Output voltage must be stable within specified limits.",
      "Overload and short-circuit protection is required.",
      "The casing must be made of fire-resistant material.",
      "Proper safety labeling is required, including manufacturer details and safety marks.",
      "Insulation and electrical clearances must meet safety norms.",
    ],
  },
  {
    id: "is-269",
    code: "IS 269",
    title: "Ordinary Portland Cement, 33 Grade - Specification",
    category: "Cement",
    rules: [
      "Defines chemical composition limits for cement.",
      "Specifies physical requirements like fineness, setting time, and compressive strength.",
      "Outlines storage and packing requirements.",
      "Details sampling procedures and criteria for conformity.",
    ],
  },
  {
    id: "is-9873",
    code: "IS 9873",
    title: "Safety of Toys",
    category: "Toys Safety",
    rules: [
      "Part 1: Covers safety aspects related to mechanical and physical properties.",
      "Part 2: Specifies flammability requirements.",
      "Part 3: Defines migration limits for certain toxic elements.",
      "Requires age-appropriate warnings and labels.",
      "Prohibits use of certain hazardous materials.",
    ],
  },
  {
    id: "is-4151",
    code: "IS 4151",
    title: "Protective Helmets for Motorcycle Riders - Specification",
    category: "Helmet",
    rules: [
      "Must pass impact absorption test.",
      "Peripheral vision clearance must be adequate.",
      "Retention system (strap) must have sufficient tensile strength.",
      "Shell must be penetration resistant.",
      "Labeling must include manufacturer name, size, and year of manufacture.",
      "The materials used must not cause skin irritation.",
      "Total weight of the helmet must be within specified limits.",
    ],
  },
];

export const getStandardById = (id: string) => {
  return standards.find((s) => s.id === id);
};

export const getStandardByCode = (code: string) => {
  return standards.find((s) => s.code === code);
};
