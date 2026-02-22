const categories = [
  'MARBRE',
  'GRANIT',
  'PIERRE DE TAZA',
  'HABILLAGE MURAL',
  'VASQUES',
  'CHEMINEES',
  'PISCINES',
  'FACADES',
  'ESCALIERS',
  'PLANS DE TRAVAIL',
];

const CategoryBar = () => {
  return (
    <section className="bg-foreground py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <span
              key={index}
              className="text-background/70 text-xs font-medium tracking-widest uppercase whitespace-nowrap hover:text-background transition-colors cursor-pointer"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBar;
