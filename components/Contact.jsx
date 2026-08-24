import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTiktok,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-black text-white py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">

          <p className="text-yellow-500 uppercase tracking-[0.3em] text-sm mb-4">
            Get In Touch
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold">
            Let's Connect
          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Whether you're ready to schedule a consultation or simply have a
            question, I'm here to help.
          </p>

        </div>



        <div className="grid md:grid-cols-5 gap-10">


          {/* Contact Information */}
          <div className="md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

            <h3 className="text-2xl font-semibold mb-10">
              Contact Information
            </h3>


            <div className="space-y-8">


              {/* Phone */}
              <div className="flex items-start gap-4">

                <FaPhone className="text-yellow-500 text-xl mt-1" />

                <div>

                  <p className="text-sm uppercase text-gray-400">
                    Phone
                  </p>

                  <a
                    href="tel:+12484263626"
                    className="text-lg hover:text-yellow-500 transition"
                  >
                    (248) 426-3626
                  </a>

                </div>

              </div>




              {/* Email */}
              <div className="flex items-start gap-4">

                <FaEnvelope className="text-yellow-500 text-xl mt-1" />

                <div>

                  <p className="text-sm uppercase text-gray-400">
                    Email
                  </p>

                  <a
                    href="mailto:duniaarkoub2@gmail.com"
                    className="text-lg hover:text-yellow-500 transition"
                  >
                    duniaarkoub2@gmail.com
                  </a>

                </div>

              </div>




              {/* Location */}
              <div className="flex items-start gap-4">

                <FaMapMarkerAlt className="text-yellow-500 text-xl mt-1" />

                <div>

                  <p className="text-sm uppercase text-gray-400">
                    Land Rover Novi
                  </p>

                  <a
                    href="https://maps.google.com/?q=25245+Meadowbrook+Rd+Novi+MI+48375"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:text-yellow-500 transition"
                  >
                    25245 Meadowbrook Rd
                    <br />
                    Novi, MI 48375
                  </a>

                </div>

              </div>


            </div>

          </div>





          {/* Social Media */}
          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-10">


            <h3 className="text-2xl font-semibold mb-10">
              Connect With Dunia
            </h3>



            <div className="space-y-6">



              {/* Instagram */}
              <a
                href="https://www.instagram.com/dee_arkoub12/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg text-gray-300 hover:text-yellow-500 transition"
              >

                <FaInstagram className="text-yellow-500 text-xl" />

                @dee_arkoub12

              </a>





              {/* Facebook */}
              <a
                href="https://www.facebook.com/dunia.arkoub.2025/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg text-gray-300 hover:text-yellow-500 transition"
              >

                <FaFacebook className="text-yellow-500 text-xl" />

                Dunia Arkoub

              </a>





              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/dunia-arkoub-b09044355/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg text-gray-300 hover:text-yellow-500 transition"
              >

                <FaLinkedin className="text-yellow-500 text-xl" />

                Dunia Arkoub

              </a>





              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@dee_arkoub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg text-gray-300 hover:text-yellow-500 transition"
              >

                <FaTiktok className="text-yellow-500 text-xl" />

                @dee_arkoub

              </a>



            </div>




        



          </div>


        </div>


      </div>

    </section>
  );
}