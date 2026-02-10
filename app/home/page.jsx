export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-12 py-20 items-center">
        
        {/* Left Text */}
        <div>
          <h1 className="text-xl h-50 md:text-5xl ml-10 font-light italic leading-snug">
            Campus Lost & <br /> Found
          </h1>
        </div>

        {/* Right Image */}
        <div className="w-full">
          <img
            src="https://cdn.prod.website-files.com/63f783e54b29372e31927b14/68f0a3d3eafbe17b513322aa_Koh_Pich_Elite_Cove_Lifestyle_.jpg"
            alt="Campus"
            className="w- h-150 object-cover"
          />
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="px-12 py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white p-12 shadow-sm">
          <h2 className="text-3xl font-light mb-6 text-gray-400">About</h2>
          <p className="text-gray-600 leading-relaxed">
             Campus Lost & Found is a digital platform that helps students and staff
              easily report, search, and recover lost or found items within the campus
             in a simple and organized way.
          </p>
        </div>
      </section>
       <section className="px-12 py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white p-12 shadow-sm">
          <h2 className="text-3xl font-light mb-6 text-gray-400">About</h2>
          <p className="text-gray-600 leading-relaxed">
             This system is designed to replace the traditional lost-and-found process
      by providing a centralized online solution. Users can report lost items,
      submit found items, and browse existing reports efficiently.
      <br /><br />
      By digitalizing the process, Campus Lost & Found improves communication,
      reduces confusion, and increases the chances of returning items to their
      rightful owners, enhancing overall campus life.
          </p>
        </div>
      </section>

    </main>
  );
}
