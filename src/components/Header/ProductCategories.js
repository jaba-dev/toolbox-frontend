function ProductCategories() {
  return [
    {
      id: 1,
      title: "All products",
      url: "tools",
      expanded: false,
      subCategories: [{ id: 1, title: "All products", url: "tools" }],
    },
    {
      id: 1,
      title: "Hand tools",
      url: "hand-tools",
      expanded: false,
      subCategories: [
        { id: 1, title: "Hammers", url: "hammers" },
        { id: 2, title: "Measuring tapes", url: "measuring-tapes" },
        { id: 3, title: "Other tools", url: "other-hand-tools" },
        { id: 4, title: "Pliers", url: "pliers" },
        { id: 5, title: "Saws", url: "saws" },
        { id: 6, title: "Srcewdrivers", url: "screwdrivers" },
      ],
    },
    {
      id: 2,
      title: "Power tools",
      url: "power-tools",
      expanded: false,
      subCategories: [
        { id: 2, title: "Circular saws", url: "circular-saws" },
        { id: 1, title: "Angle grinders", url: "angle-grinders" },
        { id: 3, title: "Drills", url: "drills" },
        { id: 4, title: "Jigsaws", url: "jigsaws" },
        { id: 5, title: "Multi-tools", url: "multi-tools" },
        { id: 6, title: "Other tools", url: "other-power-tools" },
        { id: 7, title: "Screwdrivers", url: "screwdrivers" },
      ],
    },
  ];
}

export default ProductCategories;
