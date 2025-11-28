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
    category: "Toys",
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
  {
    id: "is-14543",
    code: "IS 14543",
    title: "Packaged Drinking Water (Other than Packaged Natural Mineral Water)",
    category: "Packaged Water",
    rules: [
      "Water must be free from coliform bacteria.",
      "pH value must be between 6.5 and 8.5.",
      "Total Dissolved Solids (TDS) should not exceed 500 mg/L.",
      "Must be packed in clean, hygienic, and tamper-proof bottles.",
      "Label must include batch number, date of manufacture, and expiry date.",
    ],
  },
  {
    id: "is-16018",
    code: "IS 16018",
    title:
      "Self-Ballasted LED Lamps for General Lighting Services - Performance Requirements",
    category: "LED Bulb",
    rules: [
      "Luminous efficacy shall not be less than declared value.",
      "Color Rendering Index (CRI) must be above a certain threshold.",
      "Lamp life must meet the specified number of burning hours.",
      "Must pass high voltage and insulation resistance tests.",
      "Must be clearly marked with rated voltage, wattage, and manufacturer's name.",
    ],
  },
  {
    id: "is-11601",
    code: "IS 11601",
    title: "Skimmed Milk Powder, Standard Grade - Specification",
    category: "Milk Powder",
    rules: [
      "Moisture content must not exceed 4.0 percent by mass.",
      "Fat content must not exceed 1.5 percent by mass.",
      "The powder must be free from lumps and scorched particles.",
      "Must be free from extraneous matter and added preservatives.",
      "Packaging must be hygienic and protect the product from contamination.",
    ],
  },
  {
    id: "is-302-2-3",
    code: "IS 302-2-3",
    title:
      "Safety of Household and Similar Electrical Appliances - Part 2-3: Particular Requirements for Electric Irons",
    category: "Electric Iron",
    rules: [
      "The appliance must be protected against electric shock.",
      "Heating element must be durable and safe.",
      "Cord anchorage must withstand strain and torsion.",
      "Thermostat must function correctly to prevent overheating.",
      "Must be constructed to be mechanically stable and resistant to moisture.",
    ],
  },
];

export const getStandardById = (id: string) => {
  return standards.find((s) => s.id === id);
};

export const getStandardByCode = (code: string) => {
  return standards.find((s) => s.code === code);
};
