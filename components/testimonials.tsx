export default function Testimonials() {
  const reviews = [
    {
      quote:
        "Dunia made the entire process effortless. She listened to exactly what I was looking for and helped me find the perfect vehicle.",
      name: "Client Name",
    },
    {
      quote:
        "The best car buying experience I have ever had. Dunia was professional, knowledgeable, and truly cared about making sure I was happy.",
      name: "Client Name",
    },
    {
      quote:
        "From start to finish, Dunia went above and beyond. I would recommend her to anyone looking for a luxury vehicle.",
      name: "Client Name",
    },
  ];

  return (
    <section className="bg-zinc-950 text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.4em] text-sm text-yellow-500 mb-5">
            Client Experiences
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold">
            What Clients Say About Dunia
          </h2>
        </div>


        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-black border border-white/10 rounded-2xl p-8"
            >
              <p className="text-gray-300 text-lg leading-relaxed">
                “{review.quote}”
              </p>

              <p className="mt-6 text-yellow-500 font-medium">
                {review.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}