export default function StatsSection() {
  const stats = [
    { value: "960+", label: "Happy Clients" },
    { value: "63+", label: "Products" },
    { value: "19+", label: "Years of Experience" },
    { value: "6+", label: "Countries Served" },
  ];

  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, i) => (
          <div key={i}>
            <p className="text-4xl font-bold text-red-600">{stat.value}</p>
            <p className="text-gray-700">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
